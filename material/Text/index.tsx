"use client";
import type { MuiElementProps } from "../common";
import { createStyle } from "../../style";
import MuiBase from "../../utils/base";

type MuiText = {} & MuiElementProps;

export default function Text({ children, sx }: MuiText) {
  const Style = createStyle({
    className: "MUI_Text",
    defaultStyle: {},
    currentStyle: sx,
    customCss: `
    .<!ID!> > * {
    margin: 0px;
    font-family: Roboto, Helvetica, Arial, sans-serif;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.5;
    letter-spacing: 0.00938em;
    }
    `,
  });

  return <MuiBase MuiStyle={Style}>{children}</MuiBase>;
}
