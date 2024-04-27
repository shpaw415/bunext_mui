import { type CssProps } from "../style";

export type MuiElementProps = {
  variant?: string;
  sx?: Partial<CssProps>;
  children?: string | number | JSX.Element;
};
