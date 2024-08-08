import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import type { MuiProps } from "../../utils/base";

type ProgressProps = {
  variant?: "determinate" | "default";
  color?: "success" | "secondary" | "primary" | "error";
  size?: number;
} & MuiProps &
  React.HTMLAttributes<HTMLDivElement>;
type Variant = ProgressProps["variant"];
type SuffixType = ProgressProps["color"];

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeColors();
  }
  private makeDefault() {
    const animation = this.makeAnimation("MUI-Progress-Wheel", {
      "0%": {
        transform: "rotate(0deg)",
      },
      "100%": {
        transform: "rotate(360deg)",
      },
    });
    this.makeDefaultStyle({
      commonStyle: {
        ":customStyle": animation,
        display: "inline-block",
        animation:
          "1.4s linear 0s infinite normal none running MUI-Progress-Wheel",
        width: "40px",
        height: "40px",
      },
    });
  }
  private makeColors() {
    this.makeStyleFor({
      suffix: "primary",
      commonStyle: {
        color: this.colorFromTheme({
          light: this.theme.primary.light,
          dark: this.theme.primary.dark,
        }),
      },
    });
    this.makeStyleFor({
      suffix: "secondary",
      commonStyle: {
        color: this.colorFromTheme({
          light: this.theme.secondary.light,
          dark: this.theme.secondary.dark,
        }),
      },
    });
    this.makeStyleFor({
      suffix: "error",
      commonStyle: {
        color: this.colorFromTheme({
          light: this.theme.error.light,
          dark: this.theme.error.dark,
        }),
      },
    });
    this.makeStyleFor({
      suffix: "success",
      commonStyle: {
        color: this.colorFromTheme({
          light: this.theme.success.light,
          dark: this.theme.success.dark,
        }),
      },
    });
  }
}

class Circle extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    const animation = this.makeAnimation("MUI_Progress_Circle", {
      "0%": {
        strokeDasharray: "1px, 200px",
        strokeDashoffset: "0",
      },
      "50%": {
        strokeDasharray: "100px, 200px",
        strokeDashoffset: "-15px",
      },
      "100%": {
        strokeDasharray: "100px, 200px",
        strokeDashoffset: "-125px",
      },
    });
    this.makeDefaultStyle({
      commonStyle: {
        ":customStyle": animation,
        stroke: "currentcolor",
        strokeDasharray: "80px, 200px",
        strokeDashoffset: "0",
        animation:
          "1.4s ease-in-out 0s infinite normal none running MUI_Progress_Circle",
      },
    });
  }
}

export default function Progress({
  style,
  sx,
  color,
  variant,
  size,
  ...props
}: ProgressProps) {
  const _style = useStyle(sx, style);

  const currentVariant = variant || "default";

  const root = new Root({
    ..._style,
    staticClassName: "MUI_Progress_Root",
    currentVariant,
  }).setProps([color || "primary"]);

  const circle = new Circle({
    ..._style,
    staticClassName: "MUI_Progress_Cicle",
    currentVariant,
  });

  const SizeStyle = size
    ? {
        width: `${size}px`,
        height: `${size}px`,
      }
    : {};

  return (
    <div
      style={{
        display: "flex",
        ..._style.styleFromSx,
      }}
      {...props}
    >
      <span className={root.createClassNames()} style={{ ...SizeStyle }}>
        <svg viewBox="22 22 44 44" style={{ display: "block" }}>
          <circle
            cx="44"
            cy="44"
            r="20.2"
            fill="none"
            strokeWidth="3.6"
            className={circle.createClassNames()}
          />
        </svg>
      </span>
    </div>
  );
}
