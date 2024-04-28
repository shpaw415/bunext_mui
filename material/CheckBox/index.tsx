import type { MuiElementProps } from "../common";
import Check from "@material-design-icons/svg/filled/done.svg";
type MuiCheckBox = {
  orientation?: "vertical" | "horizontal";
} & MuiElementProps;

function CheckBox({}: MuiCheckBox) {
  return (
    <div>
      <div>{(Check as any)({})}</div>
      <input type="checkbox" hidden checked={false} />
    </div>
  );
}

export default CheckBox;
