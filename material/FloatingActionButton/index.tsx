"use client";
import { type MuiElementProps } from "../common";
import MuiBase from "../../utils/base";
import { createStyle, type CssProps } from "../../style";
import { useState } from "react";

type FloatingButtonProps = {
  children:
    | React.FunctionComponent<React.SVGAttributes<SVGElement>>
    | React.ReactNode;
  sx?: CssProps;
  disabled?: boolean;
  animationDelay?: number;
} & MuiElementProps;

function setTextEnable(TextEnable: boolean): CssProps {
  if (TextEnable)
    return {
      width: "fit-content",
      borderRadius: "50px",
      padding: "0 15px 0 15px",
    };
  return {};
}

function setDisabled(disabled: boolean): CssProps {
  if (disabled)
    return {
      cursor: "default",
      backgroundColor: "rgba(255, 255, 255, 0.12)",
      color: "rgba(255, 255, 255, 0.5)",
      ":hover": {},
    };
  return {};
}

export default function FloatingButton({
  children,
  sx,
  disabled,
  variant,
  onClick,
  animationDelay,
  ...props
}: FloatingButtonProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) {
  const [state, setState] = useState<1 | 0>(1);
  let Icon = children;
  let Text = "";
  if (Array.isArray(children)) {
    if (typeof children[0] == "string") Text = children[0];
    else Icon = children[0];
    if (typeof children[1] == "string") Text = children[1];
    else Icon = children[1];
  }

  const isTextEnable = Text.length > 0;

  const defaultStyle: CssProps = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    boxSizing: "border-box",
    outline: "0px",
    border: "0px",
    margin: "0px",
    cursor: "pointer",
    userSelect: "none",
    verticalAlign: "middle",
    appearance: "none",
    textDecoration: "none",
    fontFamily: "Roboto, Helvetica, Arial, sans-serif",
    fontWeight: "500",
    fontSize: "0.875rem",
    lineHeight: "1.75",
    letterSpacing: "0.02857em",
    textTransform: "uppercase",
    minHeight: "36px",
    borderRadius: "50%",
    padding: "0px",
    minWidth: "0px",
    width: "56px",
    height: "56px",
    zIndex: "1050",
    boxShadow:
      "rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px",
    color: "rgb(255, 255, 255)",
    backgroundColor: "rgb(33, 150, 243)",
    ":hover": {
      backgroundColor: "rgb(23, 105, 170)",
    },
    transform: `scale(${state})`,
  };

  const WrapperStyle = createStyle({
    className: "MUI_FloatingButton_Wrapper",
    defaultStyle: defaultStyle,
    currentStyle: {
      transition: `background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform ${
        animationDelay || 225
      }ms`,
      ...setTextEnable(isTextEnable),
      ...setDisabled(Boolean(disabled)),
      ...sx,
    },
    customCss: `
    .<!ID!> > svg {
        fill: ${disabled ? "rgba(255, 255, 255, 0.3)" : "white"};
        margin-right:${isTextEnable ? "10px" : "0px"};
    }
    `,
  });

  return (
    <MuiBase
      element="button"
      MuiStyle={WrapperStyle}
      {...props}
      disabled={Boolean(disabled)}
      ripple
      onClick={(e) => {
        onClick && onClick(e);
        if (animationDelay) {
          setState(state == 1 ? 0 : 1);
          setTimeout(() => setState(state), animationDelay || 225);
        }
      }}
    >
      {Icon}
      {Text}
    </MuiBase>
  );
}
