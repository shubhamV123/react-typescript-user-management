import * as React from "react";
import { Switch } from "antd";

interface MarkUserTopProps {
  active?: boolean;
  handleOnChange?: any;
}
const MarkUserTop: React.FC<MarkUserTopProps> = ({
  handleOnChange,
  active
}) => {
  return (
    <div>
      <Switch checked={active} onChange={handleOnChange} />
    </div>
  );
};

export default MarkUserTop;
