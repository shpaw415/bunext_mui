import {
  MuiBaseStyleUtils,
  useStyle,
  useTheme,
  type CssProps,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import TextField, { type TextFieldProps } from "../TextField";
import type { MuiProps } from "../../utils/base";
import { forwardRef, useMemo, useRef, useState } from "react";
import ArrowDown from "@material-design-icons/svg/filled/arrow_drop_down.svg";
import ListItems, { ListItemElement } from "../ListItems";

export type SelectProps = {
  value?: string;
  name: string;
  onSelect?: (name: string) => void;
  defaultValue?: string;
  children: JSX.Element[] | JSX.Element;
} & MuiProps &
  Omit<TextFieldProps, "children" | "value">;
type Variant = SelectProps["variant"];
type SuffixType = "opened";

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        position: "relative",
      },
    });
  }
}

class DropDown extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeOpen();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        overflow: "hidden",
        opacity: 0,
        transform: "scale(1, 0)",
        transition: "ease-in-out 150ms",
        textOverflow: "ellipsis",
        position: "absolute",
        minWidth: "100%",
        width: "100%",
        top: 0,
        left: 0,
        zIndex: 100,
      },
    });
  }
  private makeOpen() {
    this.makeStyleFor({
      suffix: "opened",
      commonStyle: {
        transform: "scale(1, 1)",
        opacity: 1,
        top: 55,
        boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
        borderRadius: "10px",
      },
    });
  }
}

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      sx,
      style,
      className,
      value,
      defaultValue,
      children,
      onSelect,
      label,
      name,
      onChange,
      required,
      ...props
    },
    ref
  ) => {
    if (!Array.isArray(children)) children = [children];
    const _style = useStyle(sx, style);
    const [focused, setFocus] = useState(false);
    const DefaultValueMemo = useMemo(() => {
      if (defaultValue)
        return children.find((e) => e.props?.value == defaultValue)?.props
          .children as string;
      return undefined;
    }, []);
    const [_value, setValue] = useState(defaultValue || "");
    const [displayedValue, setDisplayedValue] = useState<string | undefined>(
      DefaultValueMemo
    );
    const theme = useTheme();
    const _ref = useRef(null);
    const currentVariant = props.variant || "standard";

    const root = new Root({
      ..._style,
      staticClassName: "MUI_Select_Root",
      currentVariant,
    });

    const dropDown = new DropDown({
      ..._style,
      staticClassName: "MUI_Select_DropDown_Root",
      currentVariant,
    }).setProps([focused ? "opened" : undefined]);

    const inputStyle: CssProps = {
      visibility: "hidden",
    };
    const dropDownArrowStyle: CssProps = {
      rotate: focused ? "180deg" : undefined,
      fill: "rgba(50, 50, 50, 0.7)",
    };

    const textFielSx: CssProps = {
      caretColor: "transparent",
      width: "100%",
      cursor: "pointer",
    };

    if (value && _value != value) {
      setValue(value);
      setDisplayedValue(() => {
        for (const child of children) {
          if (child.props?.value != value) continue;
          return child.props?.children;
        }
      });
    }
    return (
      <div
        style={_style.styleFromSx}
        className={`${className || ""} ` + root.createClassNames()}
      >
        <TextField
          label={label}
          value={displayedValue || DefaultValueMemo}
          onBlur={() => {
            setTimeout(() => setFocus(false), 100);
          }}
          onFocus={() => setFocus(true)}
          endIcon={() => <ArrowDown style={dropDownArrowStyle} />}
          sx={textFielSx}
          {...props}
        />
        <input
          style={inputStyle}
          ref={ref || _ref}
          name={name}
          value={value || _value}
          readOnly
        />
        <div className={dropDown.createClassNames()}>
          <ListItems
            sx={{
              background: theme.background[theme.theme],
            }}
          >
            {children.map((child, index) => (
              <ListItemElement
                e-value={child.props.value}
                sx={{
                  color: "black",
                }}
                key={index}
                onMouseDown={() => {
                  const toCall = onSelect
                    ? () => {
                        onSelect(child.props?.value || index);
                        if (!value) {
                          setDisplayedValue(child.props?.children);
                          setValue(child.props?.value);
                        }
                      }
                    : () => {
                        setDisplayedValue(child.props?.children);
                        setValue(child.props?.value);
                      };

                  toCall();
                  onChange && onChange((ref as any)?.current || _ref.current);
                  setFocus(false);
                }}
              >
                {child?.props?.children || ""}
              </ListItemElement>
            ))}
          </ListItems>
        </div>
      </div>
    );
  }
);
Select.displayName = "Select";
export default Select;
