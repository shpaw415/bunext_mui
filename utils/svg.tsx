"use client";
import { useContext } from "react";
import { MuiStyleContext, type CssProps } from "../style";
import MuiBase from "./base";
type SvgModType = {
  sx: {
    svg: CssProps;
    box: CssProps;
  };
  svg: JSX.Element;
};
export function Svg({ sx, svg, ...props }: SvgModType) {
  const styleContext = useContext(MuiStyleContext);
  const Style = styleContext.createStyle({
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
          ${styleContext.styleToString(sx.svg)}
        }
        `,
  });

  return <MuiBase MuiStyle={Style}>{svg}</MuiBase>;
}
