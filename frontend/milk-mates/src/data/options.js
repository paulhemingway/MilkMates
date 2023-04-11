const options = {
  startDate: [
    {
      value: null,
      label: (
        <div className="option">
          <span>None</span>
        </div>
      ),
    },
    {
      value: "Today",
      label: (
        <div className="option">
          <span>Today</span>
        </div>
      ),
    },
    {
      value: "Past week",
      label: (
        <div className="option">
          <span>Past week</span>
        </div>
      ),
    },
    {
      value: "Past month",
      label: (
        <div className="option">
          <span>Past month</span>
        </div>
      ),
    },
    {
      value: "Past 3 months",
      label: (
        <div className="option">
          <span>Past 3 months</span>
        </div>
      ),
    },
    {
      value: "Past year",
      label: (
        <div className="option">
          <span>Past year</span>
        </div>
      ),
    },
  ],
  status: [
    "Logged",
    "Refrigerated",
    "Frozen",
    "Thawed",
    "Consumed",
    "Shared",
    "Discarded",
  ],
  listed: [
    {
      value: null,
      label: (
        <div className="option">
          <span>All</span>
        </div>
      ),
    },
    {
      value: true,
      label: (
        <div className="option">
          <span>Listed</span>
        </div>
      ),
    },
    {
      value: false,
      label: (
        <div className="option">
          <span>Not Listed</span>
        </div>
      ),
    },
  ],
  conditions: [
    {
      value: "Anemia",
      label: (
        <div className="option">
          <span>Anemia</span>
        </div>
      ),
    },
    {
      value: "Cancer",
      label: (
        <div className="option">
          <span>Cancer</span>
        </div>
      ),
    },
    {
      value: "Common Cold",
      label: (
        <div className="option">
          <span>Common Cold</span>
        </div>
      ),
    },
    {
      value: "COVID-19",
      label: (
        <div className="option">
          <span>COVID-19</span>
        </div>
      ),
    },
    {
      value: "Diabetes",
      label: (
        <div className="option">
          <span>Diabetes</span>
        </div>
      ),
    },
    {
      value: "Eczema",
      label: (
        <div className="option">
          <span>Eczema</span>
        </div>
      ),
    },
    {
      value: "Flu",
      label: (
        <div className="option">
          <span>Flu</span>
        </div>
      ),
    },
    {
      value: "Gastroenteritis (Stomach Flu)",
      label: (
        <div className="option">
          <span>Gastroenteritis (Stomach Flu)</span>
        </div>
      ),
    },
    {
      value: "Hay Fever",
      label: (
        <div className="option">
          <span>Hay Fever</span>
        </div>
      ),
    },
    {
      value: "HIV",
      label: (
        <div className="option">
          <span>HIV</span>
        </div>
      ),
    },
    {
      value: "Hepatitis B",
      label: (
        <div className="option">
          <span>Hepatitis B</span>
        </div>
      ),
    },
    {
      value: "Hepatitis C",
      label: (
        <div className="option">
          <span>Hepatitis C</span>
        </div>
      ),
    },
    {
      value: "Herpes",
      label: (
        <div className="option">
          <span>Herpes</span>
        </div>
      ),
    },
    {
      value: "High Blood Pressure",
      label: (
        <div className="option">
          <span>High Blood Pressure</span>
        </div>
      ),
    },
    {
      value: "Influenza (Seasonal Flu)",
      label: (
        <div className="option">
          <span>Influenza (Seasonal Flu)</span>
        </div>
      ),
    },
    {
      value: "Low Blood Pressure",
      label: (
        <div className="option">
          <span>Low Blood Pressure</span>
        </div>
      ),
    },
    {
      value: "Mastitis",
      label: (
        <div className="option">
          <span>Mastitis</span>
        </div>
      ),
    },
    {
      value: "Migraine",
      label: (
        <div className="option">
          <span>Migraine</span>
        </div>
      ),
    },
    {
      value: "Postpartum Depression",
      label: (
        <div className="option">
          <span>Postpartum Depression</span>
        </div>
      ),
    },
    {
      value: "Sexually Transmitted Infection",
      label: (
        <div className="option">
          <span>Sexually Transmitted Infection</span>
        </div>
      ),
    },
    {
      value: "Thyroid Disorders",
      label: (
        <div className="option">
          <span>Thyroid Disorders</span>
        </div>
      ),
    },
    {
      value: "Yeast Infection",
      label: (
        <div className="option">
          <span>Yeast Infection</span>
        </div>
      ),
    },
    {
      value: "Other",
      label: (
        <div className="option">
          <span>Other</span>
        </div>
      ),
    },
  ],
  medications: [
    {
      value: "Alfalfa",
      label: (
        <div className="option">
          <span>Alfalfa</span>
        </div>
      ),
    },
    {
      value: "Antidepressants",
      label: (
        <div className="option">
          <span>Antidepressants</span>
        </div>
      ),
    },
    {
      value: "Antihistamines",
      label: (
        <div className="option">
          <span>Antihistamines</span>
        </div>
      ),
    },
    {
      value: "Antipsychotics",
      label: (
        <div className="option">
          <span>Antipsychotics</span>
        </div>
      ),
    },
    {
      value: "Aspirin",
      label: (
        <div className="option">
          <span>Aspirin</span>
        </div>
      ),
    },
    {
      value: "Blessed thistle",
      label: (
        <div className="option">
          <span>Blessed thistle</span>
        </div>
      ),
    },
    {
      value: "Chemotherapy drugs",
      label: (
        <div className="option">
          <span>Chemotherapy drugs</span>
        </div>
      ),
    },
    {
      value: "Contraceptives",
      label: (
        <div className="option">
          <span>Contraceptives</span>
        </div>
      ),
    },
    {
      value: "Corticosteroids",
      label: (
        <div className="option">
          <span>Corticosteroids</span>
        </div>
      ),
    },
    {
      value: "Decongestants",
      label: (
        <div className="option">
          <span>Decongestants</span>
        </div>
      ),
    },
    {
      value: "Fennel",
      label: (
        <div className="option">
          <span>Fennel</span>
        </div>
      ),
    },
    {
      value: "Fenugreek",
      label: (
        <div className="option">
          <span>Fenugreek</span>
        </div>
      ),
    },
    {
      value: "Herbal supplements",
      label: (
        <div className="option">
          <span>Herbal supplements</span>
        </div>
      ),
    },
    {
      value: "Hormone replacement therapy",
      label: (
        <div className="option">
          <span>Hormone replacement therapy</span>
        </div>
      ),
    },
    {
      value: "Nasal sprays",
      label: (
        <div className="option">
          <span>Nasal sprays</span>
        </div>
      ),
    },
    {
      value: "NSAIDs",
      label: (
        <div className="option">
          <span>NSAIDs</span>
        </div>
      ),
    },
    {
      value: "Opioids",
      label: (
        <div className="option">
          <span>Opioids</span>
        </div>
      ),
    },
    {
      value: "Pseudoephedrine",
      label: (
        <div className="option">
          <span>Pseudoephedrine</span>
        </div>
      ),
    },
    {
      value: "Red raspberry leaf",
      label: (
        <div className="option">
          <span>Red raspberry leaf</span>
        </div>
      ),
    },
    {
      value: "Stinging nettle",
      label: (
        <div className="option">
          <span>Stinging nettle</span>
        </div>
      ),
    },
    {
      value: "Other",
      label: (
        <div className="option">
          <span>Other</span>
        </div>
      ),
    },
  ],
  vaccines: [
    {
      value: "Cholera",
      label: (
        <div className="option">
          <span>Cholera</span>
        </div>
      ),
    },
    {
      value: "COVID-19",
      label: (
        <div className="option">
          <span>COVID-19</span>
        </div>
      ),
    },
    {
      value: "Diphtheria, Tetanus, and Pertussis (DTaP)",
      label: (
        <div className="option">
          <span>Diphtheria, Tetanus, and Pertussis (DTaP)</span>
        </div>
      ),
    },
    {
      value: "Haemophilus Influenzae Type B (Hib)",
      label: (
        <div className="option">
          <span>Haemophilus Influenzae Type B (Hib)</span>
        </div>
      ),
    },
    {
      value: "Hepatitis A",
      label: (
        <div className="option">
          <span>Hepatitis A</span>
        </div>
      ),
    },
    {
      value: "Hepatitis B",
      label: (
        <div className="option">
          <span>Hepatitis B</span>
        </div>
      ),
    },
    {
      value: "Human Papillomavirus (HPV)",
      label: (
        <div className="option">
          <span>Human Papillomavirus (HPV)</span>
        </div>
      ),
    },
    {
      value: "Influenza (Flu)",
      label: (
        <div className="option">
          <span>Influenza (Flu)</span>
        </div>
      ),
    },
    {
      value: "Japanese Encephalitis (JE)",
      label: (
        <div className="option">
          <span>Japanese Encephalitis (JE)</span>
        </div>
      ),
    },
    {
      value: "Meningococcal",
      label: (
        <div className="option">
          <span>Meningococcal</span>
        </div>
      ),
    },
    {
      value: "Measles, Mumps, and Rubella (MMR)",
      label: (
        <div className="option">
          <span>Measles, Mumps, and Rubella (MMR)</span>
        </div>
      ),
    },
    {
      value: "Pneumococcal",
      label: (
        <div className="option">
          <span>Pneumococcal</span>
        </div>
      ),
    },
    {
      value: "Polio",
      label: (
        <div className="option">
          <span>Polio</span>
        </div>
      ),
    },
    {
      value: "Rabies",
      label: (
        <div className="option">
          <span>Rabies</span>
        </div>
      ),
    },
    {
      value: "Rotavirus",
      label: (
        <div className="option">
          <span>Rotavirus</span>
        </div>
      ),
    },
    {
      value: "Shingles (Herpes Zoster)",
      label: (
        <div className="option">
          <span>Shingles (Herpes Zoster)</span>
        </div>
      ),
    },
    {
      value: "Smallpox",
      label: (
        <div className="option">
          <span>Smallpox</span>
        </div>
      ),
    },
    {
      value: "Tetanus, Diphtheria, and Pertussis (Tdap)",
      label: (
        <div className="option">
          <span>Tetanus, Diphtheria, and Pertussis (Tdap)</span>
        </div>
      ),
    },
    {
      value: "Typhoid Fever",
      label: (
        <div className="option">
          <span>Typhoid Fever</span>
        </div>
      ),
    },
    {
      value: "Varicella (Chickenpox)",
      label: (
        <div className="option">
          <span>Varicella (Chickenpox)</span>
        </div>
      ),
    },
    {
      value: "Yellow Fever",
      label: (
        <div className="option">
          <span>Yellow Fever</span>
        </div>
      ),
    },
    {
      value: "Other",
      label: (
        <div className="option">
          <span>Other</span>
        </div>
      ),
    },
  ],
  diets: [
    {
      value: "Atkins",
      label: (
        <div className="option">
          <span>Atkins</span>
        </div>
      ),
    },
    {
      value: "Dairy-Free",
      label: (
        <div className="option">
          <span>Dairy-Free</span>
        </div>
      )
    },
    {
      value: "DASH",
      label: (
        <div className="option">
          <span>DASH</span>
        </div>
      ),
    },
    {
      value: "Gluten-Free",
      label: (
        <div className="option">
          <span>Gluten-Free</span>
        </div>
      ),
    },
    {
      value: "Keto",
      label: (
        <div className="option">
          <span>Ketogenic</span>
        </div>
      ),
    },
    {
      value: "Low-Carb",
      label: (
        <div className="option">
          <span>Low-Carb</span>
        </div>
      ),
    },
    {
      value: "Low-Fat",
      label: (
        <div className="option">
          <span>Low-Fat</span>
        </div>
      ),
    },
    {
      value: "Mediterranean",
      label: (
        <div className="option">
          <span>Mediterranean</span>
        </div>
      ),
    },
    {
      value: "Paleo",
      label: (
        <div className="option">
          <span>Paleo</span>
        </div>
      ),
    },
    {
      value: "Plant-Based",
      label: (
        <div className="option">
          <span>Plant-Based</span>
        </div>
      ),
    },
    {
      value: "Vegetarian",
      label: (
        <div className="option">
          <span>Vegetarian</span>
        </div>
      ),
    },
    {
      value: "Vegan",
      label: (
        <div className="option">
          <span>Vegan</span>
        </div>
      ),
    },
    {
      value: "Other",
      label: (
        <div className="option">
          <span>Other</span>
        </div>
      ),
    },
  ],
};

export default options;
