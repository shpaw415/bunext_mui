"use client";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import {
  cloneElement,
  createElement,
  forwardRef,
  useMemo,
  type HTMLAttributes,
} from "react";
import type { MuiProps } from "../../utils/base";

type MuiTypographyProps = {
  children?: JSX.Element | string | string[];
  variant?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "span";
} & MuiProps &
  HTMLAttributes<
    React.ReactElement<Exclude<MuiTypographyProps["variant"], undefined>>
  >;

type SuffixType = "string" | "Element";

class Root extends MuiBaseStyleUtils<"default", SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<"default">) {
    super(props);

    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeTypes();
  }

  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        margin: "0px",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        lineHeight: "1.5",
        letterSpacing: "0.00938em",
        color: this.colorFromTheme({
          light: "black",
          dark: "white",
        }),
      },
    });
  }
  private makeTypes() {
    this.makeStyleFor({
      suffix: "string",
      commonStyle: {
        fontWeight: "400",
        fontSize: "1rem",
      },
    });
  }
}

const Typography = forwardRef<HTMLElement, MuiTypographyProps>(
  ({ children, variant, className, sx, style, ...props }, ref) => {
    const _style = useStyle(sx, style);
    const manager = useMemo(
      () =>
        new Root({
          ..._style,
          staticClassName: "MUI_Typography_Root",
          currentVariant: "default",
        }),
      []
    );
    const _className = useMemo(() => manager.createClassNames(), []);

    if (typeof children == "string" || Array.isArray(children)) {
      return createElement(variant || "p", {
        ...props,
        style: _style.styleFromSx,
        children,
        className: `${className || ""} ${_className}`,
        ref,
      });
    } else if (children) {
      return cloneElement(children, {
        ...props,
        style: _style.styleFromSx,
        className: `${className || ""} ${_className}`,
        ref,
      });
    }
  }
);
Typography.displayName = "Typography";

export default Typography;
