"use client";

import { Ripple, RippleCss } from "../material/style/ripple";
import { createStyle, type MuiStyleControl } from "../style";
import React from "react";
type MuiBase =
  | ({
      MuiStyle: MuiStyleControl;
      element?: "div";
      ripple?: boolean;
    } & React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >)
  | ({
      MuiStyle: MuiStyleControl;
      element: "button";
      ripple?: boolean;
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >);

export default function MuiBase({
  children,
  MuiStyle,
  className,
  element,
  ripple,
  onClick,
  ...props
}: MuiBase) {
  let Element = <div />;
  switch (element) {
    case "button":
      Element = <button />;
      break;
  }

  let RippleStyle;

  if (ripple)
    RippleStyle = createStyle({
      className: "RippleStyle",
      defaultStyle: {},
      currentStyle: {},
      customCss: RippleCss,
    });

  return (
    <React.Fragment>
      {RippleStyle && <RippleStyle.MuiStyle />}
      <MuiStyle.MuiStyle />
      <Element.type
        suppressHydrationWarning
        className={[
          MuiStyle.id,
          MuiStyle.className,
          className,
          ripple ? "ripple" : undefined,
        ].join(" ")}
        style={{
          overflow: ripple ? "hidden" : undefined,
        }}
        {...props}
        onClick={(e: any) => {
          onClick && onClick(e);
          ripple && Ripple(e);
        }}
      >
        {children}
      </Element.type>
    </React.Fragment>
  );
}
