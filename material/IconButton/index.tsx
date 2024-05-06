"use client";

import type { ButtonHTMLAttributes } from "react";
import { createStyle, styleToString, type CssProps } from "../../style";
import { MuiClass, type MuiElementProps } from "../common";
import { Ripple, RippleCss } from "../style/ripple";
import MuiBase from "../../utils/base";

type MuiIconButtonProps = {
  Icon:
    | React.FunctionComponent<React.SVGAttributes<SVGElement>>
    | (() => React.ReactNode);
  size?: "small" | "medium" | "large" | number;
  href?: string;
  color?: React.CSSProperties["color"];
  disabled?: boolean;
  IconSx?: React.CSSProperties;
} & MuiElementProps;

function svgColor(disabled?: boolean, color?: string) {
  if (disabled) return "rgba(255, 255, 255, 0.3)";
  return color || "white";
}
function sizeMode(size: MuiIconButtonProps["size"]) {
  switch (size) {
    case "small":
    case undefined:
      return 1;
    case "medium":
      return 1.3;
    case "large":
      return 1.6;
    default:
      return size;
  }
}

function IconButton({
  Icon,
  disabled,
  color,
  size,
  IconSx,
  ...props
}: MuiIconButtonProps & Omit<ButtonHTMLAttributes<any>, "style">) {
  const commonStyle: CssProps = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
    backgroundColor: "transparent",
    outline: "0px",
    border: "0px",
    cursor: "pointer",
    margin: "0px",
    userSelect: "none",
    verticalAlign: "middle",
    appearance: "none",
    textDecoration: "none",
    textAlign: "center",
    flex: "0 0 auto",
    fontSize: "1.5rem",
    padding: "8px",
    borderRadius: "50%",
    overflow: "hidden",
    color: "#fff",
    transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
    ":hover": {
      backgroundColor: "rgba(255, 255, 255, 0.08)",
    },
  };

  const currentStyle = {
    ...commonStyle,
    ...(disabled
      ? { PointerEvent: "none", cursor: "default", ":hover": {} }
      : {}),
    transform: `scale(${sizeMode(size)})`,
  };

  const Style = createStyle({
    className: MuiClass.IconButton,
    defaultStyle: commonStyle,
    currentStyle: currentStyle,
    customCss: `
    ${RippleCss}
    .<!ID!> > svg {
        fill: ${svgColor(disabled, color)};
        ${IconSx && styleToString(IconSx)}
        }`,
  });
  return (
    <MuiBase
      MuiStyle={Style}
      element="button"
      ripple
      onClick={() => {
        if (props.href) window.location.replace(props.href);
      }}
    >
      <Icon />
    </MuiBase>
  );
}

export default IconButton;
