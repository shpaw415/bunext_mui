"use client";

import { createContext, useContext, useState, type CSSProperties } from "react";
import { RippleCss } from "../material/style/ripple";

export type CssProps =
  | (Partial<React.CSSProperties> &
      Partial<
        | {
            ":hover":
              | Partial<React.CSSProperties>
              | Record<string, string | number>;
            ":active": Partial<React.CSSProperties>;
            ":link": Partial<React.CSSProperties>;
            ":visited": Partial<React.CSSProperties>;
            ":not": Partial<React.CSSProperties>;
            ":before": Partial<React.CSSProperties>;
            ":after": Partial<React.CSSProperties>;
            ":focus": Partial<React.CSSProperties>;
            /**
             * <!ID!> Is modified with the staticClassName
             */
            ":customStyle": string;
          }
        | { [key: string]: Partial<React.CSSProperties> }
      >)
  | { [key: string]: string };

type MediaQueryNames = "sm" | "md" | "lg";
type MediaQueryValues = {
  lg: 1200;
  md: 600;
  sm: 425;
};

export type MuiStyleControl = {
  className: string;
  defaultStyle: CssProps;
  customStyle?: string;
  alreadyCreated: boolean;
};

export class _MuiStyleContext {
  ids: string[] = [];
  content: Record<string, string> = {};
  update?: React.Dispatch<React.SetStateAction<string>>;
  timeout?: Timer;

  constructor() {
    this.createStyle({
      className: "RippleStyle",
      defaultStyle: {
        ":customStyle": RippleCss,
      },
    });
  }

  sxToCss(cssValues: CssProps, selector: string) {
    const bypass =
      "abcdefghijklmnopqrstuvwxyz1234567890-ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const specialKeys = (
      Object.keys(cssValues) as Array<keyof CssProps>
    ).filter((e) => !bypass.includes(e[0]));
    const cssSpecialVals = Object.assign(
      {},
      ...specialKeys.map((n) => {
        return { [n]: cssValues[n] };
      })
    ) as CssProps;

    const normalKeys = (Object.keys(cssValues) as Array<keyof CssProps>).filter(
      (e) => bypass.includes(e[0])
    );
    const cssNormalVals = Object.assign(
      {},
      ...normalKeys.map((n) => {
        return { [n]: cssValues[n] };
      })
    ) as CssProps;

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
    const self = this;
    if (this.timeout) clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (!self.update) return;
      self.update(Object.values(this.content).join("\n"));
      self.timeout = undefined;
    }, 10);
  }

  private OmitCustomCss(props: CssProps) {
    return Object.assign(
      {},
      ...(Object.keys(props) as Array<keyof CssProps>)
        .filter((e) => e != ":customStyle")
        .map((e) => {
          return {
            [e]: props[e],
          };
        })
    ) as Partial<CssProps>;
  }

  /**
   * return id has a className and the JSX function to add to the element
   * use <!ID!> to the custom css to replace it to the current id
   * */
  createStyle({
    className,
    defaultStyle,
  }: {
    className: string;
    defaultStyle: CssProps;
  }) {
    let alreadyCreated = true;

    if (!this.ids.includes(className)) {
      alreadyCreated = false;
      this.ids.push(className);
      const defaultContent = [
        this.sxToCss(this.OmitCustomCss(defaultStyle), `.${className}`),
        (defaultStyle[":customStyle"] as string | undefined)?.replaceAll(
          "<!ID!>",
          className
        ),
      ].filter((e) => e != undefined && e.length > 0);

      this.content[className] = defaultContent.join("\n");
    }

    this._update();
    return {
      className,
      defaultStyle,
      alreadyCreated,
    } as MuiStyleControl;
  }
  mediaQueryToString() {}
  removeID(id: string) {
    const founded = this.ids.findIndex((e) => e == id);
    if (founded == -1) return;
    this.ids.splice(founded, 1);
  }
}

export type MuiBaseStyleUtilsProps<Variant> = {
  theme: MuiTheme;
  styleContext: _MuiStyleContext;
  currentVariant: Exclude<Variant, undefined>;
  staticClassName: string;
  sxProps?: {
    sx: Partial<CssProps>;
    id?: string;
    bypassRevalidate?: boolean;
  };
};

export class MuiBaseStyleUtils<Variant, suffixesType> {
  protected variant: Exclude<Variant, undefined>;
  protected theme: MuiTheme;
  protected styleContext: _MuiStyleContext;
  public staticClassName: string;
  protected suffixes: Array<suffixesType> = [];
  protected currentSuffix: Array<suffixesType> = [];
  private id?: string;
  private sxProps?: {
    sx: Partial<CssProps>;
    id: string;
  };
  constructor({
    theme,
    styleContext,
    currentVariant,
    staticClassName,
    sxProps,
  }: MuiBaseStyleUtilsProps<Variant>) {
    this.variant = currentVariant;
    this.theme = theme;
    this.styleContext = styleContext;
    this.staticClassName = staticClassName;
    if (
      (sxProps && !sxProps.bypassRevalidate) ||
      (sxProps && sxProps.id && !this.styleContext.ids.includes(sxProps.id))
    ) {
      this.id = `${this.staticClassName}_${sxProps.id}`;
      this.sxProps = sxProps as any;
    }
  }

  protected createMediaQuery(maxWidth: number, style: CssProps) {}

  protected makeDefaultStyle(
    data: Partial<
      Record<"commonStyle" | Exclude<Variant & string, undefined>, CssProps>
    >
  ) {
    this.styleContext.createStyle({
      className: this.staticClassName,
      defaultStyle: data.commonStyle || {},
    });

    for (const key of (
      Object.keys(data) as Array<
        keyof Variant | "commonStyle" | "defaultCustomCss"
      >
    ).filter((e) => e != "commonStyle" && e != "defaultCustomCss") as Array<
      keyof Variant
    >) {
      this.styleContext.createStyle({
        className: `${this.staticClassName}_${String(key)}`,
        defaultStyle: data[key] || {},
      });
    }
  }

  protected makeStyleFor({
    variants,
    suffix,
    commonStyle,
  }: {
    variants?: Partial<
      Record<"commonStyle" | Exclude<Variant & string, undefined>, CssProps>
    >;
    suffix: suffixesType;
    commonStyle?: Partial<CssProps>;
  }) {
    if (!this.suffixes.includes(suffix)) this.suffixes.push(suffix);
    if (commonStyle) {
      this.styleContext.createStyle({
        className: `${this.staticClassName}_${suffix}`,
        defaultStyle: commonStyle,
      });
    }
    if (!variants) return;
    for (const variant of Object.keys(variants) as Array<
      keyof Variant & string
    >) {
      this.styleContext.createStyle({
        className: `${this.staticClassName}_${suffix}_${variant}`,
        defaultStyle: variants[variant] || {},
      });
    }
  }

  protected makeAnimation(
    name: string,
    content: Record<string, Partial<CSSProperties>>
  ) {
    return `@keyframes ${name} { \n${Object.keys(content)
      .map(
        (key) =>
          `${key} { \n${this.styleContext.styleToString(content[key])}\n }`
      )
      .join("\n")} \n}`;
  }

  public GetSuffixes() {
    return this.suffixes;
  }
  public setProps(
    suffix: suffixesType | Array<suffixesType | undefined> | undefined
  ) {
    if (!suffix) return this;
    else if (Array.isArray(suffix))
      this.currentSuffix.push(...suffix.filter((e) => e != undefined));
    else if (!this.currentSuffix.includes(suffix))
      this.currentSuffix.push(suffix);

    return this;
  }
  public createClassNames() {
    return [
      this.staticClassName,
      `${this.staticClassName}_${this.variant}`,
      this.id,
      ...this.currentSuffix.map(
        (e) =>
          `${this.staticClassName}_${e} ${this.staticClassName}_${e}_${this.variant}`
      ),
    ].join(" ");
  }

  public extractColorToRGB(colorData: string): number[] {
    if (colorData.startsWith("#")) {
      const rgb = this.hexToRgb(colorData);
      if (!rgb) throw new Error(`${colorData} is not a valid Hex color format`);
      return rgb;
    }
    let maybeRGBA = this.extractCssRGB(colorData);
    if (maybeRGBA.length == 3) return maybeRGBA;
    maybeRGBA.pop();
    return maybeRGBA;
  }
  public rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }
  /**
   * @returns [0-255, 0-255, 0-255]
   */
  private hexToRgb(
    hex: string,
    result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  ) {
    return result ? result.map((i) => parseInt(i, 16)).slice(1) : null;
    //returns [23, 14, 45] -> reformat if needed
  }
  /**
   * @returns [0-255, 0-255, 0-255, 0.0-1.0]
   */
  private extractCssRGB(rgbString: string) {
    return rgbString
      .split("(")[1]
      .split(")")[0]
      .split(",")
      .map((e) => (e.includes(".") ? parseFloat(e) : parseInt(e)));
  }

  public colorFromTheme(props: Record<MuiTheme["theme"], string>) {
    return props[this.theme.theme];
  }

  protected makeSx() {
    if (!this.sxProps?.id) throw new Error("sx prop must be used with id prop");
    this.styleContext.removeID(this.id as string);
    this.styleContext.createStyle({
      className: this.id as string,
      defaultStyle: this.sxProps.sx,
    });
  }
  protected alreadyExists() {
    return Boolean(
      this.styleContext.ids.find((e) => e == this.staticClassName)
    );
  }
}

export function MuiStyle() {
  const [data, setData] = useState("");
  const muiStyleClass = useContext(MuiStyleContext);
  muiStyleClass.update = setData;
  return (
    <style
      type="text/css"
      suppressHydrationWarning
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html: data,
      }}
    />
  );
}

export const MuiStyleContext = createContext(new _MuiStyleContext());

export type MuiTheme = {
  primary: {
    light: Exclude<React.CSSProperties["color"], undefined>;
    dark: Exclude<React.CSSProperties["color"], undefined>;
  };
  secondary: {
    light: Exclude<React.CSSProperties["color"], undefined>;
    dark: Exclude<React.CSSProperties["color"], undefined>;
  };
  disabled: {
    light: Exclude<React.CSSProperties["color"], undefined>;
    dark: Exclude<React.CSSProperties["color"], undefined>;
  };
  radio: {
    success: {
      light: Exclude<React.CSSProperties["color"], undefined>;
      dark: Exclude<React.CSSProperties["color"], undefined>;
    };
    error: {
      light: Exclude<React.CSSProperties["color"], undefined>;
      dark: Exclude<React.CSSProperties["color"], undefined>;
    };
  };
  error: {
    light: Exclude<React.CSSProperties["color"], undefined>;
    dark: Exclude<React.CSSProperties["color"], undefined>;
  };
  success: {
    light: Exclude<React.CSSProperties["color"], undefined>;
    dark: Exclude<React.CSSProperties["color"], undefined>;
  };
  theme: "light" | "dark";
};

export const MuiColors = createContext<MuiTheme>({
  primary: {
    dark: "rgb(33, 150, 243)",
    light: "rgb(33, 150, 243)",
  },
  secondary: {
    dark: "rgb(0, 121, 107)",
    light: "rgb(0, 121, 107)",
  },
  disabled: {
    dark: "rgba(255, 255, 255, 0.3)",
    light: "rgba(0, 0, 0, 0.3)",
  },
  radio: {
    success: {
      dark: "rgb(102, 187, 106)",
      light: "rgb(102, 187, 106)",
    },
    error: {
      dark: "rgb(216, 27, 96)",
      light: "rgb(216, 27, 96)",
    },
  },
  error: {
    dark: "#d32f2f",
    light: "#d32f2f",
  },
  success: {
    dark: "rgb(102, 187, 106)",
    light: "rgb(102, 187, 106)",
  },
  theme: "light",
});

export function useStyle() {
  const style = useContext(MuiStyleContext);
  const theme = useContext(MuiColors);

  return {
    styleContext: style,
    theme,
  };
}
