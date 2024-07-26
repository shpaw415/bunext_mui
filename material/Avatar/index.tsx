import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";

type MuiAvatarProps = {
  children?: string;
  src?: string;
  alt?: string;
  style?: React.CSSProperties;
};

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
        WebkitBoxAlign: "center",
        alignItems: "center",
        WebkitBoxPack: "center",
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

export default function Avatar(props: MuiAvatarProps) {
  const _style = useStyle();

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
    <div className={root.createClassNames()} style={props.style || {}}>
      {(props.src && (
        <img
          alt={props.alt || "Avatar"}
          src={props.src}
          className={img.createClassNames()}
        />
      )) ||
        (props.children && props.children)}
    </div>
  );
}
