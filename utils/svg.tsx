"use client";
import { createStyle, styleToString } from "../style";
import MuiBase from "./base";
type SvgModType = {
  sx: {
    svg: React.CSSProperties;
    box: React.CSSProperties;
  };
  svg: JSX.Element;
};
export function Svg({ sx, svg, ...props }: SvgModType) {
  const Style = createStyle({
    className: "MUI_SVG",
    currentStyle: {
      ...sx.box,
      transform: `scale(${sx.box.scale ? sx.box.scale : 1})`,
      height: "fit-content",
      width: "fit-content",
    },
    customCss: `
        .<!ID!> > svg {
          ${styleToString(sx.svg)}
        }
        `,
  });

  return <MuiBase MuiStyle={Style}>{svg}</MuiBase>;
}
