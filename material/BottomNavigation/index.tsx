import MuiBase from "../../utils/base";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import { cloneElement } from "react";
type BottomNavigationProps = {
  children: JSX.Element | JSX.Element[];
  onSelect?: (
    ev: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    key: number
  ) => void;
  selectedKey?: number;
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
        display: "flex",
        "--WebkitBoxPack": "center",
        justifyContent: "center",
        height: "56px",
        backgroundColor: this.colorFromTheme({
          light: "rgb(255,255,255)",
          dark: "rgb(18, 18, 18)",
        }),
        position: "fixed",
        bottom: 0,
        left: 0,
        width: "100%",
      },
    });
  }
}

export default function BottomNavigation({
  children,
  onSelect,
  selectedKey,
  ...props
}: BottomNavigationProps) {
  const _style = useStyle();

  const currentVariant = "default";

  const root = new Root({
    ..._style,
    staticClassName: "MUI_BottomNavigation_Root",
    currentVariant,
  });

  if (!Array.isArray(children)) children = [children];

  let key = 0;

  return (
    <div className={root.createClassNames()} {...props}>
      {children.map((e) => {
        key = key + 1;
        return cloneElement<BottomNavigationElementProps | HTMLButtonElement>(
          e,
          {
            key: `${key}`,
            onClick(ev) {
              if (e.props.onclick) e.props.onclick(ev);
              if (onSelect) onSelect(ev, key - 1);
            },
            selected: selectedKey == key - 1,
          }
        );
      })}
    </div>
  );
}

type BottomNavigationElementProps = {
  Icon?: JSX.Element;
  label?: string;
  selected?: boolean;
} & React.HTMLAttributes<HTMLButtonElement>;

type ElementSuffixType = "selected";

class Button extends MuiBaseStyleUtils<Variant, ElementSuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
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
        border: "0px",
        margin: "0px",
        borderRadius: "0px",
        cursor: "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        appearance: "none",
        textDecoration: "none",
        transition:
          "color 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, padding-top 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        padding: "0px 12px",
        minWidth: "80px",
        maxWidth: "168px",
        color: "rgba(0, 0, 0, 0.6)",
        flexDirection: "column",
        flex: "1 1 0%",
      },
    });
  }
}

class _Icon extends MuiBaseStyleUtils<Variant, ElementSuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeSelected();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        WebkitUserSelect: "none",
        "--MozUserSelect": "none",
        "--MsUserSelect": "none",
        userSelect: "none",
        width: "1em",
        height: "1em",
        display: "inline-block",
        fill: "currentColor",
        "--WebkitFlexShrink": "0",
        "--MsFlexNegative": "0",
        flexShrink: "0",
        "--WebkitTransition": "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        fontSize: "1.5rem",
      },
    });
  }
  private makeSelected() {
    this.makeStyleFor({
      suffix: "selected",
      commonStyle: {
        color: this.colorFromTheme({
          light: this.theme.primary.light,
          dark: this.theme.primary.dark,
        }),
      },
    });
  }
}

class Label extends MuiBaseStyleUtils<Variant, ElementSuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeSelected();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontSize: "0.75rem",
        opacity: "1",
        transition: "font-size 0.2s ease 0.1s, opacity 0.2s ease",
      },
    });
  }
  private makeSelected() {
    this.makeStyleFor({
      suffix: "selected",
      commonStyle: {
        color: this.colorFromTheme({
          light: this.theme.primary.light,
          dark: this.theme.primary.dark,
        }),
      },
    });
  }
}

export function BottomNavigationElement({
  children,
  Icon,
  label,
  selected,
  ...props
}: BottomNavigationElementProps) {
  const _style = useStyle();

  const currentVariant = "default";

  const button = new Button({
    ..._style,
    staticClassName: "MUI_BottomNavigationElement_Button",
    currentVariant,
  });

  const icon = new _Icon({
    ..._style,
    staticClassName: "MUI_BottomNavigationElement_Icon",
    currentVariant,
  }).setProps([selected ? "selected" : undefined]);

  const _label = new Label({
    ..._style,
    staticClassName: "MUI_BottomNavigationElement_Label",
    currentVariant,
  }).setProps([selected ? "selected" : undefined]);

  return (
    <MuiBase
      className={button.createClassNames()}
      element="button"
      ripple
      {...props}
    >
      {Icon &&
        cloneElement(Icon, {
          className: `${icon.createClassNames()} ${Icon.props.className || ""}`,
        })}
      {label && <span className={_label.createClassNames()}>{label}</span>}
    </MuiBase>
  );
}
