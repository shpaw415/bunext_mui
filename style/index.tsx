"use client";

import { randomString } from "../utils";

export type CssProps =
  | Partial<React.CSSProperties> &
      Partial<
        | {
            ":hover": Partial<React.CSSProperties>;
            ":active": Partial<React.CSSProperties>;
            ":link": Partial<React.CSSProperties>;
            ":visited": Partial<React.CSSProperties>;
          }
        | { [key: string]: string }
      >;

/** return id has a className and the JSX function to add to the element  */
export function createStyle({
  className,
  currentStyle,
}: {
  className: string;
  currentStyle: CssProps;
}) {
  const id = `${randomString(10, Array.from("1234567890"))}_${className}`;
  const style = MuiStyle(toSx(currentStyle, `.${id}`));

  return {
    id: id,
    MuiStyle: style,
  };
}

function styleToString(style: CssProps | Partial<React.CSSProperties>) {
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
    .replaceAll(";", ";\n");
}

function toSx(cssValues: CssProps, selector: string) {
  const bypass = "abcdefghijklmnopqrstuvwxyz1234567890-";
  const specialKeys = (Object.keys(cssValues) as Array<keyof CssProps>).filter(
    (e) => !bypass.includes((e as any)[0])
  );
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

  const cssSpecialVals = Object.assign(
    {},
    ...specialKeys.map((n) => {
      return { [n]: cssValues[n] };
    })
  ) as unknown as CssProps;

  const specialCssValue = specialKeys.map(
    (e) => `${selector}${e} {\n${styleToString((cssSpecialVals as any)[e])} \n}`
  );

  return [normalCssValue, ...(specialCssValue as string[])].join("\n");
}

function MuiStyle(StyleText: string) {
  return () => (
    <style
      type="text/css"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: StyleText,
      }}
    />
  );
}
