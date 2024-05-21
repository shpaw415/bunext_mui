"use client";

import { type ButtonHTMLAttributes } from "react";
import { createStyle, type CssProps } from "../../style";
import { MuiClass, type MuiElementProps } from "../common";
import { Ripple, RippleCss } from "../style/ripple";
import MuiBase from "../../utils/base";
import { Svg } from "../../utils/svg";
type MuiButtonProps = {
  variant?: "text" | "contained" | "outlined";
  StartIcon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  EndIcon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  size?: "small" | "medium" | "large";
  href?: string;
  color?: "error" | "success";
} & MuiElementProps;

function sizeMode(
  type: MuiButtonProps["variant"],
  size: MuiButtonProps["size"]
): Partial<CssProps> {
  switch (type) {
    case "contained":
    case undefined:
      switch (size) {
        case "small":
          return {
            padding: "4px 10px",
            fontSize: "0.815rem",
          };
        case "medium":
          return {
            padding: "6px 16px",
            fontSize: "0.875rem",
          };
        case "large":
        case undefined:
          return {
            padding: "8px 22px",
            fontSize: "0.9375rem",
          };
      }
    case "outlined":
      switch (size) {
        case "small":
          return {
            padding: "3px 9px",
            fontSize: "0.8125rem",
          };
        case "medium":
          return {
            padding: "5px 15px",
            fontSize: "0.875rem",
          };
        case "large":
        case undefined:
          return {
            padding: "7px 21px",
            fontSize: "0.9375rem",
          };
      }

    case "text":
      switch (size) {
        case "small":
          return {
            padding: "4px 5px",
            fontSize: "0.8125rem",
          };
        case "medium":
          return {
            padding: "6px 8px",
            fontSize: "0.875rem",
          };
        case "large":
        case undefined:
          return {
            padding: "8px 11px",
            fontSize: "0.9375rem",
          };
      }
  }
}
function disableMode(
  disabled: boolean,
  variant: MuiButtonProps["variant"]
): Partial<CssProps> {
  if (!disabled) return {};
  const commonDisabled: Partial<CssProps> = {
    PointerEvent: "none",
    cursor: "default",
  };
  switch (variant) {
    case "contained":
    case undefined:
      return {
        ...commonDisabled,
        color: "rgba(135, 135, 135, 0.3)",
        boxShadow: "none",
        backgroundColor: "rgba(255, 255, 255, 0.12)",
        ":hover": {
          backgroundColor: "rgba(135, 135, 135, 0.12)",
        },
      };
    case "outlined":
      return {
        ...commonDisabled,
        color: "rgba(135, 135, 135, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        ":hover": {
          textDecoration: "none",
          backgroundColor: "rgba(33, 150, 243, 0.08)",
        },
      };
    case "text":
      return {
        ...commonDisabled,
        color: "rgba(255, 255, 255, 0.3)",
      };
  }
}
function ErrorMode(
  errored: boolean,
  variant: MuiButtonProps["variant"]
): Partial<CssProps> {
  if (!errored) return {};
  const errorColor: Partial<CssProps> = {
    color: "#d32f2f",
  };
  switch (variant) {
    case "contained":
    case undefined:
      return {
        backgroundColor: "#d32f2f",
        ":hover": {
          backgroundColor: "#c62828",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        },
      };
    case "outlined":
      return {
        ...errorColor,
        border: "1px solid rgba(211, 47, 47, 0.5)",
        ":hover": {
          backgroundColor: "rgba(211, 47, 47, 0.04)",
          border: "1px solid #d32f2f",
        },
      };
    case "text":
      return {
        ...errorColor,
        ":hover": {
          backgroundColor: "rgba(211, 47, 47, 0.04)",
        },
      };
  }
}
function SuccessMode(
  success: boolean,
  variant: MuiButtonProps["variant"]
): Partial<CssProps> {
  if (!success) return {};
  switch (variant) {
    case "contained":
    case undefined:
      return {
        backgroundColor: "#2e7d32",
        color: "#fff",
        ":hover": {
          backgroundColor: "#1b5e20",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        },
      };
    case "outlined":
      return {
        color: "#2e7d32",
        border: "1px solid rgba(46, 125, 50, 0.5)",
        ":hover": {
          border: "1px solid #2e7d32",
          backgroundColor: "rgba(46, 125, 50, 0.04)",
        },
      };
    case "text":
      return {
        color: "#2e7d32",
        ":hover": {
          backgroundColor: "rgba(46, 125, 50, 0.04)",
        },
      };
  }
}
function svgColor(variant: MuiButtonProps["variant"], error: boolean): string {
  switch (variant) {
    case "contained":
    case undefined:
      return error ? "#d32f2f" : "white";
    case "outlined":
      return error ? "#d32f2f" : "rgb(33, 150, 243)";
    case "text":
      return error ? "#d32f2f" : "rgb(33, 150, 243)";
  }
}

function Button({
  variant,
  sx,
  children,
  disabled,
  size,
  StartIcon,
  EndIcon,
  href,
  color,
  ...props
}: MuiButtonProps & Omit<ButtonHTMLAttributes<any>, "style">) {
  let styleData: CssProps = {};
  const commonStyle: Partial<CssProps> = {
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
    borderRadius: "4px",
    overflow: "hidden",
    height: "fit-content",
  };

  switch (variant) {
    case "text":
      styleData = {
        ...commonStyle,
        color: "rgb(33, 150, 243)",
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        ":hover": {
          textDecoration: "none",
          backgroundColor: "rgba(33, 150, 243, 0.08)",
        },
      };
      break;
    case "contained":
    case undefined:
      styleData = {
        ...commonStyle,
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        color: "rgb(255, 255, 255)",
        backgroundColor: "rgb(33, 150, 243)",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 3px 1px -2px, rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px",
        ":hover": {
          textDecoration: "none",
          backgroundColor: "rgb(23, 105, 170)",
          boxShadow:
            "rgba(0, 0, 0, 0.2) 0px 2px 4px -1px, rgba(0, 0, 0, 0.14) 0px 4px 5px 0px, rgba(0, 0, 0, 0.12) 0px 1px 10px 0px",
        },
      };
      break;
    case "outlined":
      styleData = {
        ...commonStyle,
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        border: "1px solid rgba(33, 150, 243, 0.5)",
        color: "rgb(33, 150, 243)",
        ":hover": {
          textDecoration: "none",
          backgroundColor: "rgba(33, 150, 243, 0.08)",
          border: "1px solid rgb(33, 150, 243)",
        },
      };
      break;
  }

  styleData = {
    ...styleData,
    ...ErrorMode(color == "error", variant),
    ...SuccessMode(color == "success", variant),
    ...disableMode(Boolean(disabled), variant),
    ...sizeMode(variant, size),
  };

  const ButtonStyle = createStyle({
    className: MuiClass.Button,
    defaultStyle: {},
    currentStyle: { ...styleData, ...sx },
    customCss: `
    ${RippleCss}
    .<!ID!> > div > svg {
      fill: ${svgColor(variant, Boolean(color == "error"))};
    }
  `,
  });

  return (
    <MuiBase
      MuiStyle={ButtonStyle}
      element="button"
      {...props}
      ripple
      onClick={(e) => {
        if (href) window.location.replace(href);
        if (props.onClick) props.onClick(e);
      }}
    >
      {StartIcon && (
        <Svg
          sx={{
            box: {
              margin: "0 8px 0 -4px",
              display: "inherit",
            },
            svg: {},
          }}
          svg={<StartIcon />}
        />
      )}
      {children}
      {EndIcon && (
        <Svg
          sx={{
            box: {
              display: "inherit",
              margin: "0px -4px 0px 8px",
            },
            svg: {},
          }}
          svg={<EndIcon />}
        />
      )}
    </MuiBase>
  );
}

export default Button;
