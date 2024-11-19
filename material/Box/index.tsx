import { forwardRef } from "react";
import { useStyle } from "../../style";
import type { MuiProps } from "../../utils/base";
export type BoxProps = {
  variant?: JSX.Element;
  children?: any;
} & MuiProps &
  React.HTMLAttributes<HTMLDivElement>;

const Box = forwardRef<HTMLElement, BoxProps>(
  ({ sx, style, children, variant, ...props }, ref) => {
    const _style = useStyle(sx, style);

    const El = variant || <div />;

    return (
      <El.type style={_style.styleFromSx} {...props} ref={ref}>
        {children}
      </El.type>
    );
  }
);

Box.displayName = "Box";

export default Box;
