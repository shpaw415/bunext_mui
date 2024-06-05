"use client";

import { createContext, useContext, useState } from "react";
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

export type MuiStyleControl = {
  id: string;
  className: string;
  currentStyle: CssProps;
  defaultStyle: CssProps;
  customStyle?: string;
};

class _MuiStyleContext {
  styleElement: JSX.Element;
  ids: string[] = [];
  content: { default: string[]; current: Record<string, string> } = {
    default: [],
    current: {},
  };
  private update?: React.Dispatch<React.SetStateAction<string>>;

  constructor() {
    this.styleElement = this.MuiStyle();
  }

  sxToCss(cssValues: CssProps, selector: string) {
    const bypass = "abcdefghijklmnopqrstuvwxyz1234567890-";

    const specialKeys = (
      Object.keys(cssValues) as Array<keyof CssProps>
    ).filter((e) => !bypass.includes((e as any)[0]));
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
      normalCssValue = `${selector} {\n${this.styleToString(cssNormalVals)}\n}`;

    const specialCssValue = specialKeys.map(
      (e) =>
        `${selector}${e} {\n${this.styleToString(
          (cssSpecialVals as any)[e]
        )} \n}`
    );

    return [normalCssValue, ...(specialCssValue as string[])].join("\n");
  }

  styleToString(style: CssProps | Partial<React.CSSProperties>) {
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
  private _update() {
    if (!this.update) return;
    this.update(
      [...this.content.default, ...Object.values(this.content.current)].join(
        "\n"
      )
    );
  }

  /**
   * return id has a className and the JSX function to add to the element
   * use <!ID!> to the custom css to replace it to the current id
   * */
  createStyle({
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

    if (!this.ids.includes(className)) {
      this.ids.push(className);
      this.content.default.push(
        ...[
          this.sxToCss(defaultStyle, `.${className}`),
          defaultCustomCss?.replaceAll("<!ID!>", className),
        ].filter((e) => e != undefined)
      );
    }

    this.content.current[id] = [
      this.sxToCss(currentStyle || {}, `.${id}`),
      customCss?.replaceAll("<!ID!>", id),
    ]
      .filter((e) => e != undefined)
      .join("\n");

    this._update();
    return {
      id,
      className,
      defaultStyle,
      currentStyle,
      customCss,
      defaultCustomCss,
    } as MuiStyleControl;
  }

  private MuiStyle() {
    const [data, setData] = useState("");
    this.update = setData;
    return (
      <style
        type="text/css"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: data,
        }}
      />
    );
  }
}

export const MuiStyleContext = createContext(new _MuiStyleContext());

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

export function MuiBaseStyle() {
  return useContext(MuiStyleContext).styleElement;
}
