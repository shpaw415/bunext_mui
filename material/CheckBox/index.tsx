"use client";
import { type MuiElementProps, MuiClass } from "../common";
import { createStyle } from "../../style";
import { Svg } from "../../utils/svg";
import Check from "@material-design-icons/svg/outlined/check.svg";
import MuiBase from "../../utils/base";
import { useState, type InputHTMLAttributes } from "react";
import Text from "../Text";

type HTMLElement = HTMLInputElement;

type MuiCheckBox = {
  label?: string;
  size?: "small" | "medium" | "large";
  disabeled?: boolean;
  checked?: boolean;
  color?: React.CSSProperties["color"];
} & MuiElementProps;

function sizeMode(size: MuiCheckBox["size"]) {
  switch (size) {
    case "medium":
    case undefined:
      return 0.84;
    case "small":
      return 0.75;
    case "large":
      return 1;
  }
}

export default function CheckBox({
  label,
  disabeled,
  checked,
  size,
  color,
  sx,
  ...props
}: MuiCheckBox & Omit<InputHTMLAttributes<any>, "style">) {
  const [selected, setSelect] = useState(
    Boolean(checked || props.defaultChecked)
  );

  const Style = createStyle({
    className: MuiClass.CheckBox,
    defaultStyle: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      position: "relative",
      boxSizing: "border-box",
      backgroundColor: "transparent",
      outline: "0px",
      border: "0px",
      margin: "0px",
      cursor: "pointer",
      userSelect: "none",
      verticalAlign: "middle",
      appearance: "none",
      textDecoration: "none",
      padding: "9px",
      borderRadius: "50%",
      color: "rgba(255, 255, 255, 0.7)",
      overflow: "hidden",
      ":hover": {
        backgroundColor: "rgba(33, 150, 243, 0.08)",
      },
    },
  });

  const WrapperStyle = createStyle({
    className: "MUI_Checkbox_wrapper",
    defaultStyle: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      width: "fit-content",
      height: "fit-content",
    },
    currentStyle: sx,
  });
  const currentScale = sizeMode(size);
  const disabeledColor = "rgba(255, 255, 255, 0.3)";
  const selectedStyle = {
    svg: {
      fill: "black",
    },
    box: {
      backgroundColor: disabeled ? disabeledColor : "rgb(33, 150, 243)",
      border: "2px solid transparent",
      borderRadius: "4px",
      scale: currentScale,
    },
  };

  if (color) {
    selectedStyle.box.backgroundColor = disabeled ? disabeledColor : color;
  }

  const unselectedStyle: {
    svg: React.CSSProperties;
    box: React.CSSProperties;
  } = {
    svg: {
      fill: "transparent",
    },
    box: {
      border: `2px solid ${disabeled ? "rgba(255, 255, 255, 0.3)" : "white"}`,
      borderRadius: "4px",
      scale: currentScale,
      backgroundColor: "transparent",
    },
  };

  let currentStyle = {
    ...(selected ? selectedStyle : unselectedStyle),
  };

  return (
    <MuiBase MuiStyle={WrapperStyle}>
      <MuiBase
        MuiStyle={Style}
        onClick={(e) => {
          if (disabeled) return;
          setSelect(!selected);
        }}
        ripple
      >
        <Svg svg={<Check />} sx={currentStyle} />
        <input
          type="checkbox"
          checked={selected}
          onChange={props.onChange || (() => {})}
          style={{
            height: "100%",
            width: "100%",
            opacity: 0,
            position: "absolute",
            top: 0,
            left: 0,
          }}
          {...props}
        />
      </MuiBase>
      {label && <Text>{label}</Text>}
    </MuiBase>
  );
}
