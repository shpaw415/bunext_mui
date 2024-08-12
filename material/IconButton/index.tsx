"use client";

import { cloneElement, forwardRef } from "react";
import {
  _MuiStyleContext,
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import MuiBase, { type MuiProps } from "../../utils/base";

type MuiIconButtonProps = {
  children: JSX.Element;
  size?: "small" | "medium" | "large";
  href?: string;
  color?: "primary" | "secondary";
  disabled?: boolean;
} & React.HTMLAttributes<HTMLButtonElement> &
  MuiProps;

type Variants = "default";
type SuffixTypes =
  | "disabled"
  | "size_small"
  | "size_medium"
  | "size_large"
  | "color_primary"
  | "color_secondary";

class Root extends MuiBaseStyleUtils<Variants, SuffixTypes> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeSize();
    this.setFillColors();
    this.makeDisabled();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
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
        padding: "10px",
        borderRadius: "50%",
        minWidth: "24px",
        minHeight: "24px",
        color: this.colorFromTheme({
          light: "black",
          dark: "white",
        }),
        width: "fit-content",
        height: "fit-content",
        transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        overflow: "hidden",
        ":hover": {
          backgroundColor: `rgba(${this.extractColorToRGB(
            this.theme.primary[this.theme.theme]
          )}, 0.08)`,
        },
      },
    });
  }
  private makeDisabled() {
    this.makeStyleFor({
      suffix: "disabled",
      commonStyle: {
        PointerEvents: "none",
        cursor: "default",
        ":hover": {
          backgroundColor: "inherit",
        },
        color: this.colorFromTheme({
          light: this.theme.disabled.light,
          dark: this.theme.disabled.dark,
        }),
      },
    });
  }
  private makeSize() {
    this.makeStyleFor({
      suffix: "size_small",
      commonStyle: {
        transform: "scale(1)",
      },
      variants: { default: {} },
    });
    this.makeStyleFor({
      suffix: "size_medium",
      commonStyle: {
        transform: "scale(1.3)",
      },
      variants: { default: {} },
    });
    this.makeStyleFor({
      suffix: "size_large",
      commonStyle: {
        transform: "scale(1.6)",
      },
      variants: { default: {} },
    });
  }
  private setFillColors() {
    this.makeStyleFor({
      suffix: "color_primary",
      commonStyle: {
        color: this.colorFromTheme({
          light: this.theme.primary.light,
          dark: this.theme.primary.dark,
        }),
      },
    });
    this.makeStyleFor({
      suffix: "color_secondary",
      commonStyle: {
        color: this.colorFromTheme({
          light: this.theme.secondary.light,
          dark: this.theme.secondary.dark,
        }),
      },
    });
  }
}

class Icon extends MuiBaseStyleUtils<Variants, SuffixTypes> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        fill: "currentcolor",
      },
    });
  }
}

const IconButton = forwardRef<HTMLButtonElement, MuiIconButtonProps>(
  (
    {
      children,
      disabled,
      color,
      size,
      onClick,
      style,
      sx,
      className,
      ...props
    },
    ref
  ) => {
    const uStyle = useStyle(sx, style);

    const root = new Root({
      staticClassName: "MUI_IconButton_Root",
      ...uStyle,
      currentVariant: "default",
    }).setProps([
      disabled ? "disabled" : undefined,
      size ? `size_${size}` : undefined,
      color ? `color_${color}` : undefined,
    ]);

    const icon = new Icon({
      staticClassName: "MUI_IconButton_Icon",
      ...uStyle,
      currentVariant: "default",
    });

    return (
      <MuiBase
        element="button"
        className={root.createClassNames() + ` ${className || ""}`}
        ripple
        {...props}
        ref={ref}
        onClick={(...clickprops) => {
          if (props.href) window.location.assign(props.href);
          if (onClick) onClick(...clickprops);
        }}
        style={uStyle.styleFromSx}
      >
        {cloneElement<React.HTMLAttributes<HTMLOrSVGElement>>(children, {
          className:
            children.props.className ?? "" + ` ${icon.createClassNames()}`,
        })}
      </MuiBase>
    );
  }
);

IconButton.displayName = "IconButton";

export default IconButton;
