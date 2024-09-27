"use client";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import { forwardRef, type HTMLAttributes } from "react";
import type { MuiProps } from "../../utils/base";

type MuiPaperProps = {
  children?: any;
} & HTMLAttributes<HTMLDivElement> &
  MuiProps;

type Variant = "default";
type SuffixType = "";

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        backgroundColor: this.colorFromTheme({
          dark: "rgb(18, 18, 18)",
          light: "rgb(255,255,255)",
        }),
        transition: "box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        borderRadius: "4px",
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 11px 15px -7px, rgba(0, 0, 0, 0.14) 0px 24px 38px 3px, rgba(0, 0, 0, 0.12) 0px 9px 46px 8px",
        backgroundImage:
          "linear-gradient(rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0.16))",
        margin: "32px",
        position: "relative",
        overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        maxHeight: "calc(100% - 64px)",
        maxWidth: "600px",
      },
    });
  }
}

const Paper = forwardRef<HTMLDivElement, MuiPaperProps>(
  ({ children, className, style, sx, ...props }, ref) => {
    const _style = useStyle(sx, style);
    const root = new Root({
      ..._style,
      staticClassName: "MUI_Paper_Root",
      currentVariant: "default",
    });

    return (
      <div
        className={`${root.createClassNames()} ${className || ""}`}
        style={_style.styleFromSx}
        ref={ref}
        {...props}
      >
        {children && children}
      </div>
    );
  }
);

Paper.displayName = "Paper";

export default Paper;
