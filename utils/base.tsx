"use client";

import { Ripple } from "../material/style/ripple";
import { forwardRef } from "react";

type MuiBase =
  | ({
      element?: "div";
      ripple?: boolean;
    } & React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >)
  | ({
      element: "button";
      ripple?: boolean;
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >)
  | ({
      element: "fieldset";
      ripple?: boolean;
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLFieldSetElement>,
      HTMLFieldSetElement
    >)
  | ({
      element: "input";
      ripple?: boolean;
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >)
  | ({
      element: "label";
      ripple?: boolean;
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >)
  | ({
      element: "legend";
      ripple?: boolean;
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLLegendElement>,
      HTMLLegendElement
    >)
  | ({
      element: "p";
      ripple?: boolean;
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    >)
  | ({
      element: "textarea";
      ripple?: boolean;
    } & React.DetailedHTMLProps<
      React.TextareaHTMLAttributes<HTMLTextAreaElement>,
      HTMLTextAreaElement
    >);

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
  const { ripple, element, className, onClick, children, ...props } = _props;
  const Element = setType(element);

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
