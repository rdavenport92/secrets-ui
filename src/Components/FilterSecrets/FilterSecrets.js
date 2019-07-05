import React from "react";
import Secret from "../Secret/Secret";
import "./FilterSecrets.css";

const FilterSecrets = ({ secrets, secretSearchValue, editSecret }) => {
  return (
    <div className="filter-secrets-container">
      {secrets
        .filter(
          secret =>
            secret.Name.toLowerCase().includes(
              secretSearchValue.toLowerCase()
            ) ||
            secret.Description.toLowerCase().includes(
              secretSearchValue.toLowerCase()
            )
        )
        .map((secret, index) => (
          <Secret
            key={index}
            _id={secret._id}
            Name={secret.Name}
            Description={secret.Description}
            editSecret={editSecret}
          />
        ))}
    </div>
  );
};

export default FilterSecrets;
