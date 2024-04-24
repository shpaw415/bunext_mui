import { type CssProps } from "../style";

export type MuiElementProps = {
    variant?: string;
    sx?: CssProps;
    children?: string | number | JSX.Element;
};