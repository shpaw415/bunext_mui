"use client";

import { forwardRef, useMemo } from "react";
import {
  _MuiStyleContext,
  MuiBaseStyleUtils,
  type MuiTheme,
  useStyle,
} from "../../style";
import MuiBase, { type MuiProps } from "../../utils/base";

type MuiButtonProps = {
  variant?: "text" | "contained" | "outlined";
  StartIcon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  EndIcon?: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  size?: "small" | "medium" | "large";
  href?: string;
  color?: "error" | "success";
  disabled?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  MuiProps & {
    type?: "submit" | "reset" | "button";
  };

type ButtonSuffix =
  | "error"
  | "success"
  | "size_small"
  | "size_medium"
  | "size_large"
  | "disabled";

class ButtonStyleManager extends MuiBaseStyleUtils<
  MuiButtonProps["variant"],
  ButtonSuffix
> {
  constructor({
    theme,
    styleContext,
    variant,
  }: {
    theme: MuiTheme;
    styleContext: _MuiStyleContext;
    variant: MuiButtonProps["variant"];
  }) {
    super({
      theme,
      styleContext,
      staticClassName: "MUI_Button",
      currentVariant: variant || "contained",
    });
    if (this.alreadyExists()) return;
    this._makeDefault();
    this.makeError();
    this.makeSuccess();
    this.makeSize();
    this.makeDisable();
  }

  private _makeDefault() {
    this.makeDefaultStyle({
      text: {
        color: "rgb(33, 150, 243)",
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        ":hover": {
          textDecoration: "none",
          backgroundColor: "rgba(33, 150, 243, 0.08)",
        },
        padding: "6px 8px",
      },
      contained: {
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
        padding: "6px 16px",
      },
      outlined: {
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        border: "1px solid rgba(33, 150, 243, 0.5)",
        color: "rgb(33, 150, 243)",
        ":hover": {
          textDecoration: "none",
          backgroundColor: "rgba(33, 150, 243, 0.08)",
          border: "1px solid rgb(33, 150, 243)",
        },
        padding: "5px 15px",
      },
      commonStyle: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
        "-webkit-tap-highlight-color": "transparent",
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
      },
    });
  }

  private makeError() {
    this.makeStyleFor({
      suffix: "error",
      variants: {
        contained: {
          backgroundColor: "#d32f2f",
          ":customStyle": "<!ID!>",
          ":hover": {
            backgroundColor: "#c62828",
            boxShadow:
              "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
          },
        },
        outlined: {
          border: "1px solid rgba(211, 47, 47, 0.5)",
          ":hover": {
            backgroundColor: "rgba(211, 47, 47, 0.04)",
            border: "1px solid #d32f2f",
          },
          color: this.theme.error[this.theme.theme],
        },
        text: {
          ":hover": {
            backgroundColor: "rgba(211, 47, 47, 0.04)",
          },
          color: this.theme.error[this.theme.theme],
        },
      },
    });
  }

  private makeSuccess() {
    this.makeStyleFor({
      suffix: "success",
      variants: {
        contained: {
          backgroundColor: "#2e7d32",
          color: "#fff",
          ":hover": {
            backgroundColor: "#1b5e20",
            boxShadow:
              "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
          },
        },
        outlined: {
          color: "#2e7d32",
          border: "1px solid rgba(46, 125, 50, 0.5)",
          ":hover": {
            border: "1px solid #2e7d32",
            backgroundColor: "rgba(46, 125, 50, 0.04)",
          },
        },
        text: {
          color: "#2e7d32",
          ":hover": {
            backgroundColor: "rgba(46, 125, 50, 0.04)",
          },
        },
      },
    });
  }

  private makeDisable() {
    this.makeStyleFor({
      suffix: "disabled",
      variants: {
        text: {
          color: "rgba(255, 255, 255, 0.3)",
        },
        contained: {
          color: "rgba(135, 135, 135, 0.3)",
          boxShadow: "none",
          backgroundColor: "rgba(255, 255, 255, 0.12)",
          ":hover": {
            backgroundColor: "rgba(135, 135, 135, 0.12)",
          },
        },
        outlined: {
          color: "rgba(135, 135, 135, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.12)",
          ":hover": {
            textDecoration: "none",
            backgroundColor: "rgba(33, 150, 243, 0.08)",
          },
        },
      },
      commonStyle: {
        cursor: "default",
        PointerEvents: "none",
      },
    });
  }

  private makeSize() {
    const contained = {
      small: {
        padding: "4px 10px",
        fontSize: "0.815rem",
      },
      medium: {
        padding: "6px 16px",
        fontSize: "0.875rem",
      },
      large: {
        padding: "8px 22px",
        fontSize: "0.9375rem",
      },
    };
    const outlined = {
      small: {
        padding: "3px 9px",
        fontSize: "0.8125rem",
      },
      medium: {
        padding: "5px 15px",
        fontSize: "0.875rem",
      },
      large: {
        padding: "7px 21px",
        fontSize: "0.9375rem",
      },
    };
    const text = {
      small: {
        padding: "4px 5px",
        fontSize: "0.8125rem",
      },
      medium: {
        padding: "6px 8px",
        fontSize: "0.875rem",
      },
      large: {
        padding: "8px 11px",
        fontSize: "0.9375rem",
      },
    };

    this.makeStyleFor({
      suffix: "size_small",
      variants: {
        contained: contained.small,
        outlined: outlined.small,
        text: text.small,
      },
    });
    this.makeStyleFor({
      suffix: "size_medium",
      variants: {
        contained: contained.medium,
        outlined: outlined.medium,
        text: text.medium,
      },
    });
    this.makeStyleFor({
      suffix: "size_large",
      variants: {
        contained: contained.large,
        outlined: outlined.large,
        text: text.large,
      },
    });
  }
}

const Button = forwardRef<HTMLButtonElement, MuiButtonProps>(
  (
    {
      variant,
      children,
      disabled,
      size,
      StartIcon,
      EndIcon,
      href,
      color,
      sx,
      style,
      className,
      onClick,
      ...props
    },
    ref
  ) => {
    const _style = useStyle(sx, style);

    const styleManager = useMemo(
      () =>
        new ButtonStyleManager({
          theme: _style.theme,
          styleContext: _style.styleContext,
          variant,
        })
          .setProps([
            disabled ? "disabled" : undefined,
            size ? `size_${size}` : undefined,
            color,
          ])
          .createClassNames(),
      [variant, disabled, size, color]
    );

    return (
      <MuiBase
        element="button"
        ref={ref}
        disabled={disabled}
        className={styleManager + ` ${className || ""}`}
        style={_style.styleFromSx}
        {...props}
        ripple
        onClick={(e) => {
          if (href) window.location.replace(href);
          if (onClick) onClick(e);
        }}
      >
        {StartIcon && (
          <div
            style={{
              margin: "0 8px 0 -4px",
              display: "inherit",
            }}
          >
            <StartIcon />
          </div>
        )}
        {children}
        {EndIcon && (
          <div
            style={{
              display: "inherit",
              margin: "0px -4px 0px 8px",
            }}
          >
            <EndIcon />
          </div>
        )}
      </MuiBase>
    );
  }
);
Button.displayName = "Button";

export default Button;
