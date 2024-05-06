"use client";
import type { MuiElementProps } from "../common";
import { createStyle, type CssProps } from "../../style";
import Radio from ".";
import MuiBase from "../../utils/base";
import Text from "../Text";
import { useState } from "react";
import { Expect } from "../../utils";

type RadioGroupProps = MuiElementProps & {
  label?: string;
  children: React.ReactNode | React.ReactNode[];
  defaultChecked?: string;
  direction?: "column" | "row";
};

export default function RadioGroup({
  children,
  label,
  defaultChecked,
  direction,
  ...props
}: RadioGroupProps) {
  const [current, setCurrent] = useState<undefined | string>(undefined);
  if (!Expect(<Radio />, children))
    throw Error("must be Radio Elements in RadioGroup");

  if (current == undefined && defaultChecked) setCurrent(defaultChecked);

  let NewElements: Array<React.ReactNode> = [];

  const childArray = Array.isArray(children) ? children : [children];

  for (const El of childArray as Array<JSX.Element>) {
    if (!El) return;
    const checked = current == El.key;
    NewElements.push(
      <El.type
        {...El.props}
        checked={checked}
        onClick={(e: any) => {
          if (!El.props.disabled) setCurrent(El.key as string);
          El.props.onClick && El.props.onClick(e);
        }}
      />
    );
  }

  const wrapperStyle = createStyle({
    className: "Mui_RadioGroup_Wrapper",
    defaultStyle: {
      display: "inline-flex",
      flexDirection: "column",
      alignItems: "start",
    },
    currentStyle: {},
  });

  const GroupStyle = createStyle({
    className: "Mui_RadioGroup_InputGroup",
    defaultStyle: {
      display: "inline-flex",
    },
    currentStyle: {
      flexDirection: direction ? direction : "column",
    },
  });

  const labelSX: CssProps = {
    color: "rgba(255, 255, 255, 0.7)",
    marginLeft: "5px",
  };

  return (
    <MuiBase MuiStyle={wrapperStyle} {...props}>
      {label && <Text sx={labelSX}>{label}</Text>}
      <MuiBase MuiStyle={GroupStyle}>{NewElements}</MuiBase>
    </MuiBase>
  );
}
