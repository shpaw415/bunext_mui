"use client";

import { type MuiElementProps } from "../common";
import MuiBase from "../../utils/base";
import {
  useStyle,
  MuiBaseStyleUtils,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import Text from "../Typography";
import { useRef } from "react";

type RadioButtonProps = {
  checked?: boolean;
  label?: string;
  labelDirection?: "top" | "right" | "bottom" | "left";
  disabled?: boolean;
  color?: "error" | "success";
} & MuiElementProps;

type Variants = "default";
type SuffixType =
  | "selected"
  | "disabled"
  | "success"
  | "error"
  | "label_top"
  | "label_bottom"
  | "label_right"
  | "label_left";

class RadioButtonFrameManager extends MuiBaseStyleUtils<Variants, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;

    this.makeDefault();
  }

  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxSizing: "border-box",
        backgroundColor: "transparent",
        outline: "0px",
        border: "0px",
        margin: "0px",
        cursor: "inherit",
        userSelect: "none",
        verticalAlign: "middle",
        appearance: "none",
        textDecoration: "none",
        padding: "9px",
        borderRadius: "50%",
        ":hover": {
          backgroundColor: "rgba(33, 150, 243, 0.08)",
        },
      },
      default: {},
    });
  }
}

class RadioWrapperManager extends MuiBaseStyleUtils<Variants, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;

    this.makeDefault();
    this.makeDisabled();
  }

  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "inline-flex",
        alignItems: "center",
        cursor: "pointer",
        userSelect: "none",
      },
      default: {},
    });
  }

  private makeDisabled() {
    this.makeStyleFor({
      suffix: "disabled",
      commonStyle: {
        cursor: "default",
        borderColor: this.theme.disabled[this.theme.theme],
      },
      variants: { default: {} },
    });
  }
  private makeLabelDirection() {
    this.makeStyleFor({
      suffix: "label_top",
      commonStyle: {
        flexDirection: "column-reverse",
      },
      variants: { default: {} },
    });
    this.makeStyleFor({
      suffix: "label_bottom",
      commonStyle: {
        flexDirection: "column",
      },
      variants: { default: {} },
    });
    this.makeStyleFor({
      suffix: "label_left",
      commonStyle: {
        flexDirection: "row-reverse",
      },
      variants: { default: {} },
    });
  }
}

class RadioFrameRadioManager extends MuiBaseStyleUtils<Variants, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;

    this.makeDefault();
    this.makeChecked();
    this.makeDisabled();
  }

  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        borderRadius: "50%",
        transition: "ease-in-out 200ms",
        cursor: "inherit",
        border: `2px solid ${this.theme.primary[this.theme.theme]}`,
        padding: "8px",
      },
      default: {},
    });
  }

  private makeChecked() {
    this.makeStyleFor({
      suffix: "selected",
      commonStyle: {
        padding: "3px",
      },
      variants: { default: {} },
    });
  }

  private makeDisabled() {
    this.makeStyleFor({
      suffix: "disabled",
      commonStyle: {
        border: `2px solid ${this.theme.disabled[this.theme.theme]}`,
      },
      variants: { default: {} },
    });
  }
}

class RadioInnerManager extends MuiBaseStyleUtils<Variants, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;

    this.makeDefault();
    this.makeSelected();
    this.makeDisabled();
  }

  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        borderRadius: "50%",
        transition: "ease-in-out 200ms",
        cursor: "inherit",
        width: "0px",
        height: "0px",
        backgroundColor: this.theme.primary[this.theme.theme],
      },
      default: {},
    });
  }
  private makeSelected() {
    this.makeStyleFor({
      suffix: "selected",
      commonStyle: {
        width: "10px",
        height: "10px",
      },
      variants: { default: {} },
    });
  }
  private makeDisabled() {
    this.makeStyleFor({
      suffix: "disabled",
      commonStyle: {
        backgroundColor: this.theme.disabled[this.theme.theme],
      },
      variants: { default: {} },
    });
  }
}

class RadioTextManager extends MuiBaseStyleUtils<Variants, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;

    this.makeDefault();
  }

  private makeDefault() {
    const setColor = () => {
      switch (this.theme.theme) {
        case "dark":
          return "white";
        case "light":
          return "black";
      }
    };

    this.makeDefaultStyle({
      commonStyle: {
        color: setColor(),
        cursor: "inherit",
      },
      default: {},
    });
  }
}

export default function Radio({
  sx,
  checked,
  label,
  disabled,
  onClick,
  color,
  labelDirection,
  defaultChecked,
  ...props
}: RadioButtonProps &
  React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >) {
  const style = useStyle();
  const inputRef = useRef<HTMLInputElement>(null);

  const classNamesSeted: Array<SuffixType | undefined> = [
    checked ? "selected" : undefined,
    color,
    disabled ? "disabled" : undefined,
    labelDirection ? `label_${labelDirection || "right"}` : undefined,
  ];

  const ButtonFrameStyle = new RadioButtonFrameManager({
    ...style,
    currentVariant: "default",
    staticClassName: "MUI_RadioButton_frame",
  }).setProps(classNamesSeted);

  const WrapperStyle = new RadioWrapperManager({
    ...style,
    currentVariant: "default",
    staticClassName: "MUI_RadioButton_wrapper",
  }).setProps(classNamesSeted);

  const frameRadio = new RadioFrameRadioManager({
    ...style,
    currentVariant: "default",
    staticClassName: "MUI_RadioFrame_frame",
  }).setProps(classNamesSeted);

  const innerRadio = new RadioInnerManager({
    ...style,
    currentVariant: "default",
    staticClassName: "MUI_Radio_Inner",
  }).setProps(classNamesSeted);

  const TextManager = new RadioTextManager({
    ...style,
    currentVariant: "default",
    staticClassName: "MUI_Radio_Label",
  }).setProps(classNamesSeted);

  return (
    <MuiBase
      className={WrapperStyle.createClassNames()}
      onClick={(e) => {
        const data = {
          ...e,
          ...inputRef.current,
        };
        onClick && onClick(data as any);
      }}
    >
      <MuiBase className={ButtonFrameStyle.createClassNames()} ripple>
        <div className={frameRadio.createClassNames()}>
          <div className={innerRadio.createClassNames()} />
        </div>
        <input
          suppressHydrationWarning
          type="checkbox"
          checked={checked}
          ref={inputRef}
          onChange={props.onChange || (() => {})}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            height: "100%",
            width: "100%",
            opacity: 0,
            cursor: "inherit",
          }}
          disabled={disabled}
          {...props}
        />
      </MuiBase>
      {label && <Text className={TextManager.createClassNames()}>{label}</Text>}
    </MuiBase>
  );
}
