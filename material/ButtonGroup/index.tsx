import { createStyle } from "../../style";
import MuiBase from "../../utils/base";
import { MuiClass, type MuiElementProps } from "../common";

type MuiButtonGroupProps = {
  orientation?: "vertical" | "horizontal";
} & MuiElementProps;

function ButtonGroup({ children, orientation }: MuiButtonGroupProps) {
  const Style = createStyle({
    className: MuiClass.ButtonGroup,
    defaultStyle: {
      display: "inline-flex",
      borderRadius: "4px",
      boxShadow:
        "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
    },
    currentStyle: {
      ...(orientation == "vertical"
        ? {
            flexDirection: "column",
          }
        : {}),
    },
    customCss: `
    .<!ID!> > .${MuiClass.Button} {
      border-radius: 0px;
      margin-right: 1px;
    }
    `,
  });
  return (
    <>
      <MuiBase MuiStyle={Style} ripple>
        {children}
      </MuiBase>
    </>
  );
}

export default ButtonGroup;
