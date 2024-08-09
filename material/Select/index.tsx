import {
  MuiBaseStyleUtils,
  useStyle,
  type CssProps,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import TextField, { type TextFieldProps } from "../TextField";
import type { MuiProps } from "../../utils/base";
import { forwardRef, useRef, useState } from "react";
import ArrowDown from "@material-design-icons/svg/filled/arrow_drop_down.svg";
import ListItems, { ListItemElement } from "../ListItems";
type SelectProps = {
  value?: string;
  name: string;
  onSelect?: (name: string) => void;
  defaultValue?: string;
  variant?: TextFieldProps["variant"];
  label?: string;
  children: JSX.Element[] | JSX.Element;
} & MuiProps &
  React.HTMLAttributes<HTMLInputElement>;
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
      },
    });
  }
}

const Select = forwardRef<HTMLInputElement, SelectProps>(
  (
    {
      variant,
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
      ...props
    },
    ref
  ) => {
    if (!Array.isArray(children)) children = [children];
    const _style = useStyle(sx, style);
    const [focused, setFocus] = useState(false);
    const [_value, setValue] = useState("");
    const [displayedValue, setDisplayedValue] = useState("");
    const _ref = useRef(null);
    const currentVariant = variant || "standard";

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
          variant={variant}
          value={displayedValue}
          onBlur={() => {
            setTimeout(() => setFocus(false), 100);
          }}
          onFocus={() => setFocus(true)}
          endIcon={() => <ArrowDown style={dropDownArrowStyle} />}
          sx={textFielSx}
        />
        <ListItems className={dropDown.createClassNames()}>
          {children.map((child, index) => (
            <ListItemElement
              key={index}
              onClick={() => {
                const toCall = onSelect
                  ? () => {
                      onSelect(child.props?.value || index);
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
        <input
          style={inputStyle}
          ref={ref || _ref}
          name={name}
          value={value || _value}
          readOnly
          {...props}
        />
      </div>
    );
  }
);
Select.displayName = "Select";
export default Select;
