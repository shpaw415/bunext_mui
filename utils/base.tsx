"use client";

import { Ripple } from "../material/style/ripple";
import { forwardRef } from "react";
import type { SxProps } from "../style";
import { useMediaQuery } from ".";

type MuiBaseType =
  | ({
      element?: "div";
    } & React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >)
  | ({
      element: "button";
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >)
  | ({
      element: "fieldset";
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLFieldSetElement>,
      HTMLFieldSetElement
    >)
  | ({
      element: "input";
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >)
  | ({
      element: "label";
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >)
  | ({
      element: "legend";
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLLegendElement>,
      HTMLLegendElement
    >)
  | ({
      element: "p";
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    >)
  | ({
      element: "textarea";
    } & React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >);

export type MuiProps = {
  sx?: SxProps;
};

type MuiBase = MuiBaseType & {
  ripple?: boolean;
} & MuiProps;

function setType(elTag: MuiBase["element"]) {
  switch (elTag) {
    case "button":
      return <button />;
    case "fieldset":
      return <fieldset />;
    case "input":
      return <input />;
    case "label":
      return <label />;
    case "div":
    case undefined:
      return <div />;
    case "legend":
      return <legend />;
    case "p":
      return <p />;
    case "textarea":
      return <textarea />;
  }
}

const MuiBase = forwardRef<any, MuiBase>((_props: MuiBase, ref) => {
  const { ripple, element, className, onClick, children, sx, ...props } =
    _props;
  const Element = setType(element);

  const mediaQuery = useMediaQuery();

  return (
    <Element.type
      suppressHydrationWarning
      className={[className, ripple ? "ripple" : ""].join(" ")}
      style={{
        overflow: ripple ? "hidden" : undefined,
        ...props.style,
      }}
      {...props}
      onClick={(e: any) => {
        onClick && onClick(e);
        ripple && Ripple(e);
      }}
      ref={ref}
    >
      {children}
    </Element.type>
  );
});

MuiBase.displayName = "MuiBase";

export default MuiBase;
