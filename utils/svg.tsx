"use client";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../style";
import MuiBase from "./base";

type SvgModType = {
  id: string;
  children: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
};

class SvgManager extends MuiBaseStyleUtils<"svg", ""> {
  constructor(props: MuiBaseStyleUtilsProps<"svg">) {
    super(props);

    if (this.alreadyExists()) return;
    this.makeDefault();
  }

  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        height: "fit-content",
        width: "fit-content",
        ":customStyle": `.<!ID> > svg {  }`,
      },
      svg: {},
    });
  }
}

export function Svg({ id, children, ...props }: SvgModType) {
  const style = useStyle();
  const Manager = new SvgManager({
    ...style,
    currentVariant: "svg",
    staticClassName: "MUI_Svg",
  });

  return <MuiBase>{children as any}</MuiBase>;
}
