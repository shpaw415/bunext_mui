"use client";
import { type MuiElementProps } from "../common";
import MuiBase from "../../utils/base";
import {
  MuiBaseStyleUtils,
  useStyle,
  type CssProps,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import { useState } from "react";

type Variants = "default";
type SuffixType =
  | "disabled"
  | "animate_small"
  | "animate_large"
  | "text-enabled"
  | "color_primary"
  | "color_secondary"
  | "size_small"
  | "size_medium"
  | "size_large";

type FloatingButtonProps = {
  children:
    | React.FunctionComponent<React.SVGAttributes<SVGElement>>
    | React.ReactNode;
  sx?: CssProps;
  disabled?: boolean;
  color?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  animateOnClick?: boolean;
} & MuiElementProps;

class FloatingButtonManager extends MuiBaseStyleUtils<Variants, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeAnimate();
    this.makeSize();
    this.makeTextEnabled();
    this.makeColor();
    this.makeDisabled();
  }

  private makeDefault() {
    const setSvgFill = () => {
      switch (this.theme.theme) {
        case "dark":
          return "white";
        case "light":
          return "black";
      }
    };

    this.makeDefaultStyle({
      commonStyle: {
        display: "inline-flex",
        WebkitBoxAlign: "center",
        alignItems: "center",
        WebkitBoxPack: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
        WebkitTapHighlightColor: "transparent",
        outline: "0px",
        border: "0px",
        margin: "0px",
        cursor: "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        appearance: "none",
        textDecoration: "none",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: "700",
        fontSize: "0.875rem",
        lineHeight: "1.75",
        letterSpacing: "0.02857em",
        textTransform: "uppercase",
        minHeight: "auto",
        transition:
          "background-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, box-shadow 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, border-color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 250ms",
        borderRadius: "24px",
        padding: "0px 16px",
        minWidth: "48px",
        width: "auto",
        height: "48px",
        zIndex: "1050",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px",
        color: "rgba(0, 0, 0, 0.87)",
        backgroundColor: "rgb(224, 224, 224)",
        ":hover": {
          backgroundColor: "rgba(224, 224, 224, 0.5)",
        },
        ":customStyle": `.<!ID!> > svg { fill: ${setSvgFill()}; margin-right: 0px }`,
      },
      default: {},
    });
  }

  private makeColor() {
    this.makeStyleFor({
      suffix: "color_primary",
      commonStyle: {
        color: "white",
        backgroundColor: this.theme.primary[this.theme.theme],
        ":hover": {
          backgroundColor: `rgba(${this.extractColorToRGB(
            this.theme.primary[this.theme.theme]
          ).join(", ")}, 0.7)`,
        },
        ":customStyle": `.<!ID!> > svg { fill: white; }`,
      },
      variants: { default: {} },
    });

    this.makeStyleFor({
      suffix: "color_secondary",
      commonStyle: {
        color: "white",
        backgroundColor: this.theme.secondary[this.theme.theme],
        ":hover": {
          backgroundColor: `rgba(${this.extractColorToRGB(
            this.theme.secondary[this.theme.theme]
          ).join(", ")}, 0.7)`,
        },
        ":customStyle": `.<!ID!> > svg { fill: white; }`,
      },
      variants: { default: {} },
    });
  }

  private makeAnimate() {
    this.makeStyleFor({
      suffix: "animate_small",
      commonStyle: {
        transform: `scale(0)`,
      },
      variants: { default: {} },
    });

    this.makeStyleFor({
      suffix: "animate_large",
      commonStyle: {
        transform: `scale(1)`,
      },
      variants: { default: {} },
    });
  }

  private makeSize() {
    this.makeStyleFor({
      suffix: "size_small",
      commonStyle: {
        height: "34px",
        minWidth: "34px",
        padding: "0px 8px",
      },
      variants: { default: {} },
    });
    this.makeStyleFor({
      suffix: "size_medium",
      commonStyle: {},
      variants: { default: {} },
    });
    this.makeStyleFor({
      suffix: "size_large",
      commonStyle: {
        height: "48px",
        minWidth: "48px",
        padding: "0px 16px",
      },
      variants: { default: {} },
    });
  }

  private makeTextEnabled() {
    this.makeStyleFor({
      suffix: "text-enabled",
      commonStyle: {
        width: "fit-content",
        borderRadius: "50px",
        padding: "0 15px 0 15px",
        ":customStyle": `.<!ID!> > svg { margin-right: 10px; }`,
      },
      variants: { default: {} },
    });
  }

  private makeDisabled() {
    const setTextColor = () => {
      switch (this.theme.theme) {
        case "dark":
          return "rgba(255, 255, 255, 0.5)";
        case "light":
          return "rgba(0, 0, 0, 0.5)";
      }
    };

    const setBackgroundColor = () => {
      switch (this.theme.theme) {
        case "dark":
          return "rgba(255, 255, 255, 0.12)";
        case "light":
          return "rgba(0, 0, 0, 0.12)";
      }
    };

    const setSvgFillColor = () => {
      switch (this.theme.theme) {
        case "dark":
          return "rgba(255, 255, 255, 0.3)";
        case "light":
          return "rgba(0, 0, 0, 0.3)";
      }
    };

    this.makeStyleFor({
      suffix: "disabled",
      commonStyle: {
        cursor: "default",
        backgroundColor: setBackgroundColor(),
        color: setTextColor(),
        ":hover": {
          backgroundColor: setBackgroundColor(),
        },
        ":customStyle": `.<!ID!> > svg { fill: ${setSvgFillColor()}; }`,
      },
      variants: { default: {} },
    });
  }
}

export default function FloatingButton({
  children,
  sx,
  disabled,
  onClick,
  color,
  size,
  animateOnClick,
  ...props
}: FloatingButtonProps &
  React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >) {
  const [state, setState] = useState<1 | 0>(1);
  const style = useStyle();
  const manager = new FloatingButtonManager({
    ...style,
    sxProps: sx
      ? {
          id: props.id,
          sx,
        }
      : undefined,
    staticClassName: "MUI_FloatingButton",
    currentVariant: "default",
  });

  let Icon = children;
  let Text = "";
  if (Array.isArray(children)) {
    if (typeof children[0] == "string") Text = children[0];
    else Icon = children[0];
    if (typeof children[1] == "string") Text = children[1];
    else Icon = children[1];
  }

  const isTextEnable = Text.length > 0;

  manager.setProps([
    disabled ? "disabled" : undefined,
    isTextEnable ? "text-enabled" : undefined,
    state == 0 ? "animate_small" : "animate_large",
    color ? `color_${color}` : undefined,
    size ? `size_${size}` : undefined,
  ]);

  return (
    <MuiBase
      element="button"
      {...props}
      className={manager.createClassNames()}
      ripple={disabled ? false : true}
      onClick={(e) => {
        onClick && onClick(e);
        if (disabled || !animateOnClick) return;
        setState(state == 1 ? 0 : 1);
        setTimeout(() => setState(state), 225);
      }}
    >
      {Icon}
      {Text}
    </MuiBase>
  );
}
