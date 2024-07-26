"use client";
import type { MuiElementProps } from "../common";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import Radio from ".";
import MuiBase from "../../utils/base";
import Text from "../Typography";
import { useState } from "react";
import { Expect } from "../../utils";

type RadioGroupProps = MuiElementProps & {
  label?: string;
  children: React.ReactNode | React.ReactNode[];
  defaultChecked?: string;
  direction?: "column" | "row";
  onchange?: (
    previous: string | undefined,
    current: string,
    setCurrent: React.Dispatch<React.SetStateAction<string | undefined>>
  ) => void;
};

type Variants = "default";
type SuffixType = "direction_column" | "direction_row";

class WrapperStyle extends MuiBaseStyleUtils<Variants, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }

  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "start",
      },
      default: {},
    });
  }
}

class GroupStyle extends MuiBaseStyleUtils<Variants, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);

    if (this.alreadyExists()) return;

    this.makeDefault();
    this.makeDirection();
  }

  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        flexDirection: "column",
      },
      default: {},
    });
  }

  private makeDirection() {
    this.makeStyleFor({
      suffix: "direction_row",
      commonStyle: {
        flexDirection: "row",
      },
      variants: { default: {} },
    });
    this.makeStyleFor({
      suffix: "direction_column",
      commonStyle: {
        flexDirection: "column",
      },
      variants: { default: {} },
    });
  }
}

class LabelStyle extends MuiBaseStyleUtils<Variants, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;

    this.makeDefaultStyle({
      commonStyle: {
        color: "rgba(255, 255, 255, 0.7)",
        marginLeft: "5px",
      },
      default: {},
    });
  }
}

export default function RadioGroup({
  children,
  label,
  defaultChecked,
  direction,
  onchange,
  ...props
}: RadioGroupProps) {
  const [current, setCurrent] = useState<undefined | string>(undefined);
  const style = useStyle();
  if (!Expect(<Radio />, children))
    throw Error("must be Radio Elements in RadioGroup");

  if (current == undefined && defaultChecked) setCurrent(defaultChecked);

  let NewElements: Array<React.ReactNode> = [];

  const childArray = Array.isArray(children) ? children : [children];

  for (const El of childArray as Array<JSX.Element>) {
    if (!El) return;
    if (!El.props.name) throw new Error("Radio must have a name prop");
    const checked = current == El.props.name;
    NewElements.push(
      <El.type
        {...El.props}
        key={El.props.name}
        checked={checked}
        onClick={(e: any) => {
          if (El.props.disabled) return;
          El.props.onClick && El.props.onClick(e);
          if (current != El.props.name) setCurrent(El.props.name as string);
          if (current != (El.props.name as string) && onchange)
            onchange(current, El.props.name, setCurrent);
        }}
      />
    );
  }

  const wrapperStyle = new WrapperStyle({
    ...style,
    staticClassName: "Mui_RadioGroup_Wrapper",
    currentVariant: "default",
  });

  const groupStyle = new GroupStyle({
    staticClassName: "Mui_RadioGroup_InputGroup",
    currentVariant: "default",
    ...style,
  }).setProps(direction ? `direction_${direction}` : undefined);

  const labelStyle = new LabelStyle({
    staticClassName: "MUI_RadioGroup_Label",
    currentVariant: "default",
    ...style,
  });

  return (
    <MuiBase className={wrapperStyle.createClassNames()} {...props}>
      {label && <Text className={labelStyle.createClassNames()}>{label}</Text>}
      <MuiBase className={groupStyle.createClassNames()}>{NewElements}</MuiBase>
    </MuiBase>
  );
}
