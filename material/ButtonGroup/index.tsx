import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import MuiBase from "../../utils/base";
import { MuiClass, type MuiElementProps } from "../common";

type MuiButtonGroupProps = {
  orientation?: "vertical" | "horizontal";
} & MuiElementProps;

class ButtonGroupManager extends MuiBaseStyleUtils<
  "group",
  MuiButtonGroupProps["orientation"]
> {
  constructor(props: MuiBaseStyleUtilsProps<"group">) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeOrientation();
  }

  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "inline-flex",
        borderRadius: "4px",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
        ":customStyle": `.<!ID!> > .${MuiClass.Button} {\nborder-radius: 0px;\nmargin-right: 1px;\n}`,
      },
      group: {},
    });
  }
  private makeOrientation() {
    this.makeStyleFor({
      suffix: "vertical",
      variants: {
        group: {
          flexDirection: "column",
        },
      },
    });

    this.makeStyleFor({
      suffix: "horizontal",
      variants: {
        group: {},
      },
    });
  }
}

function ButtonGroup({ children, orientation }: MuiButtonGroupProps) {
  const style = useStyle();
  const manager = new ButtonGroupManager({
    currentVariant: "group",
    staticClassName: MuiClass.ButtonGroup,
    ...style,
  }).setProps(orientation);

  return (
    <>
      <MuiBase className={manager.createClassNames()}>{children}</MuiBase>
    </>
  );
}

export default ButtonGroup;
