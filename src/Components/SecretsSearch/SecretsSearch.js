import React from "react";
import { Input } from "reactstrap";
import "./SecretsSearch.css";

const SecretsSearch = ({
  secretSearchValue,
  updateSecretState,
  focusInput
}) => {
  return (
    <div className="header-dropdown-container-child">
      <Input
        placeholder="Search for an existing secret..."
        list="secrets-list"
        onChange={updateSecretState}
        value={secretSearchValue}
        onClick={focusInput}
      />
    </div>
  );
};

export default SecretsSearch;
