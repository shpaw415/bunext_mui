"use client";

import { createContext, useContext, type ButtonHTMLAttributes } from "react";
import { randomString } from "../../utils";

type CssProps = Partial<React.CSSProperties> &
  Partial<{
    "&hover": React.CSSProperties;
  }>;

type MuiElementProps = {
  variant?: string;
  sx?: CssProps;
  children?: string | number | JSX.Element;
};

type MuiButtonProps = {
  variant?: "text" | "contained" | "outlined";
  sx?: {
    button: CssProps;
    label: {
      color: CssProps["color"];
      size: CssProps["fontSize"];
      font: CssProps["fontFamily"];
    };
  };
} & MuiElementProps;

function ConvertToSx(sx: CssProps, id: string) {
  const bypass = "abcdefghijklmnopqrstuvwxyz1234567890";
  // specialKeys
  const keys = Object.keys(sx).filter((k) => !bypass.includes(k[0]));
  let specialSX = "";
  return id;
}

class StyleContexter {
  private ids: Record<string, string> = {};
  set(id: string, content: string) {
    if (typeof this.ids[id] == "undefined") this.ids[id] = content;
    else this.ids[id] = this.ids[id] + content;
  }
  log() {
    console.log(this.ids);
  }
}

const StyleContext = createContext(new StyleContexter());

function Button({
  variant,
  sx,
  children,
  ...props
}: MuiButtonProps & ButtonHTMLAttributes<any>) {
  const style = useContext(StyleContext);
  let styleData: CssProps = {};
  const ButtonClass = "MUI_Button";
  const ButtonID = randomString(10);
  style.set(`${ButtonID}_${ButtonClass}`, "backgroundColor: red");
  style.log();
  switch (variant) {
    case "text":
    case undefined:
      styleData = {
        backgroundColor: "rgba(0,0,0,0)",
        transition: "ease-in-out",
        transitionDelay: "2s",
        "&hover": {
          color: "red",
        },
      };
      break;
  }

  return (
    <>
      <button {...props} className={ButtonClass}>
        {typeof children == "string" ? children.toUpperCase() : children}
      </button>
    </>
  );
}

export default Button;
