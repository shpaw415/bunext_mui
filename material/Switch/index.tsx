"use client";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import MuiBase, { type MuiProps } from "../../utils/base";
import { forwardRef, useState } from "react";

type SuffixType =
  | "checked"
  | "disabled"
  | "size_small"
  | "color_success"
  | "color_error";

class WrapperStyleManager extends MuiBaseStyleUtils<"default", SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<"default">) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "inline-flex",
        width: "58px",
        height: "38px",
        overflow: "hidden",
        padding: "12px",
        boxSizing: "border-box",
        position: "relative",
        flexShrink: "0",
        zIndex: "0",
        verticalAlign: "middle",
      },
      default: {},
    });
  }
}

class SwitchBtnWrapperManager extends MuiBaseStyleUtils<"default", SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<"default">) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeChecked();
    this.makeDisabled();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        width: "37px",
        height: "37px",
        display: "inline-flex",
        "--WebkitBoxAlign": "center",
        alignItems: "center",
        "--WebkitBoxPack": "center",
        justifyContent: "center",
        boxSizing: "border-box",
        "--WebkitTapHighlightColor": "transparent",
        backgroundColor: "transparent",
        outline: "0px",
        border: "0px",
        margin: "0px",
        cursor: "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        appearance: "none",
        textDecoration: "none",
        padding: "9px",
        borderRadius: "50%",
        position: "absolute",
        top: "0px",
        left: "0px",
        zIndex: "1",
        color: "rgb(255, 255, 255)",
        transition:
          "left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        ":hover": {
          backgroundColor: "rgba(0, 0, 0, 0.04)",
        },
      },
      default: {},
    });
  }
  private makeChecked() {
    this.makeStyleFor({
      suffix: "checked",
      commonStyle: {
        transform: "translateX(20px)",
      },
      variants: {
        default: {},
      },
    });
  }
  private makeDisabled() {
    this.makeStyleFor({
      suffix: "disabled",
      commonStyle: {
        ":hover": {
          backgroundColor: "transparent",
        },
      },
      variants: { default: {} },
    });
  }
}

class SwitchButton extends MuiBaseStyleUtils<"default", SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<"default">) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "inline-flex",
        "-WebkitBoxAlign": "center",
        alignItems: "center",
        "-WebkitBoxPack": "center",
        justifyContent: "center",
        boxSizing: "border-box",
        "--WebkitTapHighlightColor": "transparent",
        backgroundColor: "transparent",
        outline: "0px",
        border: "0px",
        margin: "0px",
        cursor: "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        appearance: "none",
        textDecoration: "none",
        padding: "9px",
        borderRadius: "50%",
        position: "absolute",
        top: "0px",
        left: "0px",
        zIndex: "1",
        color: "rgb(255, 255, 255)",
        transition:
          "left 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
      },
      default: {},
    });
  }
}

class InputStyleManager extends MuiBaseStyleUtils<"default", SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<"default">) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        cursor: "inherit",
        position: "absolute",
        opacity: "0",
        width: "100%",
        height: "100%",
        top: "0px",
        left: "0px",
        margin: "0px",
        padding: "0px",
        zIndex: "1",
      },
      default: {},
    });
  }
}

class SwitchTrackStyleManager extends MuiBaseStyleUtils<"default", SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<"default">) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeChecked();
    this.makeColors();
    this.makeDisabled();
    this.makeSize();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        height: "100%",
        width: "100%",
        borderRadius: "7px",
        zIndex: "-1",
        transition:
          "opacity 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        backgroundColor: "rgb(0, 0, 0)",
        opacity: "0.38",
      },
      default: {},
    });
  }
  private makeChecked() {
    this.makeStyleFor({
      suffix: "checked",
      commonStyle: {
        backgroundColor: this.theme.primary[this.theme.theme],
        opacity: "0.60",
      },
      variants: { default: {} },
    });
  }
  private makeDisabled() {
    this.makeStyleFor({
      suffix: "disabled",
      commonStyle: {
        opacity: "0.25",
      },
      variants: { default: {} },
    });
  }
  private makeSize() {
    this.makeStyleFor({
      suffix: "size_small",
      commonStyle: {
        transform: "scale(0.8)",
      },
      variants: { default: {} },
    });
  }
  private makeColors() {
    this.makeStyleFor({
      suffix: "color_success",
      commonStyle: {
        backgroundColor: this.theme.success[this.theme.theme],
      },
      variants: { default: {} },
    });
    this.makeStyleFor({
      suffix: "color_error",
      commonStyle: {
        backgroundColor: this.theme.error[this.theme.theme],
      },
      variants: { default: {} },
    });
  }
}

class SwitchThumbStyleManager extends MuiBaseStyleUtils<"default", SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<"default">) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeChecked();
    this.makeColors();
    this.makeDisabled();
    this.makeSize();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        boxShadow:
          "rgba(0, 0, 0, 0.2) 0px 2px 1px -1px, rgba(0, 0, 0, 0.14) 0px 1px 1px 0px, rgba(0, 0, 0, 0.12) 0px 1px 3px 0px",
        backgroundColor: "currentcolor",
        width: "20px",
        height: "20px",
        borderRadius: "50%",
      },
      default: {},
    });
  }
  private makeChecked() {
    this.makeStyleFor({
      suffix: "checked",
      commonStyle: {
        backgroundColor: this.theme.primary[this.theme.theme],
      },
      variants: { default: {} },
    });
  }
  private makeDisabled() {
    this.makeStyleFor({
      suffix: "disabled",
      commonStyle: {
        opacity: "0.65",
      },
      variants: { default: {} },
    });
  }
  private makeSize() {
    this.makeStyleFor({
      suffix: "size_small",
      commonStyle: {
        transform: "scale(0.8)",
      },
      variants: { default: {} },
    });
  }
  private makeColors() {
    this.makeStyleFor({
      suffix: "color_success",
      commonStyle: {
        backgroundColor: this.theme.success[this.theme.theme],
      },
      variants: { default: {} },
    });
    this.makeStyleFor({
      suffix: "color_error",
      commonStyle: {
        backgroundColor: this.theme.error[this.theme.theme],
      },
      variants: { default: {} },
    });
  }
}

class SwitchThumbWrapperStyleManager extends MuiBaseStyleUtils<
  "default",
  SuffixType
> {
  constructor(props: MuiBaseStyleUtilsProps<"default">) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        overflow: "hidden",
        pointerEvents: "none",
        position: "absolute",
        zIndex: "0",
        inset: "0px",
        borderRadius: "inherit",
      },
      default: {},
    });
  }
}

type MuiSwitchProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "size"
> & {
  label?: string;
  size?: "small";
  color?: "success" | "error";
} & MuiProps;

const Switch = forwardRef<HTMLInputElement, MuiSwitchProps>(
  ({ sx, style, className, label, ..._props }, ref) => {
    const [isChecked, setCheckedState] = useState(
      _props.defaultChecked || _props.checked || false
    );
    const _style = useStyle(sx, style);

    const { defaultChecked, size, color, ...props } = _props;

    const setter_checked = isChecked ? "checked" : undefined;
    const setter_disabled = _props.disabled ? "disabled" : undefined;
    const setter_size = size ? "size_small" : undefined;
    const setter_color: "color_error" | "color_success" | undefined = color
      ? `color_${color}`
      : undefined;

    const wrapper = new WrapperStyleManager({
      staticClassName: "MUI_Switch_Wrapper",
      currentVariant: "default",
      ..._style,
    });

    const switchBtnWrapper = new SwitchBtnWrapperManager({
      staticClassName: "MUI_Switch_Button_Wrapper",
      currentVariant: "default",
      ..._style,
    }).setProps([setter_checked, setter_disabled]);

    const swithBtn = new SwitchButton({
      staticClassName: "MUI_Switch_Button",
      currentVariant: "default",
      ..._style,
    });
    const switchThumb = new SwitchThumbStyleManager({
      staticClassName: "MUI_Switch_Thumb",
      currentVariant: "default",
      ..._style,
    }).setProps([setter_checked, setter_disabled, setter_size, setter_color]);

    const switchThumbWrapper = new SwitchThumbWrapperStyleManager({
      staticClassName: "MUI_Switch_thumb_Wrapper",
      currentVariant: "default",
      ..._style,
    });

    const input = new InputStyleManager({
      staticClassName: "MUI_Switch_Input",
      currentVariant: "default",
      ..._style,
    });

    const track = new SwitchTrackStyleManager({
      staticClassName: "MUI_Switch_Track",
      currentVariant: "default",
      ..._style,
    }).setProps([setter_checked, setter_disabled, setter_size, setter_color]);

    return (
      <div style={_style.styleFromSx} className={className}>
        <span className={wrapper.createClassNames()}>
          <MuiBase
            className={switchBtnWrapper.createClassNames()}
            ripple
            onClick={() => {
              if (props.disabled || props.checked != undefined) return;
              console.log(props.checked);
              setCheckedState(!isChecked);
            }}
          >
            <span className={swithBtn.createClassNames()}>
              <input
                ref={ref}
                className={input.createClassNames()}
                type="checkbox"
                {...props}
                checked={props.checked ? props.checked : isChecked}
                onChange={(e) => {
                  props.onChange && props.onChange(e);
                  if (isChecked != e.currentTarget.checked)
                    setCheckedState(e.currentTarget.checked);
                }}
              />
              <span className={switchThumb.createClassNames()} />
              <span className={switchThumbWrapper.createClassNames()} />
            </span>
          </MuiBase>
          <span className={track.createClassNames()} />
        </span>
        {label && (
          <span
            style={{
              color: props.disabled
                ? _style.theme.disabled[_style.theme.theme]
                : "currentcolor",
            }}
          >
            {label}
            {props.required ? "*" : ""}
          </span>
        )}
      </div>
    );
  }
);

Switch.displayName = "Switch";

export default Switch;
