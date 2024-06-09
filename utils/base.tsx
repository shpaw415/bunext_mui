"use client";

import { Ripple, RippleCss } from "../material/style/ripple";
import { MuiStyleContext, type MuiStyleControl } from "../style";
import { forwardRef, useContext } from "react";

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
    >)
  | ({
      MuiStyle: MuiStyleControl;
      element: "fieldset";
      ripple?: boolean;
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLFieldSetElement>,
      HTMLFieldSetElement
    >)
  | ({
      MuiStyle: MuiStyleControl;
      element: "input";
      ripple?: boolean;
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >)
  | ({
      MuiStyle: MuiStyleControl;
      element: "label";
      ripple?: boolean;
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLLabelElement>,
      HTMLLabelElement
    >)
  | ({
      MuiStyle: MuiStyleControl;
      element: "legend";
      ripple?: boolean;
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLLegendElement>,
      HTMLLegendElement
    >)
  | ({
      MuiStyle: MuiStyleControl;
      element: "p";
      ripple?: boolean;
    } & React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLParagraphElement>,
      HTMLParagraphElement
    >)
  | ({
      MuiStyle: MuiStyleControl;
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
  const { ripple, element, MuiStyle, className, onClick, children, ...props } =
    _props;
  const Element = setType(element);

  const StyleContext = useContext(MuiStyleContext);

  StyleContext.createStyle({
    className: "RippleStyle",
    defaultStyle: {},
    currentStyle: {},
    customCss: RippleCss,
  });

  return (
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
      ref={ref}
    >
      {children}
    </Element.type>
  );
});

export default MuiBase;
