import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import type { MuiProps } from "../../utils/base";

type MuiSkeletonProps = {
  animation?: "pulse" | "wave" | "none";
  variant?: "text" | "circular" | "rectangular" | "rounded";
} & MuiProps &
  React.HTMLAttributes<HTMLSpanElement>;

type Variant = MuiSkeletonProps["variant"];
type SuffixType = MuiSkeletonProps["animation"] | "autoSize";

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeAnimations();
    this.makeAutoSize();
  }
  private makeDefault() {
    const animations = {
      pulse: this.makeAnimation("MUI-skeleton-pulse", {
        "0%": {
          opacity: 1,
        },
        "50%": {
          opacity: 0.4,
        },
        "100%": {
          opacity: 1,
        },
      }),
      wave: this.makeAnimation("MUI-Skeleton-wave", {
        "0%": {
          transform: "translateX(-100%)",
        },
        "50%": {
          transform: "translateX(100%)",
        },
        "100%": {
          transform: "translateX(100%)",
        },
      }),
    };

    this.makeDefaultStyle({
      commonStyle: {
        display: "block",
        backgroundColor: "rgba(0, 0, 0, 0.11)",
        ":customStyle": Object.values(animations).join("\n"),
      },
      text: {
        height: "auto",
        marginTop: "0px",
        marginBottom: "0px",
        transformOrigin: "0px 55%",
        transform: "scale(1, 0.6)",
        borderRadius: "4px / 6.7px",

        fontSize: "1rem",
      },
      circular: {
        height: "1.2em",
        borderRadius: "50%",
      },
      rectangular: {
        height: "1.2em",
      },
      rounded: {
        height: "1.2em",
        borderRadius: "4px",
      },
    });
  }
  private makeAnimations() {
    this.makeStyleFor({
      suffix: "pulse",
      commonStyle: {
        animation:
          "2s ease-in-out 0.5s infinite normal none running MUI-skeleton-pulse",
      },
    });
    this.makeStyleFor({
      suffix: "wave",
      commonStyle: {
        overflow: "hidden",
        ":after": {
          animation:
            "2s linear 0.5s infinite normal none running MUI-Skeleton-wave",
          background:
            "linear-gradient(90deg, transparent, rgba(0, 0, 0, 0.04), transparent)",
          content: '""',
          position: "absolute",
          transform: "translateX(-100%)",
          inset: "0px",
        },
        ":before": {
          content: '" "',
        },
      },
    });
  }
  private makeAutoSize() {
    this.makeStyleFor({
      suffix: "autoSize",
      commonStyle: {
        height: "100%",
        width: "100%",
      },
    });
  }
}

export default function Skeleton({
  animation,
  variant,
  sx,
  style,
  className,
  ...props
}: MuiSkeletonProps) {
  const _style = useStyle(sx, style);
  const root = new Root({
    ..._style,
    staticClassName: "MUI_Skeleton_Root",
    currentVariant: variant || "text",
  }).setProps([
    animation ? animation : "pulse",
    _style.styleFromSx.height || _style.styleFromSx.width
      ? undefined
      : "autoSize",
  ]);
  return (
    <span
      className={root.createClassNames() + ` ${className || ""}`}
      style={_style.styleFromSx}
      {...props}
    />
  );
}
