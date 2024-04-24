"use client";

import { type ButtonHTMLAttributes } from "react";
import { createStyle, type CssProps } from "../../style";
import { type MuiElementProps } from "../common";
type MuiButtonProps = {
  variant?: "text" | "contained" | "outlined";
  sx?: {
    button: CssProps;
    label: {
      color: CssProps["color"];
      size: CssProps["fontSize"];
      fontFamily: CssProps["fontFamily"];
    };
  };
} & MuiElementProps;

function Button({
  variant,
  sx,
  children,
  ...props
}: MuiButtonProps & Omit<ButtonHTMLAttributes<any>, "style">) {
  let styleData: CssProps = {};
  const ButtonClass = "MUI_Button";

  switch (variant) {
    case "text":
    case undefined:
      styleData = {
        backgroundColor: "rgba(0,0,0,0)",
        transition: "ease-in-out",
        transitionDelay: "2s",
        "&hover": {
          color: "red",
        },
      };
      break;
  }
  const {id, MuiStyle } = createStyle({
    className: ButtonClass,
    defaultStyle: "background-color: red",
    currentStyle: ""
  });

  return (
    <>
      <MuiStyle />
      <button {...props} className={[ButtonClass, id].join(" ")} suppressHydrationWarning>
        {typeof children == "string" ? children.toUpperCase() : children}
      </button>
    </>
  );
}

export default Button;
