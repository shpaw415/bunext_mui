"use client";

import { type CssProps } from "../style";

export type MuiElementProps = {
  variant?: string;
  sx?: Partial<CssProps>;
  children?: string | number | JSX.Element | JSX.Element[];
};

export const MuiClass = {
  Button: "MUI_Button",
  IconButton: "MUI_IconButton",
  ButtonGroup: "MUI_ButtonGroup",
  CheckBox: "MUI_CheckBox",
};
