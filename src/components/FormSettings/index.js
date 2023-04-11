import { categoryOptions } from "../../includes/categories";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateSettings } from "../../redux/settingsSlice";
import "./styles.scss";
import { AiFillEdit } from "react-icons/ai";

export default function FormSettings() {
  const dispatch = useDispatch();
  const initialSettings = useSelector((state) => state.settings.settings);

  const [settings, setSettings] = useState(initialSettings);
  const [errorMessage, setErrorMessage] = useState([]);
  const [sucessMessage, setSucessMessage] = useState("");

  const handleSettingsChange = (e, categoryName) => {
    const newAmount = e.target.value;
    const newSettings = { ...settings, [categoryName]: newAmount };
    setSettings(newSettings);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setSucessMessage("");

    const newErrorMessages = [];

    for (const amount in settings) {
      // check if everything was filled
      if (settings[amount] === "") {
        newErrorMessages.push("All fields are required!");

        // check if everything is positive
      } else if (parseFloat(settings[amount]) < 0) {
        newErrorMessages.push("The amount should be positive!");
      } else {
      }
    }

    setErrorMessage(newErrorMessages);

    if (newErrorMessages.length === 0) {
      setErrorMessage("");
      dispatch(updateSettings(settings));
      setSucessMessage("The settings were successfully updated!");
    }
  };

  const InputAmount = ({ cat }) => {
    return (
      <div className="amount-input">
        <label key={cat}>
          {cat}:
          <input
            type="number"
            name={cat}
            onChange={(e) => handleSettingsChange(e, cat)}
            value={settings[cat]}
            // placeholder={settings.cat}
            maxLength={8}
            required={true}
          />
        </label>
      </div>
    );
  };

  return (
    <div className="settings-form">
      {errorMessage.length > 0 && (
        <div className="error-message">
          {" "}
          <p>Invalid data:</p>
          <ul>
            {errorMessage.map((error, index) => (
              <li key={index}>{error}</li>
            ))}
          </ul>
        </div>
      )}
      {sucessMessage !== "" && (
        <div className="success-message">{sucessMessage}</div>
      )}

      <form onSubmit={handleSubmit}>
        <p className="settings-definition">
          Define the maximum amount to spend according to each category:
        </p>
        <div className="input-container">
          {categoryOptions.map((cat) => (
            <div key={cat}>
              {(cat === "Housing" ||
                cat === "Utilities" ||
                cat === "Transportation" ||
                cat === "Groceries" ||
                cat === "Personal") && (
                <div className="first-column">
                  <InputAmount cat={cat} />
                </div>
              )}
              {(cat === "Clothing" ||
                cat === "Health" ||
                cat === "Leasing" ||
                cat === "Salary" ||
                cat === "ROI") && (
                <div className="second-column">
                  <InputAmount cat={cat} />
                </div>
              )}
            </div>
          ))}
        </div>
        <button>
          <AiFillEdit />
          Save
        </button>
      </form>
    </div>
  );
}