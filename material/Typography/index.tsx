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
  type HTMLAttributes,
} from "react";

type MuiTypographyProps = {
  children?: JSX.Element | string;
  variant?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "span";
} & HTMLAttributes<
  React.ReactElement<Exclude<MuiTypographyProps["variant"], undefined>>
>;

type SuffixType = "string" | "Element";

class Root extends MuiBaseStyleUtils<"default", SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<"default">) {
    super(props);

    if (this.alreadyExists()) {
      if (props.sxProps) this.makeSx();
      return;
    }
    this.makeDefault();
    this.makeTypes();
  }

  private makeDefault() {
    const setColorFromTheme = () => {
      switch (this.theme.theme) {
        case "dark":
          return "white";
        case "light":
          return "black";
      }
    };

    this.makeDefaultStyle({
      commonStyle: {
        margin: "0px",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        lineHeight: "1.5",
        letterSpacing: "0.00938em",
        color: setColorFromTheme(),
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
  ({ children, variant, className, ...props }, ref) => {
    const style = useStyle();
    const manager = new Root({
      ...style,
      staticClassName: "MUI_Typography_Root",
      currentVariant: "default",
    });

    if (typeof children == "string") {
      return createElement(variant || "p", {
        ...props,
        children,
        className: `${className && className} ${manager.createClassNames()}`,
        ref,
      });
    } else if (children) {
      return cloneElement(children, {
        ...props,
        className: `${className && className} ${manager.createClassNames()}`,
        ref,
      });
    }
  }
);
Typography.displayName = "Typography";

export default Typography;
