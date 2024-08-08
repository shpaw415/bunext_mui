"use client";

import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
  type MuiTheme,
} from "../../style";
import {
  cloneElement,
  forwardRef,
  useCallback,
  useEffect,
  useState,
  type ReactElement,
} from "react";
import type { MuiProps } from "../../utils/base";

export type TextFieldProps = MuiProps & {
  variant?: "outlined" | "filled" | "standard";
  startIcon?: () => JSX.Element;
  endIcon?: () => JSX.Element;
  label?: string;
  color?: "error" | "success";
  value?: string;
  required?: boolean;
  disabled?: boolean;
  type?: "text" | "password" | "number" | "search" | "select";
  defaultValue?: string | number;
  helpText?: string;
  readOnly?: boolean;
  multiline?:
    | boolean
    | {
        minRows?: number;
        maxRows?: number;
      };
  children?: ReactElement<HTMLSelectElement>;
} & React.InputHTMLAttributes<HTMLInputElement>;

const commonColors = {
  light: "50, 50, 50",
  dark: "255, 255, 255",
};

function makeColor(theme: MuiTheme) {
  switch (theme.theme) {
    case "dark":
      return commonColors.dark;
    case "light":
      return commonColors.light;
  }
}

type Variants = TextFieldProps["variant"];
type SuffixTypes =
  | "disabled"
  | "color_error"
  | "color_success"
  | "focus"
  | "hasValue"
  | "hasStartIcon";

class TextFieldStyleManager extends MuiBaseStyleUtils<Variants, SuffixTypes> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "inline-flex",
        verticalAlign: "top",
        border: "0px",
        margin: "0px",
        flexDirection: "column",
        position: "relative",
        minWidth: "0px",
        padding: "0px",
      },
      outlined: {
        backgroundColor: "inherit",
      },
      filled: {
        "-WebkitFlexDirection": "column",
        "-msFlexDirection": "column",
      },
      standard: {
        "-WebkitFlexDirection": "column",
        "-msFlexDirection": "column",
      },
    });
  }
}
class LabelTextFieldStyleManager extends MuiBaseStyleUtils<
  Variants,
  SuffixTypes
> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeHasValue();
    this.makeFocus();
    this.makeColors();
    this.makeStartIcon();
  }

  private makeDefault() {
    const currentColor = makeColor(this.theme);

    this.makeDefaultStyle({
      commonStyle: {
        color: `rgba(${currentColor}, 0.7)`,
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: "400",
        fontSize: "1rem",
        letterSpacing: "0.00938em",
        transition:
          "color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms",
        overflow: "hidden",
        textOverflow: "ellipsis",
        display: "block",
        lineHeight: "1.4375em",
        padding: "0px",
        transformOrigin: "left top",
        whiteSpace: "nowrap",
      },
      outlined: {
        maxWidth: "calc(100% - 24px)",
        position: "absolute",
        left: "0px",
        top: "0px",
        transform: "translate(14px, 16px) scale(1)",

        zIndex: 2,
        pointerEvents: "none",
      },
      filled: {
        maxWidth: "calc(100% - 24px)",
        position: "absolute",
        left: "0px",
        top: "0px",
        transform: "translate(12px, 16px) scale(1)",
        zIndex: "1",
        pointerEvents: "none",
      },
      standard: {
        maxWidth: "100%",
        transform: "translate(0px, 30px) scale(1)",
      },
    });
  }
  private makeFocus() {
    this.makeStyleFor({
      suffix: "focus",
      variants: {
        standard: {
          color: this.theme.primary[this.theme.theme],
          transform: "translate(0px, 10px) scale(0.75)",
        },
        filled: {
          transform: "translate(12px, 2px) scale(0.9)",
          color: this.theme.primary[this.theme.theme],
        },
        outlined: {
          color: this.theme.primary[this.theme.theme],
          transform: "translate(14px, -9px) scale(0.75)",
          maxWidth: "calc(133% - 32px)",
          pointerEvents: "auto",
          userSelect: "none",
          padding: "0px",
        },
      },
    });
  }
  private makeHasValue() {
    this.makeStyleFor({
      suffix: "hasValue",
      variants: {
        standard: {
          transform: "translate(0px, 10px) scale(0.75)",
        },
        filled: {
          transform: "translate(12px, 7px) scale(0.75)",
        },
        outlined: {
          transform: "translate(14px, -9px) scale(0.75)",
          maxWidth: "calc(133% - 32px)",
          pointerEvents: "auto",
          userSelect: "none",
          padding: "0px",
        },
      },
    });
  }
  private makeColors() {
    this.makeStyleFor({
      suffix: "color_success",
      commonStyle: {
        color: this.theme.success[this.theme.theme],
      },
      variants: {
        standard: {},
        filled: {},
        outlined: {},
      },
    });
    this.makeStyleFor({
      suffix: "color_error",
      commonStyle: {
        color: this.theme.error[this.theme.theme],
      },
      variants: {
        standard: {},
        filled: {},
        outlined: {},
      },
    });
  }
  private makeStartIcon() {
    this.makeStyleFor({
      suffix: "hasStartIcon",
      variants: {
        standard: {
          transform: "translate(20px, 30px) scale(1)",
        },
        outlined: {
          transform: "translate(25px, 16px) scale(1)",
        },
        filled: {},
      },
    });
  }
}

class InputTextFieldStyleManager extends MuiBaseStyleUtils<
  Variants,
  SuffixTypes
> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;

    this.makeDefault();
    this.makeFocus();
    this.makeDisabled();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        font: "inherit",
        letterSpacing: "inherit",
        color: "currentcolor",
        border: "0px",
        boxSizing: "content-box",
        height: "1.4375em",
        margin: "0px",
        display: "block",
        minWidth: "0px",
        width: "100%",
        animationName: "mui-auto-fill-cancel",
        animationDuration: "10ms",
      },
      outlined: {
        background: "inherit",
        padding: "16.5px 14px",
        "-webkit-text-fill-color": "rgba(255, 255, 255, 0.5)",
        ":focus": {
          outline: "0px",
        },
      },
      filled: {
        background: "none",
        "-WebkitTapHighlightColor": "transparent",
        padding: "25px 12px 8px",
      },
      standard: {
        padding: "4px 0px 5px",
        background: "none",
        "-WebkitTapHighlightColor": "transparent",
      },
    });
  }
  private makeDisabled() {
    this.makeStyleFor({
      suffix: "disabled",
      commonStyle: {},
      variants: {
        outlined: {
          "-webkit-text-fill-color": "none",
        },
        filled: {},
        standard: {},
      },
    });
  }
  private makeFocus() {
    this.makeStyleFor({
      suffix: "focus",
      commonStyle: {},
      variants: {
        outlined: {},
        filled: {
          outline: "0px",
        },
        standard: {
          outline: "0px",
        },
      },
    });
  }
}

class HelperTextStyleManager extends MuiBaseStyleUtils<Variants, SuffixTypes> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    const currentColor = makeColor(this.theme);
    this.makeDefaultStyle({
      commonStyle: {
        color: `rgba(${currentColor}, 0.7)`,
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: "400",
        fontSize: "0.75rem",
        lineHeight: "1.66",
        letterSpacing: "0.03333em",
        textAlign: "left",
        margin: "3px 0px 0px",
        cursor: "default",
      },
      filled: {},
      outlined: {},
      standard: {},
    });
  }
}

class BoxTextFieldStyleManager extends MuiBaseStyleUtils<
  Variants,
  SuffixTypes
> {
  constructor(
    props: MuiBaseStyleUtilsProps<Variants>,
    animationWrapperStaticClassname: string
  ) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault(animationWrapperStaticClassname);
    this.makeColors();
    this.makeDisabled(animationWrapperStaticClassname);
  }
  private makeDefault(animationWrapperStaticClassname: string) {
    const currentColor = makeColor(this.theme);

    this.makeDefaultStyle({
      commonStyle: {
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: "400",
        fontSize: "1rem",
        lineHeight: "1.4375em",
        letterSpacing: "0.00938em",
        color: `rgb(${currentColor})`,
        boxSizing: "border-box",
        cursor: "text",
        display: "inline-flex",
        "-WebkitBoxAlign": "center",
        alignItems: "center",
        position: "relative",
      },
      outlined: {
        borderRadius: "4px",
        background: "inherit",
        ":hover": {
          borderColor: `rgb(${currentColor})`,
        },
      },
      filled: {
        backgroundColor: `rgba(${currentColor}, 0.09)`,
        borderTopLeftRadius: "4px",
        borderTopRightRadius: "4px",
        transition: "background-color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms",
        borderBottom: `1px solid rgba(${currentColor}, 0.8)`,
        ":hover": {
          backgroundColor: `rgba(${currentColor}, 0.13)`,
        },
      },
      standard: {
        ":customStyle": `.<!ID!>:hover .${animationWrapperStaticClassname} { height: 2px; background-color: rgb(${currentColor}); }`,
      },
    });
  }
  private makeColors() {
    this.makeStyleFor({
      suffix: "color_error",
      variants: {
        filled: {
          borderBottom: `1px solid ${this.theme.error[this.theme.theme]}`,
        },
        outlined: {},
        standard: {},
      },
    });
    this.makeStyleFor({
      suffix: "color_success",
      variants: {
        filled: {
          borderBottom: `1px solid ${this.theme.success[this.theme.theme]}`,
        },
        outlined: {},
        standard: {},
      },
    });
  }
  private makeDisabled(animationWrapperStaticClassname: string) {
    this.makeStyleFor({
      suffix: "disabled",
      variants: {
        standard: {
          ":customStyle": `.<!ID!>:hover .${animationWrapperStaticClassname} { height: 1px; background-color: rgba(${makeColor(
            this.theme
          )}, 0.7); }`,
        },
        filled: {},
        outlined: {},
      },
    });
  }
}

class FieldSetStyleManager extends MuiBaseStyleUtils<Variants, SuffixTypes> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeFocus();
    this.makeColors();
  }
  private makeDefault() {
    const currentColor = makeColor(this.theme);
    this.makeDefaultStyle({
      commonStyle: {
        textAlign: "left",
        position: "absolute",
        inset: "-5px 0px 0px",
        margin: "0px",
        padding: "0px 8px",
        pointerEvents: "none",
        borderRadius: "inherit",
        borderStyle: "solid",
        borderWidth: "1px",
        overflow: "hidden",
        minWidth: "0%",
        borderColor: `rgba(${currentColor}, 0.23)`,
        ":hover": {
          borderColor: `rgba(${currentColor}, 1)`,
          background: "red",
        },
      },
      filled: {},
      outlined: {},
      standard: {},
    });
  }
  private makeFocus() {
    this.makeStyleFor({
      suffix: "focus",
      commonStyle: {
        borderColor: this.theme.primary[this.theme.theme],
        borderWidth: "2px",
      },
      variants: {
        filled: {},
        outlined: {},
        standard: {},
      },
    });
  }
  private makeColors() {
    this.makeStyleFor({
      suffix: "color_success",
      commonStyle: {},
      variants: {
        standard: {},
        filled: {},
        outlined: {
          borderColor: this.theme.error[this.theme.theme],
          borderWidth: "2px",
        },
      },
    });
    this.makeStyleFor({
      suffix: "color_error",
      commonStyle: {},
      variants: {
        standard: {},
        filled: {},
        outlined: {
          borderColor: this.theme.error[this.theme.theme],
          borderWidth: "2px",
        },
      },
    });
  }
}
class LegendStyleManager extends MuiBaseStyleUtils<Variants, SuffixTypes> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeFocus();
    this.makeHasValue();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        float: "unset",
        width: "auto",
        overflow: "hidden",
        display: "block",
        padding: "0",
        height: "11px",
        fontSize: "0.75em",
        visibility: "hidden",
        maxWidth: "0.01px",
        "-WebkitTransition": "max-width 50ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
        transition: "max-width 50ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
        whiteSpace: "nowrap",
        ">span": {
          paddingLeft: "5px",
          paddingRight: "5px",
          display: "inline-block",
          opacity: "0",
          visibility: "visible",
        },
      },
      filled: {},
      outlined: {},
      standard: {},
    });
  }
  private makeFocus() {
    this.makeStyleFor({
      suffix: "focus",
      commonStyle: {
        maxWidth: "100%",
        transition: "max-width 100ms cubic-bezier(0.0, 0, 0.2, 1) 50ms",
      },
      variants: {
        filled: {},
        outlined: {},
        standard: {},
      },
    });
  }
  private makeHasValue() {
    this.makeStyleFor({
      suffix: "hasValue",
      commonStyle: {
        maxWidth: "100%",
        transition: "max-width 100ms cubic-bezier(0.0, 0, 0.2, 1) 50ms",
      },
      variants: {
        filled: {},
        outlined: {},
        standard: {},
      },
    });
  }
}

class AnimationWrapperStyle extends MuiBaseStyleUtils<Variants, SuffixTypes> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeColors();
  }
  private makeDefault() {
    const currentColor = makeColor(this.theme);
    this.makeDefaultStyle({
      commonStyle: {
        backgroundColor: `rgba(${currentColor}, 0.7)`,
        height: "1px",
        left: "0px",
        bottom: "0px",
        content: '" "',
        position: "absolute",
        right: "0px",
        transition:
          "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        pointerEvents: "none",
      },
      filled: {},
      outlined: {},
      standard: {},
    });
  }
  private makeColors() {
    this.makeStyleFor({
      suffix: "color_success",
      commonStyle: {
        backgroundColor: this.theme.success[this.theme.theme],
      },
      variants: {
        filled: {},
        outlined: {},
        standard: {},
      },
    });
    this.makeStyleFor({
      suffix: "color_error",
      commonStyle: {
        backgroundColor: this.theme.error[this.theme.theme],
      },
      variants: {
        filled: {},
        outlined: {},
        standard: {},
      },
    });
  }
}

class AnimationStyle extends MuiBaseStyleUtils<Variants, SuffixTypes> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeColors();
    this.makeFocused();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        borderBottom: `2px solid ${this.theme.primary[this.theme.theme]}`,
        left: "0px",
        bottom: "0px",
        content: '""',
        position: "absolute",
        right: "0px",
        transition: "transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms",
        pointerEvents: "none",
        transform: "scaleX(0)",
      },
      filled: {},
      outlined: {},
      standard: {},
    });
  }
  private makeColors() {
    this.makeStyleFor({
      suffix: "color_success",
      commonStyle: {
        borderBottom: `2px solid ${this.theme.success[this.theme.theme]}`,
      },
      variants: {
        filled: {},
        outlined: {},
        standard: {},
      },
    });
    this.makeStyleFor({
      suffix: "color_error",
      commonStyle: {
        borderBottom: `2px solid ${this.theme.error[this.theme.theme]}`,
      },
      variants: {
        filled: {},
        outlined: {},
        standard: {},
      },
    });
  }
  private makeFocused() {
    this.makeStyleFor({
      suffix: "focus",
      commonStyle: {
        transform: "scaleX(1) translateX(0px)",
      },
      variants: {
        filled: {},
        outlined: {},
        standard: {},
      },
    });
  }
}

class TextAreaStyle extends MuiBaseStyleUtils<"default", "none"> {
  constructor(props: MuiBaseStyleUtilsProps<"default">) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        font: "inherit",
        letterSpacing: "inherit",
        color: "currentcolor",
        outline: "none",
        border: "none",
        boxSizing: "content-box",
        background: "none",
        height: "auto",
        margin: "0px",
        "-webkit-tap-highlight-color": "transparent",
        display: "block",
        minWidth: "0px",
        minHeight: "23px",
        width: "100%",
        resize: "none",
        padding: "0px",
        overflow: "hidden",
        ":customStyle": `div:has(> .<!ID!>) { padding: 16.5px 14px; }`,
        ":focus": {
          outline: "none",
        },
      },
      default: {},
    });
  }
}

const TextField = forwardRef<
  HTMLTextAreaElement | HTMLInputElement,
  TextFieldProps
>((_props_, textAreaRef) => {
  let {
    color,
    startIcon,
    label,
    variant,
    multiline,
    helpText,
    onFocus,
    onBlur,
    onInput,
    onChange,
    endIcon,
    children,
    style,
    sx,
    className,
    ...props
  } = _props_;

  const _style = useStyle(sx, style);
  const [focused, setFocused] = useState(false);
  const [currentValue, setValue] = useState(
    props.defaultValue?.toString() || ""
  );

  if (props.value && currentValue != props.value) {
    setValue(props.value);
  }

  const setter: Record<
    Exclude<SuffixTypes, "color_success" | "color_error"> | "color",
    SuffixTypes | undefined
  > = {
    hasValue: currentValue.length > 0 ? "hasValue" : undefined,
    focus: focused ? "focus" : undefined,
    color: color ? `color_${color}` : undefined,
    disabled: props.disabled ? "disabled" : undefined,
    hasStartIcon: startIcon ? "hasStartIcon" : undefined,
  };

  if (props?.required && label) label = `${label} *`;
  if (!variant) variant = "standard";
  const currentVariant = variant;

  const WrapperStyle = new TextFieldStyleManager({
    staticClassName: "MUI_TextField_Wrapper",
    currentVariant,
    ..._style,
  });

  const LabelStyle = new LabelTextFieldStyleManager({
    staticClassName: "MUI_TextField_label",
    currentVariant,
    ..._style,
  }).setProps([
    setter.color,
    setter.hasStartIcon && !setter.focus && !setter.hasValue
      ? setter.hasStartIcon
      : undefined,
    setter.focus ? setter.focus : undefined,
    setter.hasValue,
  ]);

  const animationWrapper = new AnimationWrapperStyle({
    staticClassName: "MUI_TextField_AnimationWrapper",
    currentVariant,
    ..._style,
  }).setProps([setter.color]);

  const animationStyle = new AnimationStyle({
    staticClassName: "MUI_TextField_AnimationStyle",
    currentVariant,
    ..._style,
  }).setProps([setter.color, setter.focus]);

  const BoxStyle = new BoxTextFieldStyleManager(
    {
      staticClassName: "MUI_TextField_Box",
      currentVariant,
      ..._style,
    },
    animationWrapper.staticClassName
  ).setProps([setter.color, setter.disabled]);

  const helpTextStyle = new HelperTextStyleManager({
    staticClassName: "MUI_TextField_helpText",
    currentVariant,
    ..._style,
  }); // ok

  const fieldSetStyle = new FieldSetStyleManager({
    ..._style,
    currentVariant,
    staticClassName: "MUI_TextField_FieldSet",
  }).setProps([setter.focus, setter.color]);

  const legendStyle = new LegendStyleManager({
    ..._style,
    currentVariant,
    staticClassName: "MUI_TextField_legend",
  }).setProps([setter.hasValue, setter.focus]);

  const InputStyle = new InputTextFieldStyleManager({
    staticClassName: "MUI_TextField_Input",
    currentVariant,
    ..._style,
  }).setProps([setter.focus, setter.disabled]);

  const textArea = new TextAreaStyle({
    staticClassName: "MUI_TextField_TextArea",
    currentVariant: "default",
    ..._style,
  });

  const resizeTextArea = useCallback(() => {
    if (!multiline || !textAreaRef) return;
    const ref = textAreaRef as React.MutableRefObject<HTMLTextAreaElement>;
    (ref as any).current.style.height = "auto";
    const reductedHeight = ref.current.scrollHeight as number;
    if (
      typeof multiline != "boolean" &&
      typeof multiline?.maxRows == "number" &&
      reductedHeight > 23 * multiline.maxRows
    ) {
      (ref.current as any).style.overflow = "auto";
      (ref.current as any).style.height = 23 * multiline.maxRows;
      return;
    } else if (
      typeof multiline != "boolean" &&
      typeof multiline?.minRows == "number" &&
      reductedHeight < 23 * multiline.minRows
    ) {
      (ref.current as any).style.overflow = "auto";
      (ref.current as any).style.height = 23 * multiline.minRows;
    } else (ref.current as any).style.height = reductedHeight + "px";
  }, []);
  useEffect(resizeTextArea, [currentValue]);

  const commonProps = {
    value: props.defaultValue ? undefined : currentValue,
    defaultValue: props.defaultValue,
    onFocus: (e: any) => {
      onFocus && onFocus(e as any);
      if (e.isDefaultPrevented()) return;
      setFocused(true);
    },
    onBlur: (e: any) => {
      onBlur && onBlur(e as any);
      if (e.isDefaultPrevented()) return;
      setFocused(false);
    },
    onInput: (e: any) => {
      onInput && onInput(e as any);
      if (e.isDefaultPrevented()) return;
      setValue(e.target.value);
    },
    onChange: (e: any) => {
      onChange && onChange(e as any);
      if (e.isDefaultPrevented()) return;
      setValue(e.target.value);
    },
    placeholder: !focused ? undefined : props.placeholder,
    ...(props as any),
  };

  const setInput = () => {
    if (multiline) {
      return (
        <textarea
          ref={textAreaRef as React.RefObject<HTMLTextAreaElement>}
          className={textArea.createClassNames()}
          rows={typeof multiline != "boolean" ? multiline?.minRows || 1 : 1}
          {...commonProps}
        />
      );
    } else if (children) {
      return cloneElement<HTMLSelectElement>(children, {
        className: InputStyle.createClassNames(),
        ref: textAreaRef,
        ...commonProps,
      });
    } else {
      return (
        <input
          ref={textAreaRef as React.RefObject<HTMLInputElement>}
          className={InputStyle.createClassNames()}
          {...commonProps}
        />
      );
    }
  };

  return (
    <div
      className={WrapperStyle.createClassNames() + ` ${className || ""}`}
      style={_style.styleFromSx}
    >
      <label className={LabelStyle.createClassNames()}>{label}</label>
      <div className={BoxStyle.createClassNames()}>
        {variant == "standard" && (
          <div className={animationWrapper.createClassNames()}>
            <div className={animationStyle.createClassNames()}></div>
          </div>
        )}
        {startIcon && (
          <div style={{ transform: "translateX(2px)", cursor: "default" }}>
            {startIcon()}
          </div>
        )}
        {setInput()}
        {variant == "outlined" && (
          <fieldset className={fieldSetStyle.createClassNames()}>
            <legend className={legendStyle.createClassNames()}>
              <span>{label}</span>
            </legend>
          </fieldset>
        )}
        {endIcon && (
          <div style={{ transform: "translateX(-5px)", cursor: "default" }}>
            {endIcon()}
          </div>
        )}
      </div>
      {helpText && (
        <p className={helpTextStyle.createClassNames()}>{helpText}</p>
      )}
    </div>
  );
});
TextField.displayName = "TextField";

export default TextField;
