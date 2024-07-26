import MuiBase from "../../utils/base";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import { cloneElement, type HTMLAttributes } from "react";

type Variant = "default";
type SuffixType =
  | "selected"
  | "row"
  | "column"
  | "disabled"
  | ToggleButtonProps["color"];

type ToggleButtonProps = {
  children: JSX.Element | string;
  selected?: boolean;
  disabled?: boolean;
  color?: "primary" | "secondary";
} & HTMLAttributes<HTMLButtonElement>;

class Button extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeSelected();
    this.makeColors();
    this.makeDisabled();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        ":hover": {
          backgroundColor: this.colorFromTheme({
            light: "rgba(0, 0, 0, 0.12)",
            dark: "backgroundColor: 'rgba(255, 255, 255, 0.08)",
          }),
          textDecoration: "none",
        },
        borderTopRightRadius: "0",
        borderBottomRightRadius: "0",
        display: "inline-flex",
        WebkitBoxAlign: "center",
        alignItems: "center",
        WebkitBoxPack: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
        WebkitTapHighlightColor: "transparent",
        backgroundColor: "transparent",
        outline: "0px",
        margin: "0px",
        cursor: "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        appearance: "none",
        textDecoration: "none",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: "500",
        fontSize: "0.875rem",
        lineHeight: "1.75",
        letterSpacing: "0.02857em",
        textTransform: "uppercase",
        padding: "11px",
        border: `1px solid ${this.colorFromTheme({
          light: "rgba(0,0,0,0.12)",
          dark: "rgba(255, 255, 255, 0.12)",
        })}`,
        color: this.colorFromTheme({
          dark: "rgb(255, 255, 255)",
          light: "rgba(0, 0, 0, 0.54)",
        }),
        ":first-child": {
          borderRadius: "4px 0 0 4px",
        },
        ":last-child": {
          borderRadius: "0 4px 4px 0",
        },
      },
    });
  }
  private makeSelected() {
    this.makeStyleFor({
      suffix: "selected",
      commonStyle: {
        backgroundColor: this.colorFromTheme({
          light: "rgba(0, 0, 0, 0.08)",
          dark: "rgba(255, 255, 255, 0.16)",
        }),
      },
    });
  }
  private makeDisabled() {
    this.makeStyleFor({
      suffix: "disabled",
      commonStyle: {
        borderLeft: "1px solid transparent",
        color: this.colorFromTheme({
          dark: "rgba(255, 255, 255, 0.3)",
          light: "rgba(0, 0, 0, 0.26)",
        }),
        border: "1px solid",
        borderColor: this.colorFromTheme({
          dark: "rgba(255, 255, 255, 0.12)",
          light: "rgba(0, 0, 0, 0.12)",
        }),
        pointerEvents: "none",
        cursor: "default",
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
        backgroundColor: this.colorFromTheme({
          light: `rgba(${this.extractColorToRGB(
            this.theme.primary.light
          )}, 0.08)`,
          dark: `rgba(${this.extractColorToRGB(
            this.theme.primary.dark
          )}, 0.08)`,
        }),
        ":hover": {
          backgroundColor: this.colorFromTheme({
            light: `rgba(${this.extractColorToRGB(
              this.theme.primary.light
            )}, 0.12)`,
            dark: `rgba(${this.extractColorToRGB(
              this.theme.primary.dark
            )}, 0.12)`,
          }),
        },
      },
    });
    this.makeStyleFor({
      suffix: "secondary",
      commonStyle: {
        color: this.colorFromTheme({
          light: this.theme.secondary.light,
          dark: this.theme.secondary.dark,
        }),
        backgroundColor: this.colorFromTheme({
          light: `rgba(${this.extractColorToRGB(
            this.theme.secondary.light
          )}, 0.08)`,
          dark: `rgba(${this.extractColorToRGB(
            this.theme.secondary.dark
          )}, 0.08)`,
        }),
        ":hover": {
          backgroundColor: this.colorFromTheme({
            light: `rgba(${this.extractColorToRGB(
              this.theme.secondary.light
            )}, 0.12)`,
            dark: `rgba(${this.extractColorToRGB(
              this.theme.secondary.dark
            )}, 0.12)`,
          }),
        },
      },
    });
  }
}
class SVG extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        fill: "currentcolor",
      },
    });
  }
}

export default function ToggleButton({
  children,
  selected,
  color,
  ...props
}: ToggleButtonProps) {
  const _style = useStyle();

  const button = new Button({
    ..._style,
    currentVariant: "default",
    staticClassName: "MUI_Toggle_Button",
  }).setProps([
    selected ? "selected" : undefined,
    props.disabled ? "disabled" : undefined,
    selected && !props.disabled ? color : undefined,
  ]);

  const svg = new SVG({
    ..._style,
    currentVariant: "default",
    staticClassName: "MUI_Toggle_Button_Icon",
  });

  return (
    <MuiBase
      element="button"
      ripple
      className={button.createClassNames()}
      {...props}
    >
      {typeof children == "string"
        ? children
        : cloneElement<HTMLDivElement>(children, {
            className: `${
              children.props.className || ""
            } ${svg.createClassNames()}`,
          })}
    </MuiBase>
  );
}

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeColumn();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "inline-flex",
        borderRadius: "4px",
        flexDirection: "row",
      },
    });
  }
  private makeColumn() {
    this.makeStyleFor({
      suffix: "column",
      commonStyle: {
        flexDirection: "column",
      },
    });
  }
}

type ToggleButtonGroupProps = {
  children: JSX.Element[];
  direction?: "row" | "column";
  onSelect?: (selected: number) => void;
  /**
   * zero based index array of selected element
   */
  selected?: number[];
  color?: ToggleButtonProps["color"];
} & HTMLAttributes<HTMLDivElement>;

export function ToggleButtonGroup({
  children,
  direction,
  onSelect,
  selected,
  className,
  color,
  ...props
}: ToggleButtonGroupProps) {
  const _style = useStyle();

  const root = new Root({
    ..._style,
    staticClassName: "MUI_Toggle_Button_Group",
    currentVariant: "default",
  }).setProps([direction]);

  return (
    <div
      role="group"
      className={root.createClassNames() + ` ${className || ""}`}
      {...props}
    >
      {children.flatMap((child, index) => {
        return cloneElement<ToggleButtonProps>(child, {
          key: index,
          onClick: () => {
            if (!onSelect) return;
            onSelect(index);
          },
          selected: selected?.includes(index),
          color,
        });
      })}
    </div>
  );
}
