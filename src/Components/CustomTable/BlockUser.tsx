import * as React from "react";
import { Switch } from "antd";

const BlockUser = ({ handleOnChange, active, disabled }) => {
  console.log("active", active, disabled);
  return (
    <div>
      <Switch disabled={disabled} checked={active} onChange={handleOnChange} />
    </div>
  );
};

export default BlockUser;
