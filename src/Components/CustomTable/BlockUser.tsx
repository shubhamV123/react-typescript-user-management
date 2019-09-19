import * as React from "react";
import { Switch } from "antd";

interface BlockUserProps {
  active?: boolean;
  handleOnChange?: any;
  disabled?: boolean;
}
const BlockUser: React.FC<BlockUserProps> = ({
  handleOnChange,
  active,
  disabled
}) => {
  return (
    <div>
      <Switch disabled={disabled} checked={active} onChange={handleOnChange} />
    </div>
  );
};

export default BlockUser;
