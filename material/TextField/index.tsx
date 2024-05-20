"use client";

import { type MuiElementProps } from "../common";
import MuiBase from "../../utils/base";
import { createStyle, MuiColors, MuiStyleControl } from "../../style";
import {
  useContext,
  useEffect,
  useRef,
  useState,
  type CSSProperties,
} from "react";

type TextFieldProps = MuiElementProps & {
  variant?: "outlined" | "filled" | "standard";
  label?: string;
  color?: "error" | "success";
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
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function TextField({ variant, ...props }: TextFieldProps) {
  if (props.required && props.label) props.label = props.label + " *";
  switch (variant) {
    case "outlined":
    case undefined:
      return <Outlined {...props} />;
    case "filled":
      return <Filled {...props} />;
    case "standard":
      return <Standard {...props} />;
  }
}

function InputModer({
  MuiStyle,
  setFocused,
  setValue,
  currentValue,
  props,
}: {
  props: TextFieldProps;
  MuiStyle: MuiStyleControl;
  setFocused: React.Dispatch<React.SetStateAction<boolean>>;
  setValue: React.Dispatch<React.SetStateAction<boolean>>;
  currentValue?: string | number;
}) {
  const [val, setVal] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const resizeTextArea = () => {
    if (!props.multiline) return;
    (textAreaRef as any).current.style.height = "auto";
    const reductedHeight = textAreaRef.current?.scrollHeight as number;
    console.log(reductedHeight);
    if (
      typeof props.multiline != "boolean" &&
      typeof props.multiline?.maxRows == "number" &&
      reductedHeight > 23 * props.multiline.maxRows
    ) {
      (textAreaRef.current as any).style.overflow = "auto";
      (textAreaRef.current as any).style.height = 23 * props.multiline.maxRows;
      return;
    }
    (textAreaRef.current as any).style.height = reductedHeight + "px";
  };
  useEffect(resizeTextArea, [val]);

  const { readOnly, required, multiline, helpText, ..._props } = props;
  if (multiline) {
    const _MuiStyle = createStyle({
      className: "MUI_Input_Multiline_Input",
      defaultStyle: {
        ...MuiStyle.defaultStyle,
        font: "inherit",
        letterSpacing: "inherit",
        color: "currentcolor",
        border: "0px",
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
      },
      customCss: `
      div:has(> .MUI_Input_Multiline_Input) {
        padding: 16.5px 14px
      }
      `,
    });

    return (
      <MuiBase
        ref={textAreaRef}
        MuiStyle={_MuiStyle}
        element="textarea"
        defaultValue={currentValue}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onInput={(e) => {
          setValue(e.currentTarget.value.length > 0);
        }}
        onChange={(e) => setVal(e.target.value)}
        {...(_props as any)}
        rows={
          typeof props.multiline != "boolean"
            ? props.multiline?.minRows || 1
            : 1
        }
        {..._props}
      />
    );
  }

  return (
    <MuiBase
      MuiStyle={MuiStyle}
      element="input"
      disabled={props.disabled || props.readOnly}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      onInput={(e) => setValue(e.currentTarget.value.length > 0)}
      defaultValue={currentValue}
      {...(_props as any)}
    />
  );
}

function HelperText({
  data,
  color,
}: {
  data?: string;
  color?: CSSProperties["color"];
}) {
  const Style = createStyle({
    className: "MUI_Input_Helper_Text",
    defaultStyle: {
      color: "rgba(255, 255, 255, 0.7)",
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontWeight: "400",
      fontSize: "0.75rem",
      lineHeight: "1.66",
      letterSpacing: "0.03333em",
      textAlign: "left",
      margin: "3px 0px 0px",
    },
    currentStyle: {
      color: color ? color : "rgba(255, 255, 255, 0.7)",
    },
  });

  return (
    <MuiBase element="p" MuiStyle={Style}>
      {data}
    </MuiBase>
  );
}

function Outlined({ label, ...props }: Omit<TextFieldProps, "variant">) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setValue] = useState(
    Boolean(props.defaultValue && props.defaultValue.toString().length > 0)
  );
  const DefaultColors = useContext(MuiColors);

  const WrapperStyle = createStyle({
    className: "MUI_Select_Wrapper",
    defaultStyle: {
      display: "inline-flex",
      flexDirection: "column",
      position: "relative",
      minWidth: "0px",
      padding: "0px",
      margin: "0px",
      border: "0px",
      verticalAlign: "top",
      backgroundColor: "inherit",
    },
  });

  const LabelStyle = createStyle({
    className: "MUI_Select_Element_Label",
    defaultStyle: {
      color: "rgba(255, 255, 255, 0.7)",
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontWeight: "400",
      fontSize: "1rem",
      lineHeight: "1.4375em",
      letterSpacing: "0.00938em",
      padding: "0px",
      display: "block",
      transformOrigin: "left top",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "calc(100% - 24px)",
      position: "absolute",
      left: "0px",
      top: "0px",
      transform: "translate(14px, 16px) scale(1)",
      transition:
        "color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms",
      zIndex: 2,
      pointerEvents: "none",
    },
    currentStyle: {
      ...(focused
        ? {
            color: "rgb(33, 150, 243)",
            transform: "translate(14px, -9px) scale(0.75)",
            maxWidth: "calc(133% - 32px)",
            pointerEvents: "auto",
            userSelect: "none",
            padding: "0px",
          }
        : {
            ...(hasValue
              ? {
                  transform: "translate(14px, -9px) scale(0.75)",
                  maxWidth: "calc(133% - 32px)",
                  pointerEvents: "auto",
                  userSelect: "none",
                  padding: "0px",
                }
              : {}),
          }),
      ...(props.color
        ? {
            color: DefaultColors[props.color],
          }
        : {}),
    },
  });

  const fieldSet = createStyle({
    className: "MUI_InputText_fieldSet",
    defaultStyle: {
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
      borderColor: "rgba(255, 255, 255, 0.23)",
      ":hover": {
        borderColor: "rgba(255, 255, 255, 1)",
        background: "red",
      },
    },
    currentStyle: {
      ...(focused
        ? {
            borderColor: DefaultColors.primary,
            borderWidth: "2px",
          }
        : {}),
      ...(props.color
        ? {
            borderColor: DefaultColors[props.color],
            borderWidth: "2px",
          }
        : {}),
    },
  });

  const boxStyle = createStyle({
    className: "MUI_InputText_Box",
    defaultStyle: {
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontWeight: "400",
      fontSize: "1rem",
      lineHeight: "1.4375em",
      letterSpacing: "0.00938em",
      color: "rgb(255, 255, 255)",
      boxSizing: "border-box",
      cursor: "text",
      display: "inline-flex",
      "-WebkitBoxAlign": "center",
      alignItems: "center",
      position: "relative",
      borderRadius: "4px",
      background: "inherit",
    },
    defaultCustomCss: `
    .<!ID!>:hover .${fieldSet.className} {
      border-color: rgb(255, 255, 255);
    }
    `,
  });

  const Input = createStyle({
    className: "MUI_InputText_Tag",
    defaultStyle: {
      font: "inherit",
      letterSpacing: "inherit",
      color: "currentcolor",
      border: "0px",
      boxSizing: "content-box",
      background: "inherit",
      height: "1.4375em",
      margin: "0px",
      display: "block",
      minWidth: "0px",
      width: "100%",
      animationName: "mui-auto-fill-cancel",
      animationDuration: "10ms",
      padding: "16.5px 14px",
      ":focus": {
        outline: "0px",
      },
    },
    currentStyle: {
      "-webkit-text-fill-color": !props.disabled
        ? undefined
        : "rgba(255, 255, 255, 0.5)",
    },
  });

  const legendStyle = createStyle({
    className: "MUI_InputText_FieldSet_Legend",
    defaultStyle: {
      float: "unset",
      width: "auto",
      overflow: "hidden",
      display: "block",
      padding: "0",
      height: "11px",
      fontSize: "0.75em",
      visibility: "hidden",
      maxWidth: "0.01px",
      WebkitTransition: "max-width 50ms cubic-bezier(0.0, 0, 0.2, 1) 0ms",
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
    currentStyle: {
      ...(focused
        ? {
            maxWidth: "100%",
            transition: "max-width 100ms cubic-bezier(0.0, 0, 0.2, 1) 50ms",
          }
        : {
            ...(hasValue
              ? {
                  maxWidth: "100%",
                  transition:
                    "max-width 100ms cubic-bezier(0.0, 0, 0.2, 1) 50ms",
                }
              : {}),
          }),
    },
  });

  return (
    <MuiBase MuiStyle={WrapperStyle}>
      <MuiBase MuiStyle={LabelStyle} element="label">
        {label}
      </MuiBase>
      <MuiBase MuiStyle={boxStyle}>
        <InputModer
          props={{
            ...props,
            placeholder: !focused ? undefined : props.placeholder,
          }}
          MuiStyle={Input}
          setFocused={setFocused}
          setValue={setValue}
          currentValue={props.defaultValue}
        />
        <MuiBase MuiStyle={fieldSet} element="fieldset">
          <MuiBase MuiStyle={legendStyle} element="legend">
            <span>{label}</span>
          </MuiBase>
        </MuiBase>
      </MuiBase>
      {props.helpText && (
        <HelperText
          data={props.helpText}
          color={props.color && DefaultColors[props.color]}
        />
      )}
    </MuiBase>
  );
}

function Filled({ label, ...props }: Omit<TextFieldProps, "variant">) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setValue] = useState(
    Boolean(props.defaultValue && props.defaultValue.toString().length > 0)
  );
  const DefaultColors = useContext(MuiColors);

  const WrapperStyle = createStyle({
    className: "MUI_InputText_Filled_Wrapper",
    defaultStyle: {
      display: "inline-flex",
      WebkitFlexDirection: "column",
      MsFlexDirection: "column",
      flexDirection: "column",
      position: "relative",
      minWidth: "0",
      padding: "0",
      margin: "0",
      border: "0",
      verticalAlign: "top",
    },
  });

  const LabelStyle = createStyle({
    className: "MUI_InputText_Filled_Label",
    defaultStyle: {
      color: "rgba(255, 255, 255, 0.7)",
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontWeight: "400",
      fontSize: "1rem",
      lineHeight: "1.4375em",
      letterSpacing: "0.00938em",
      padding: "0px",
      display: "block",
      transformOrigin: "left top",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "calc(100% - 24px)",
      position: "absolute",
      left: "0px",
      top: "0px",
      transform: "translate(12px, 16px) scale(1)",
      transition:
        "color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms",
      zIndex: "1",
      pointerEvents: "none",
    },
    currentStyle: {
      ...(focused
        ? {
            transform: "translate(12px, 7px) scale(0.75)",
            color: "rgb(33, 150, 243)",
          }
        : {
            transform: hasValue
              ? "translate(12px, 7px) scale(0.75)"
              : "translate(12px, 16px) scale(1)",
          }),
      ...(props.color
        ? {
            color: DefaultColors[props.color],
          }
        : {}),
    },
  });

  const BoxStyle = createStyle({
    className: "MUI_InputText_Filled_Box",
    defaultStyle: {
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontWeight: "400",
      fontSize: "1rem",
      lineHeight: "1.4375em",
      letterSpacing: "0.00938em",
      color: "rgb(255, 255, 255)",
      boxSizing: "border-box",
      cursor: "text",
      display: "inline-flex",
      WebkitBoxAlign: "center",
      alignItems: "center",
      position: "relative",
      backgroundColor: "rgba(255, 255, 255, 0.09)",
      borderTopLeftRadius: "4px",
      borderTopRightRadius: "4px",
      transition: "background-color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms",
      borderBottom: "1px solid white",
      ":hover": {
        backgroundColor: "rgba(255, 255, 255, 0.13)",
      },
    },
    currentStyle: {
      ...(props.color
        ? {
            borderBottom: `1px solid ${DefaultColors[props.color]}`,
          }
        : {}),
    },
  });

  const InputStyle = createStyle({
    className: "MUI_InputText_Filled_Input",
    defaultStyle: {
      font: "inherit",
      letterSpacing: "inherit",
      color: "currentcolor",
      border: "0px",
      boxSizing: "content-box",
      background: "none",
      height: "1.4375em",
      margin: "0px",
      "-WebkitTapHighlightColor": "transparent",
      display: "block",
      minWidth: "0px",
      width: "100%",
      animationName: "mui-auto-fill-cancel",
      animationDuration: "10ms",
      padding: "25px 12px 8px",
    },
    currentStyle: {
      outline: focused ? "0px" : undefined,
    },
  });

  const animationStyle = createStyle({
    className: "MUI_InputText_Filled_Animation",
    defaultStyle: {
      borderBottom: "1px solid rgba(255, 255, 255, 0.7)",
      left: "0px",
      bottom: "0px",
      content: '" "',
      position: "absolute",
      right: "0px",
      transition:
        "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 200ms",
      pointerEvents: "none",
      transform: "scaleX(0) translate(0px, 1px)",
    },
    currentStyle: {
      ...(focused
        ? {
            borderBottom: `2px solid ${DefaultColors.primary}`,
            left: "0px",
            bottom: "0px",
            content: '""',
            position: "absolute",
            right: "0px",
            transform: "scaleX(1) translate(0px, 1px)",
            pointerEvents: "none",
          }
        : {}),
      ...(props.color
        ? {
            borderBottom: `2px solid ${DefaultColors[props.color]}`,
          }
        : {}),
    },
  });

  return (
    <MuiBase MuiStyle={WrapperStyle}>
      <MuiBase element="label" MuiStyle={LabelStyle}>
        {label}
      </MuiBase>
      <MuiBase MuiStyle={BoxStyle}>
        <MuiBase MuiStyle={animationStyle} />
        <InputModer
          MuiStyle={InputStyle}
          setFocused={setFocused}
          setValue={setValue}
          props={{
            ...props,
            placeholder: !focused ? undefined : props.placeholder,
          }}
        />
      </MuiBase>
      {props.helpText && (
        <HelperText
          data={props.helpText}
          color={props.color && DefaultColors[props.color]}
        />
      )}
    </MuiBase>
  );
}

function Standard({ label, ...props }: Omit<TextFieldProps, "variant">) {
  const [focused, setFocused] = useState(false);
  const [hasValue, setValue] = useState(
    Boolean(props.defaultValue && props.defaultValue.toString().length > 0)
  );
  const DefaultColors = useContext(MuiColors);

  const WrapperStyle = createStyle({
    className: "MUI_InputText_Standard_Wrapper",
    defaultStyle: {
      display: "inline-flex",
      WebkitFlexDirection: "column",
      MsFlexDirection: "column",
      flexDirection: "column",
      position: "relative",
      minWidth: "0",
      padding: "0",
      margin: "0",
      border: "0",
      verticalAlign: "top",
    },
  });

  const labelStyle = createStyle({
    className: "MUI_InputText_Standard_Label",
    defaultStyle: {
      color: "rgba(255, 255, 255, 0.7)",
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontWeight: "400",
      fontSize: "1rem",
      lineHeight: "1.4375em",
      letterSpacing: "0.00938em",
      padding: "0px",
      display: "block",
      transformOrigin: "left top",
      whiteSpace: "nowrap",
      overflow: "hidden",
      textOverflow: "ellipsis",
      maxWidth: "100%",
      position: "absolute",
      left: "0px",
      top: "0px",
      transform: "translate(0px, 20px) scale(1)",
      transition:
        "color 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms, max-width 200ms cubic-bezier(0, 0, 0.2, 1) 0ms",
    },
    currentStyle: {
      ...(focused
        ? {
            color: "rgb(33, 150, 243)",
            transform: "translate(0px, -1.5px) scale(0.75)",
          }
        : {
            transform: hasValue
              ? "translate(0px, -1.5px) scale(0.75)"
              : "translate(0px, 20px) scale(1)",
          }),
      ...(props.color
        ? {
            color: DefaultColors[props.color],
          }
        : {}),
    },
  });

  const animationStyle = createStyle({
    className: "MUI_InputText_Standard_Animation",
    defaultStyle: {
      borderBottom: `2px solid ${DefaultColors.primary}`,
      left: "0px",
      bottom: "0px",
      content: '""',
      position: "absolute",
      right: "0px",
      transition: "transform 200ms cubic-bezier(0, 0, 0.2, 1) 0ms",
      pointerEvents: "none",
    },
    currentStyle: {
      transform: focused ? "scaleX(1) translateX(0px)" : "scaleX(0)",
      ...(props.color
        ? {
            borderBottom: `2px solid ${DefaultColors[props.color]}`,
          }
        : {}),
    },
  });

  const animationWrapper = createStyle({
    className: "MUI_InputText_Standard_Animation_Wrapper",
    defaultStyle: {
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      height: "1px",
      left: "0px",
      bottom: "0px",
      content: '" "',
      position: "absolute",
      right: "0px",
      transition: "border-bottom-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      pointerEvents: "none",
    },
    currentStyle: {
      ...(props.color
        ? {
            backgroundColor: DefaultColors[props.color],
          }
        : {}),
    },
  });

  const boxStyle = createStyle({
    className: "MUI_InputText_Standard_Box",
    defaultStyle: {
      fontFamily: "Roboto, Helvetica, Arial, sans-serif",
      fontWeight: "400",
      fontSize: "1rem",
      lineHeight: "1.4375em",
      letterSpacing: "0.00938em",
      color: "rgb(255, 255, 255)",
      boxSizing: "border-box",
      cursor: "text",
      display: "inline-flex",
      "-WebkitBoxAlign": "center",
      alignItems: "center",
      position: "relative",
      marginTop: "16px",
    },
    defaultCustomCss: `
    .<!ID!>:hover .${animationWrapper.className} {
      height: 2px;
      background-color: white;
    }
    `,
  });

  const InputStyle = createStyle({
    className: "MUI_InputText_Standard_Input",
    defaultStyle: {
      font: "inherit",
      letterSpacing: "inherit",
      color: "currentcolor",
      padding: "4px 0px 5px",
      border: "0px",
      boxSizing: "content-box",
      background: "none",
      height: "1.4375em",
      margin: "0px",
      WebkitTapHighlightColor: "transparent",
      display: "block",
      minWidth: "0px",
      width: "100%",
      animationName: "mui-auto-fill-cancel",
      animationDuration: "10ms",
    },
    currentStyle: {
      outline: focused ? "0px" : undefined,
    },
  });

  return (
    <MuiBase MuiStyle={WrapperStyle}>
      <MuiBase element="label" MuiStyle={labelStyle}>
        {label}
      </MuiBase>
      <MuiBase MuiStyle={boxStyle}>
        <MuiBase MuiStyle={animationWrapper}>
          <MuiBase MuiStyle={animationStyle} />
        </MuiBase>
        <InputModer
          MuiStyle={InputStyle}
          setFocused={setFocused}
          setValue={setValue}
          props={{
            ...props,
            placeholder: !focused ? undefined : props.placeholder,
          }}
        />
      </MuiBase>
      {props.helpText && (
        <HelperText
          data={props.helpText}
          color={props.color && DefaultColors[props.color]}
        />
      )}
    </MuiBase>
  );
}
