"use client";

import { type ButtonHTMLAttributes } from "react";
import { createStyle, type CssProps } from "../../style";
import { type MuiElementProps } from "../common";
type MuiButtonProps = {
  variant?: "text" | "contained" | "outlined";
  sx?: Partial<CssProps>;
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
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
        "--webkit-tap-highlight-color": "transparent",
        backgroundColor: "transparent",
        outline: "0px",
        border: "0px",
        margin: "0px",
        cursor: "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        appearance: "none",
        textDecoration: "none",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: 500,
        fontSize: "0.875rem",
        lineHeight: "1.75",
        letterSpacing: "0.02857em",
        textTransform: "uppercase",
        minWidth: "64px",
        padding: "6px 8px",
        borderRadius: "4px",
        color: "rgb(33, 150, 243)",
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        ":hover": {
          textDecoration: "none",
          backgroundColor: "rgba(33, 150, 243, 0.08)",
        },
      };
      break;
  }
  const ButtonStyle = createStyle({
    className: ButtonClass,
    currentStyle: { ...styleData, ...sx },
  });

  return (
    <>
      <ButtonStyle.MuiStyle />
      <button
        {...props}
        className={[ButtonClass, ButtonStyle.id].join(" ")}
        suppressHydrationWarning
      >
        {children}
      </button>
    </>
  );
}

export default Button;
