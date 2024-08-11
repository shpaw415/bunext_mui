import { useStyle } from "../../style";
import type { MuiProps } from "../../utils/base";
type BoxProps = {
  variant?: JSX.Element;
  children?: any;
} & MuiProps &
  React.HTMLAttributes<HTMLDivElement>;
type Variant = "default";
type SuffixType = "";

export default function Box({
  sx,
  style,
  children,
  variant,
  ...props
}: BoxProps) {
  const _style = useStyle(sx, style);

  const El = variant || <div />;

  return (
    <El.type style={_style.styleFromSx} {...props}>
      {children}
    </El.type>
  );
}
