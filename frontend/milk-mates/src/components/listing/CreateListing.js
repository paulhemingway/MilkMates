import React, { useState, useEffect } from "react";
import { useBatchService } from "services/BatchService";
import { useListingService } from "services/ListingService";
import { useParams } from "react-router-dom";
import Select from "react-select";
import CurrencyInput from "react-currency-input-field";
import { useAuth } from "services/AuthService";
import { useModalService } from "services/ModalService";
import Loading from "components/global/Loading";

import SuccessModal from "components/modal/SuccessModal";

export default function CreateListing() {
  const [notListedOptions, setNotListedOptions] = useState([]);

  const { batches } = useBatchService();
  const { createListing } = useListingService();
  const { openModal } = useModalService();
  const { batchId } = useParams();
  const { user } = useAuth();

  const [selectedBatch, setSelectedBatch] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [desc, setDesc] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const [valid, setValid] = useState({
    batch: true,
    title: true,
    desc: true,
  });

  // don't judge the variable name.
  // if a batch has one of these statuses, it can't be listed.
  const notListableStatuses = ["discarded", "shared", "consumed"];

  function mysql_real_escape_string(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
      switch (char) {
        case "\0":
          return "\\0";
        case "\x08":
          return "\\b";
        case "\x09":
          return "\\t";
        case "\x1a":
          return "\\z";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case '"':
        case "'":
        case "\\":
        case "%":
          return "\\" + char; // prepends a backslash to backslash, percent,
        // and double/single quotes
        default:
          return char;
      }
    });
  }

  useEffect(() => {
    const batchesNotListed = batches.filter((batch) => {
      return (
        batch.isListed === 0 &&
        !notListableStatuses.includes(batch.events[batch.events.length - 1])
      );
    });

    // change this to take in the option objects for the react select menu
    const newOptions = batchesNotListed.reverse().map((batch) => {
      return {
        value: batch.batchId,
        label: (
          <div className="option">
            <span>{`Batch ${
              batch.batchId
            } - ${batch.volume.toFixed()} oz`}</span>
          </div>
        ),
      };
    });

    let index = 0;
    if (batchId !== undefined) {
      index = newOptions.findIndex((option) => {
        return option.value == batchId;
      });
    }
    setSelectedBatch(newOptions[index]);

    setNotListedOptions(newOptions);
  }, [batches]);

  const clearClicked = () => {
    setSelectedBatch(notListedOptions[0]);
    setTitle("");
    setDesc("");
    setPrice(0);

    setValid({
      batch: true,
      title: true,
      desc: true,
    });
  };

  const isValid = () => {
    const newValid = {
      batch: selectedBatch !== undefined,
      title: title.length >= 12,
      desc: desc.length >= 50,
    };
    setValid(newValid);

    return newValid.title && newValid.desc;
  };

  const handleSubmit = async (e) => {
    let errorMessage = "";

    e.preventDefault();

    if (!isValid()) {
      setErrorMsg("");
      return;
    }
    setLoading(true);

    const errorCode = await createListing(
      user.username,
      selectedBatch.value,
      mysql_real_escape_string(title),
      price.toString(),
      mysql_real_escape_string(desc)
    );

    switch (errorCode) {
      case 0:
        openModal(
          <SuccessModal
            message={`Batch ${selectedBatch.value} has been listed successfully.`}
          />
        );
        clearClicked();
        break;
      case 6:
        errorMessage = `Batch ${selectedBatch.value} is already listed!`;
        break;
      default:
        errorMessage = "Something went wrong on our end. Please try again.";
        break;
    }
    setErrorMsg(errorMessage);
    setLoading(false);
  };

  return (
    <div className="create-listing">
      <form onSubmit={handleSubmit} className="flex-column">
        <div className="input-cont">
          <label className="flex-column">
            Batch
            <Select
              options={notListedOptions}
              defaultValue={selectedBatch}
              value={selectedBatch}
              placeholder="Select a batch..."
              className="select"
              id="batch-select"
              components={{
                IndicatorSeparator: () => null,
              }}
              isSearchable={false}
              theme={(theme) => ({
                ...theme,
                colors: {
                  ...theme.colors,
                  text: "orangered",
                  primary25: "var(--light-pink)",
                  primary: "var(--blue)",
                },
              })}
              onChange={(e) => setSelectedBatch(e)}
            />
          </label>
          {!valid.batch && <p className="error-msg">Please select a batch.</p>}
        </div>
        <div className="two-col">
          <div className="input-cont">
            <label className="flex-column">
              Title
              <input
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                maxLength="64"
                value={title}
              />
            </label>
            <p
              className={`char-limit ${title.length >= 54 && "yellow"} ${
                (title.length < 12 || title.length === 64) && "red"
              }`}
            >
              {title.length}/64
            </p>
            {!valid.title && (
              <p className="error-msg">Title must be at least 12 characters.</p>
            )}
          </div>
          <div className="input-cont">
            <label className="flex-column">
              <span className="price-label">
                Price <span className="optional">(optional)</span>
              </span>
              <CurrencyInput
                id="price-input"
                name="price-input"
                prefix="$"
                placeholder="Price"
                value={price}
                decimalsLimit={2}
                onValueChange={(value) =>
                  setPrice(value === undefined ? 0 : value)
                }
              />
            </label>
          </div>
        </div>
        <div className="input-cont">
          <label className="flex-column">
            Description
            <textarea
              name="desc"
              id="desc"
              maxLength="1000"
              cols="30"
              rows="8"
              onChange={(e) => setDesc(e.target.value)}
              value={desc}
              placeholder="200 oz of frozen breastmilk from a healthy, non-smoking, and drug-free mother. Milk was pumped between January and March of 2023 and stored in a deep freezer immediately after pumping. No alcohol or caffeine was consumed during this time. Milk has been screened and tested negative for any contamination..."
            ></textarea>
          </label>
          <p
            className={`char-limit ${desc.length >= 900 && "yellow"} ${
              (desc.length < 50 || desc.length === 1000) && "red"
            }`}
          >
            {desc.length}/1000
          </p>
          {!valid.desc && (
            <p className="error-msg">
              Description must be at least 50 characters.
            </p>
          )}
        </div>
        {loading && <p className="loading"><Loading /></p>}
        <p className="error-msg center">{errorMsg}</p>
        <div className="buttons">
          <button
            type="button"
            onClick={clearClicked}
            className="button secondary-button-blue"
          >
            Clear
          </button>
          <input
            type="submit"
            onClick={handleSubmit}
            value="List Batch"
            className="button primary-button-blue"
          />
        </div>
      </form>
    </div>
  );
}
