import * as React from "react";
import { Switch } from "antd";

const MarkUserTop = ({ handleOnChange }) => {
  return (
    <div>
      <Switch defaultChecked onChange={handleOnChange} />
    </div>
  );
};

export default MarkUserTop;
