import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import type { MuiProps } from "../../utils/base";

type MuiAvatarProps = {
  children?: string;
  src?: string;
  alt?: string;
} & MuiProps &
  React.HTMLAttributes<HTMLDivElement>;

type Variant = "default";
type SuffixType = "";

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        margin: "0",
        position: "relative",
        display: "flex",
        "-WebkitBoxAlign": "center",
        alignItems: "center",
        "-WebkitBoxPack": "center",
        justifyContent: "center",
        flexShrink: "0",
        width: "40px",
        height: "40px",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontSize: "1.25rem",
        lineHeight: "1",
        borderRadius: "50%",
        overflow: "hidden",
        userSelect: "none",
        color: this.colorFromTheme({
          light: "rgb(255,255,255)",
          dark: "rgb(0,0,0)",
        }),
      },
    });
  }
}

class Image extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        width: "100%",
        height: "100%",
        textAlign: "center",
        objectFit: "cover",
        color: "transparent",
        textIndent: "10000px",
      },
    });
  }
}

export default function Avatar({
  sx,
  style,
  className,
  children,
  src,
  alt,
  ...props
}: MuiAvatarProps) {
  const _style = useStyle(sx, style);

  const root = new Root({
    ..._style,
    staticClassName: "MUI_Avatar_Root",
    currentVariant: "default",
  });

  const img = new Image({
    ..._style,
    staticClassName: "MUI_Avatar_Image",
    currentVariant: "default",
  });

  return (
    <div
      className={root.createClassNames() + ` ${className || ""}`}
      style={_style.styleFromSx}
      {...props}
    >
      {(src && (
        <img
          alt={alt || "Avatar"}
          src={src}
          className={img.createClassNames()}
        />
      )) ||
        (children && children)}
    </div>
  );
}
