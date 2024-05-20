"use client";

import { createContext, useContext } from "react";
import { randomString } from "../utils";

export type CssProps =
  | (Partial<React.CSSProperties> &
      Partial<
        | {
            ":hover": Partial<React.CSSProperties>;
            ":active": Partial<React.CSSProperties>;
            ":link": Partial<React.CSSProperties>;
            ":visited": Partial<React.CSSProperties>;
            ":not": Partial<React.CSSProperties>;
            ":before": Partial<React.CSSProperties>;
            ":after": Partial<React.CSSProperties>;
            ":focus": Partial<React.CSSProperties>;
          }
        | { [key: string]: Partial<React.CSSProperties> }
      >)
  | { [key: string]: string };

type MuiStyleControlType = {
  id: string;
  className: string;
  currentStyle: CssProps;
  defaultStyle: CssProps;
  customStyle?: string;
  MuiStyle: () => JSX.Element;
};
export class MuiStyleControl {
  public id = "";
  public className = "";
  public currentStyle: CssProps = {};
  public defaultStyle: CssProps = {};
  public customStyle = "";
  public MuiStyle: () => JSX.Element;

  constructor(props: MuiStyleControlType) {
    this.id = props.id;
    this.className = props.className;
    this.currentStyle = props.currentStyle;
    this.MuiStyle = props.MuiStyle;
    this.defaultStyle = props.defaultStyle;
  }
}

/**
 * return id has a className and the JSX function to add to the element
 * use <!ID!> to the custom css to replace it to the current id
 * */
export function createStyle({
  className,
  defaultStyle,
  currentStyle,
  customCss,
  defaultCustomCss,
}: {
  className: string;
  defaultStyle: CssProps;
  currentStyle?: CssProps;
  customCss?: string;
  defaultCustomCss?: string;
}) {
  const id = `${randomString(10, Array.from("1234567890"))}_${className}`;
  const style = MuiStyle(
    [
      toSx(defaultStyle, `.${className}`),
      toSx(currentStyle || {}, `.${id}`),
      customCss?.replaceAll("<!ID!>", id),
      defaultCustomCss?.replaceAll("<!ID!>", className),
    ]
      .filter((e) => typeof e != "undefined")
      .join("\n")
  );

  if (!currentStyle) currentStyle = {};

  return new MuiStyleControl({
    id,
    MuiStyle: style,
    className,
    currentStyle,
    defaultStyle,
  });
}

export function styleToString(style: CssProps | Partial<React.CSSProperties>) {
  return (Object.keys(style) as Array<keyof Partial<React.CSSProperties>>)
    .reduce(
      (acc, key) =>
        "\t" +
        acc +
        key
          .split(/(?=[A-Z])/)
          .join("-")
          .toLowerCase() +
        ":" +
        style[key] +
        ";",
      ""
    )
    .trim()
    .replaceAll(";", ";\n");
}

function toSx(cssValues: CssProps, selector: string) {
  const bypass = "abcdefghijklmnopqrstuvwxyz1234567890-";

  const specialKeys = (Object.keys(cssValues) as Array<keyof CssProps>).filter(
    (e) => !bypass.includes((e as any)[0])
  );
  const cssSpecialVals = Object.assign(
    {},
    ...specialKeys.map((n) => {
      return { [n]: cssValues[n] };
    })
  ) as unknown as CssProps;

  const normalKeys = (Object.keys(cssValues) as Array<keyof CssProps>).filter(
    (e) => bypass.includes((e as any)[0])
  );
  const cssNormalVals = Object.assign(
    {},
    ...normalKeys.map((n) => {
      return { [n]: cssValues[n] };
    })
  ) as unknown as CssProps;

  let normalCssValue = "";
  if (normalKeys.length != 0)
    normalCssValue = `${selector} {\n${styleToString(cssNormalVals)}\n}`;

  const specialCssValue = specialKeys.map(
    (e) => `${selector}${e} {\n${styleToString((cssSpecialVals as any)[e])} \n}`
  );

  return [normalCssValue, ...(specialCssValue as string[])].join("\n");
}

function MuiStyle(StyleText: string, id?: string) {
  return () => (
    <style
      id={id}
      type="text/css"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: StyleText,
      }}
    />
  );
}

export const MuiColors = createContext({
  primary: "rgb(33, 150, 243)",
  secondary: "#555a64",
  disabled: "rgba(255, 255, 255, 0.3)",
  radio: {
    success: "rgb(102, 187, 106)",
    error: "rgb(216, 27, 96)",
  },
  error: "rgb(244, 67, 54)",
  success: "rgb(102, 187, 106)",
});
