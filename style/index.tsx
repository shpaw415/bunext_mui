"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type CSSProperties,
} from "react";
import { RippleCss } from "../material/style/ripple";
import MuiCss from "../style/style.json";

export type MediaQueryType = {
  sm: number;
  md: number;
  lg: number;
};

export type SxProps = Partial<React.CSSProperties> &
  Partial<Record<keyof MediaQueryType, Partial<React.CSSProperties>>>;

export const MediaQueryValues: MediaQueryType = {
  sm: 425,
  md: 600,
  lg: 1200,
} as const;

export type CssProps =
  | (Partial<React.CSSProperties> &
      Partial<
        | {
            ":hover":
              | Partial<React.CSSProperties>
              | Record<string, string | number>;
            ":active": Partial<React.CSSProperties & Record<string, string>>;
            ":link": Partial<React.CSSProperties & Record<string, string>>;
            ":visited": Partial<React.CSSProperties & Record<string, string>>;
            ":not": Partial<React.CSSProperties & Record<string, string>>;
            ":before": Partial<React.CSSProperties & Record<string, string>>;
            ":after": Partial<React.CSSProperties & Record<string, string>>;
            ":focus": Partial<React.CSSProperties & Record<string, string>>;
            /**
             * <!ID!> Is modified with the staticClassName
             */
            ":customStyle": string;
          }
        | { [key: string]: Partial<React.CSSProperties> }
      >)
  | { [key: string]: string };

export type MuiStyleControl = {
  className: string;
  defaultStyle: CssProps;
  customStyle?: string;
  alreadyCreated: boolean;
};

export class _MuiStyleContext {
  ids: string[] = [];
  content: Record<string, string> = {};
  cssVariables: { id: string; values: Record<MuiTheme["theme"], string> }[] =
    [];
  update?: React.Dispatch<React.SetStateAction<string>>;
  updateVariables?: React.Dispatch<
    React.SetStateAction<
      { id: string; values: Record<MuiTheme["theme"], string> }[]
    >
  >;

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

  private _update() {
    if (!this.update) return;
    const self = this;
    setTimeout(() => {
      if (!self.update) return;
      self.update(Object.values(this.content).join("\n"));
    }, 10);
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
};

export class MuiBaseStyleUtils<Variant, suffixesType> {
  protected variant: Exclude<Variant, undefined>;
  protected theme: MuiTheme;
  protected styleContext: _MuiStyleContext;
  public staticClassName: string;
  private VariableCount = 0;
  protected suffixes: Array<suffixesType> = [];
  protected currentSuffix: Array<suffixesType> = [];
  private id?: string;

  constructor({
    theme,
    styleContext,
    currentVariant,
    staticClassName,
  }: MuiBaseStyleUtilsProps<Variant>) {
    this.variant = currentVariant;
    this.theme = theme;
    this.styleContext = styleContext;
    this.staticClassName = staticClassName;
  }

  protected makeDefaultStyle(
    data: Partial<
      Record<"commonStyle" | Exclude<Variant & string, undefined>, CssProps>
    >
  ) {
    if (typeof window != "undefined") return;
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
    if (typeof window != "undefined") return;
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
    if (typeof window != "undefined") return "";
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

  private _updateVariables() {
    const self = this;
    setTimeout(() => {
      self.styleContext.updateVariables &&
        self.styleContext.updateVariables(this.styleContext.cssVariables);
    }, 10);
  }

  public colorFromTheme(props: Record<MuiTheme["theme"], string>) {
    const variable = `--${this.staticClassName}-${this.VariableCount}`;
    this.VariableCount++;
    this.styleContext.cssVariables.push({
      id: variable,
      values: props,
    });
    this._updateVariables();
    return `var(${variable})`;
  }

  protected alreadyExists() {
    return Boolean(
      this.styleContext.ids.find((e) => e == this.staticClassName)
    );
  }

  static sxToStyle(
    mediaQuerySize: keyof MediaQueryType,
    sxProps?: SxProps
  ): Partial<React.CSSProperties> {
    if (!sxProps) return {};
    const SxKeys = Object.keys(MediaQueryValues) as Array<keyof MediaQueryType>;
    const StyleKeys = Object.keys(sxProps) as Array<keyof SxProps>;
    return Object.assign(
      {},
      ...StyleKeys.map((key) => {
        if (key == mediaQuerySize) return sxProps[key];
        else if (SxKeys.includes(key as any)) return undefined;
        else if (
          typeof sxProps[mediaQuerySize] != "undefined" &&
          typeof (sxProps[mediaQuerySize] as any)[key] != "undefined"
        ) {
          return { [key]: (sxProps[mediaQuerySize] as any)[key] };
        } else return { [key]: sxProps[key] };
      }).filter((e) => e != undefined)
    ) as Partial<React.CSSProperties>;
  }
}

const StyleContent = Object.values(MuiCss).join("").replaceAll("\n", "");

export function MuiStyle() {
  const theme = useTheme();
  return (
    <>
      <MuiStyleVariable />
      <style
        type="text/css"
        id="MUI_Base_Style"
        dangerouslySetInnerHTML={{
          __html:
            StyleContent +
            `html,body {${new _MuiStyleContext().styleToString({
              padding: 0,
              margin: 0,
              backgroundColor: theme.background[theme.theme],
            })}}`,
        }}
      />
    </>
  );
}

export function LegacyMuiStyle() {
  const [value, setValue] = useState("");
  const styleControl = useContext(MuiStyleContext);

  useEffect(() => {
    styleControl.update = setValue;
  }, []);

  return (
    <style
      type="text/css"
      suppressHydrationWarning
      suppressContentEditableWarning
      dangerouslySetInnerHTML={{
        __html: value,
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
  background: {
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
  background: {
    light: "white",
    dark: "#0e1217",
  },
  theme: "light",
});

class SxPropsController {
  private Elements: Array<
    React.Dispatch<React.SetStateAction<keyof MediaQueryType>>
  > = [];
  public currentMediaQuery: keyof MediaQueryType = "md";
  constructor() {
    if (typeof window == "undefined") return;
    this.currentMediaQuery = this.getCurrentMediaQuery();
    const self = this;
    window.addEventListener("resize", () => {
      const newSize = this.getCurrentMediaQuery();
      if (this.currentMediaQuery == newSize) return;
      this.currentMediaQuery = newSize;
      self.update(newSize);
    });
  }
  private getCurrentMediaQuery(): keyof MediaQueryType {
    for (const query of Object.keys(MediaQueryValues).reverse() as Array<
      keyof MediaQueryType
    >) {
      if (window.innerWidth >= MediaQueryValues[query]) return query;
    }
    return "md";
  }
  private update(newValue: keyof MediaQueryType) {
    for (const callback of this.Elements) {
      callback(newValue);
    }
  }
  add(callback: React.Dispatch<React.SetStateAction<keyof MediaQueryType>>) {
    this.Elements.push(callback);
  }
}

export const SxPropsContext = createContext<SxPropsController>(
  new SxPropsController()
);

function MuiStyleVariable() {
  const styleContext = useContext(MuiStyleContext);
  const theme = useContext(MuiColors);
  const [value, setValue] = useState<
    { id: string; values: Record<MuiTheme["theme"], string> }[]
  >([]);
  styleContext.updateVariables = setValue;

  const computedValue = value.map(
    (val) => `${val.id}: ${val.values[theme.theme]};`
  );

  return (
    <style
      type="text/css"
      dangerouslySetInnerHTML={{
        __html: `:root {${computedValue.join("\n")}}`,
      }}
    />
  );
}

export function useStyle(sxProps?: SxProps, style?: CssProps) {
  const _style = useContext(MuiStyleContext);
  const theme = useContext(MuiColors);
  const sx = useContext(SxPropsContext);
  const [currentSx, setSx] = useState<keyof MediaQueryType>(
    sx.currentMediaQuery
  );
  const memorizedStyleFromSx = useMemo(
    () =>
      MuiBaseStyleUtils.sxToStyle(currentSx, {
        ...(style || {}),
        ...(sxProps || {}),
      }),
    [currentSx, sxProps, style]
  );
  useEffect(() => {
    sx.add(setSx);
  }, []);

  useEffect(() => {
    let baseStyle = document.querySelector("#MUI_Base_Style");
    if (baseStyle) return;

    let head = document.querySelector("head") as HTMLHeadElement;

    if (!head) {
      document
        .querySelector("html")
        ?.insertBefore(
          document.querySelector("body") as Node,
          document.createElement("head")
        );
      head = document.querySelector("head") as HTMLHeadElement;
    }
    baseStyle = document.createElement("style");
    baseStyle.setAttribute("type", "text/css");
    baseStyle.setAttribute("id", "MUI_Base_Style");
    baseStyle.innerHTML = StyleContent;
    head.appendChild(baseStyle);
  });

  return {
    styleContext: _style,
    theme,
    styleFromSx: memorizedStyleFromSx,
  };
}
/*
export function useTheme() {
  const styleContext = useContext(MuiStyleContext);

  return {
    update: 
  }
}
*/
export function ThemeProvider({
  children,
  theme,
}: {
  children: any;
  theme: MuiTheme;
}) {
  return <MuiColors.Provider value={theme}>{children}</MuiColors.Provider>;
}

export function useTheme() {
  const colorContext = useContext(MuiColors);
  return colorContext;
}

export function SystemTheme(): "dark" | "light" {
  if (
    typeof window == "undefined" ||
    (window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches)
  ) {
    return "dark";
  }
  return "light";
}
/**
 * will update if the system theme updates
 * @returns the current system theme
 */
export function useSystemTheme() {
  const [current, set] = useState(SystemTheme());

  useEffect(() => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        set(event.matches ? "dark" : "light");
      });
  }, []);

  return current;
}
