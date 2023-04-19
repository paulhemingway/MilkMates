import React, { useState, useEffect } from "react";
import { useBatchService } from "services/BatchService";
import { useParams } from 'react-router-dom';
import Select from "react-select";
import CurrencyInput from "react-currency-input-field";

export default function CreateListing() {
  const [notListedOptions, setNotListedOptions] = useState([]);
  const { batches } = useBatchService();
  const { batchId } = useParams();

  const [selectedBatch, setSelectedBatch] = useState(null);
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("")

  // don't judge the variable name.
  // if a batch has one of these statuses, it can't be listed.
  const notListableStatuses = ['discarded', 'shared', 'consumed'];

  useEffect(() => {
    const batchesNotListed = batches.filter((batch) => {
      return batch.isListed === 0 && !notListableStatuses.includes(batch.events[batch.events.length - 1]);
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
    let index = 0
    if(batchId !== undefined) {
      index = newOptions.findIndex((option) => {
        return option.value == batchId
      })

    }
    setSelectedBatch(newOptions[index])

    setNotListedOptions(newOptions);
  }, [batches]);

  const handleSubmit = () => {};

  return (
    <div className="create-listing">
      <form onSubmit={handleSubmit}>
        <div className="input-cont">
          <label>
            Batch
            <Select
              options={notListedOptions}
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
              onChange={(e) => setSelectedBatch(e.value)}
            />
          </label>
        </div>
        <div className="two-col">
          <div className="input-cont">
            <label>
              Title
              <input
                type="text"
                placeholder="Title"
                onChange={(e) => setTitle(e.target.value)}
                maxLength="64"
              />
            </label>
            <p className={`char-limit ${title.length >= 54 && 'yellow'} ${title.length === 64 && 'red'}`}>{title.length}/64</p>
          </div>
          <div className="input-cont">
            <label>
              <span className="price-label">
                Price <span className="optional">(optional)</span>
              </span>
              <CurrencyInput
                id="price-input"
                name="price-input"
                prefix="$"
                placeholder="Price"
                defaultValue={0}
                decimalsLimit={2}
                onValueChange={(value) => setPrice(value)}
              />
              
            </label>
          </div>
        </div>
        <div className="input-cont">
          <label>
            Description
            <textarea name="desc" id="desc" maxLength="1000" cols="30" rows="10" onChange={(e) => setDesc(e.target.value)}></textarea>
          </label>
          <p className={`char-limit ${desc.length >= 900 && 'yellow'} ${desc.length === 1000 && 'red'}`}>{desc.length}/1000</p>
        </div>
      </form>
    </div>
  );
}
