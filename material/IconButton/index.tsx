"use client";

import type { ButtonHTMLAttributes } from "react";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import { MuiClass, type MuiElementProps } from "../common";
import MuiBase from "../../utils/base";

type MuiIconButtonProps = {
  Icon: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  size?: "small" | "medium" | "large";
  href?: string;
  color?: "primary" | "secondary";
  disabled?: boolean;
  IconSx?: React.CSSProperties;
} & MuiElementProps;

type Variants = "default";
type SuffixTypes =
  | "disabled"
  | "size_small"
  | "size_medium"
  | "size_large"
  | "color_primary"
  | "color_secondary";

class IconButtonMainStyle extends MuiBaseStyleUtils<Variants, SuffixTypes> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeSize();
    this.setFillColors();
    this.makeDisabled();
  }
  private makeDefault() {
    const filledColor = () => {
      switch (this.theme.theme) {
        case "light":
          return "black";
        case "dark":
          return "white";
      }
    };

    this.makeDefaultStyle({
      commonStyle: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
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
        padding: "20px",
        borderRadius: "50%",
        minWidth: "24px",
        minHeight: "24px",
        color: "#fff",
        transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        ":hover": {
          backgroundColor: `rgba(${this.extractColorToRGB(
            this.theme.primary[this.theme.theme]
          )}, 0.08)`,
        },
        ":customStyle": `.<!ID!> > svg { fill: ${filledColor()} }`,
      },
    });
  }
  private makeDisabled() {
    this.makeStyleFor({
      suffix: "disabled",
      commonStyle: {
        PointerEvent: "none",
        cursor: "default",
        ":hover": {
          backgroundColor: "inherit",
        },
        ":customStyle": `.<!ID!> > svg { fill: ${
          this.theme.disabled[this.theme.theme]
        } }`,
      },
      variants: {
        default: {},
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
        ":customStyle": `.<!ID!> > svg { fill: ${
          this.theme.primary[this.theme.theme]
        } }`,
      },
      variants: {
        default: {},
      },
    });
    this.makeStyleFor({
      suffix: "color_secondary",
      commonStyle: {
        ":customStyle": `.<!ID!> > svg { fill: ${
          this.theme.secondary[this.theme.theme]
        } }`,
      },
      variants: {
        default: {},
      },
    });
  }
}

function IconButton({
  Icon,
  disabled,
  color,
  size,
  IconSx,
  onClick,
  ...props
}: MuiIconButtonProps & Omit<ButtonHTMLAttributes<any>, "style">) {
  const uStyle = useStyle();

  const Style = new IconButtonMainStyle({
    staticClassName: MuiClass.IconButton,
    ...uStyle,
    currentVariant: "default",
  }).setProps([
    disabled ? "disabled" : undefined,
    size ? `size_${size}` : undefined,
    color ? `color_${color}` : undefined,
  ]);
  return (
    <div
      style={{
        width: "fit-content",
        height: "fit-content",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <MuiBase
        element="button"
        className={Style.createClassNames()}
        ripple
        {...props}
        onClick={(...clickprops) => {
          if (props.href) window.location.assign(props.href);
          if (onClick) onClick(...clickprops);
        }}
      />
      <Icon />
    </div>
  );
}

export default IconButton;
