"use client";
import { createStyle, styleToString, type CssProps } from "../style";
import MuiBase from "./base";
type SvgModType = {
  sx: {
    svg: CssProps;
    box: CssProps;
  };
  svg: JSX.Element;
};
export function Svg({ sx, svg, ...props }: SvgModType) {
  const Style = createStyle({
    className: "MUI_SVG_Wrapper",
    currentStyle: {
      transform: `scale(${sx.box.scale ? sx.box.scale : 1})`,
      height: "fit-content",
      width: "fit-content",
      ...sx.box,
    },
    defaultStyle: {},
    customCss: `
        .<!ID!> > svg {
          ${styleToString(sx.svg)}
        }
        `,
  });

  return <MuiBase MuiStyle={Style}>{svg}</MuiBase>;
}
