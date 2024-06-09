"use client";

export type MuiElementProps = {
  variant?: string;
  sx?: Partial<CssProps>;
  children?: React.ReactNode;
};

export const MuiClass = {
  Button: "MUI_Button",
  IconButton: "MUI_IconButton",
  ButtonGroup: "MUI_ButtonGroup",
  CheckBox: "MUI_CheckBox",
};

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
