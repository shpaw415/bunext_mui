"use client";

import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import type { MuiProps } from "../../utils/base";

type MUIBadgeProps = {
  variant?: "default" | "dot";
  side?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  children: JSX.Element;
  badgeContent?: string | number;
} & MuiProps &
  React.HTMLAttributes<HTMLSpanElement>;

type Variants = MUIBadgeProps["variant"];
type SuffixTypes = Exclude<MUIBadgeProps["side"], undefined>;

class Root extends MuiBaseStyleUtils<Variants, SuffixTypes> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        position: "relative",
        display: "inline-flex",
        verticalAlign: "middle",
        flexShrink: "0",
      },
    });
  }
}

class BadgeRoot extends MuiBaseStyleUtils<Variants, SuffixTypes> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeSide();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "flex",
        flexFlow: "wrap",
        "-WebkitBoxPack": "center",
        placeContent: "center",
        "-WebkitBoxAlign": "center",
        alignItems: "center",
        position: "absolute",
        boxSizing: "border-box",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: "500",
        fontSize: "0.75rem",
        zIndex: "1",
        backgroundColor: this.theme.primary[this.theme.theme],
        transform: "scale(1) translate(50%, -50%)",
        transition: "transform 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        color: "rgb(255, 255, 255)",
        cursor: "default",
      },
      default: {
        minWidth: "20px",
        lineHeight: "1",
        padding: "0px 6px",
        height: "20px",
        borderRadius: "10px",
      },
      dot: {
        lineHeight: "1",
        borderRadius: "4px",
        height: "8px",
        minWidth: "8px",
        padding: "0px",
      },
    });
  }
  private makeSide() {
    this.makeStyleFor({
      suffix: "top-right",
      commonStyle: {
        top: "0px",
        right: "0px",
      },
    });
    this.makeStyleFor({
      suffix: "top-left",
      commonStyle: {
        top: "0px",
        left: "0px",
        transform: "translate(-50%, -50%)",
      },
    });
    this.makeStyleFor({
      suffix: "bottom-left",
      commonStyle: {
        bottom: "0px",
        left: "0px",
        transform: "translate(-50%, 50%)",
      },
    });
    this.makeStyleFor({
      suffix: "bottom-right",
      commonStyle: {
        bottom: "0px",
        right: "0px",
        transform: "translate(50%, 50%)",
      },
    });
  }
}

export default function Badge({
  className,
  sx,
  style,
  badgeContent,
  side,
  ...props
}: MUIBadgeProps) {
  const _style = useStyle(sx, style);

  const currentVariant = props.variant || "default";

  const root = new Root({
    ..._style,
    staticClassName: "MUI_Badge_Root",
    currentVariant: currentVariant,
  });

  const badge = new BadgeRoot({
    ..._style,
    staticClassName: "MUI_Badge_Badge_Root",
    currentVariant: currentVariant,
  }).setProps([side ? side : "top-right"]);
  return (
    <span
      className={root.createClassNames() + ` ${className || ""}`}
      {...props}
    >
      {props.children}
      <span className={badge.createClassNames()} style={_style.styleFromSx}>
        {badgeContent && currentVariant == "default" && badgeContent}
      </span>
    </span>
  );
}
