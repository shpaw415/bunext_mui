import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import type { MuiProps } from "../../utils/base";

type MuiFormProps = {
  children: JSX.Element | Array<JSX.Element>;
  maxInputWidth?: string;
} & MuiProps &
  React.HTMLAttributes<HTMLFormElement>;

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
        display: "inline-flex",
        flexDirection: "column",
        position: "relative",
        minWidth: "0px",
        padding: "0px",
        margin: "0px",
        border: "0px",
        verticalAlign: "top",
        width: "100%",
      },
    });
  }
}

class FormRoot extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "grid",
        columnGap: "5px",
        rowGap: "5px",
        gridTemplateColumns: "repeat(auto-fit,minmax(80px,1fr))",
      },
    });
  }
}

const Form = forwardRef<HTMLFormElement, MuiFormProps>(
  ({ className, style, sx, children, onReset, ...props }, ref) => {
    const _style = useStyle(sx, style);
    const [reset, setReset] = useState(false);
    const [formHeight, setFormHeight] = useState(0);
    const _ref = useRef<HTMLFormElement>(null);

    const root = useMemo(
      () =>
        new Root({
          staticClassName: "MUI_Form_Root",
          currentVariant: "default",
          ..._style,
        }),
      []
    );
    const formRoot = useMemo(
      () =>
        new FormRoot({
          ..._style,
          staticClassName: "MUI_Form_Form_Root",
          currentVariant: "default",
        }),
      []
    );

    useEffect(() => {
      reset && setReset(false);
    }, [reset]);

    useEffect(() => {
      setFormHeight(
        ((ref || _ref) as React.RefObject<HTMLFormElement>).current
          ?.offsetHeight || 0
      );
    }, []);

    return (
      <div className={root.createClassNames()}>
        <form
          ref={ref || _ref}
          className={formRoot.createClassNames() + ` ${className || ""}`}
          onReset={(e) => {
            e.preventDefault();
            onReset && onReset(e);
            setReset(true);
          }}
          style={{
            gridTemplateColumns: `repeat(auto-fit,minmax(${props.maxInputWidth},1fr))`,
            minHeight: formHeight,
            ..._style.styleFromSx,
          }}
          {...props}
        >
          {!reset && children}
        </form>
      </div>
    );
  }
);

Form.displayName = "Form";

export default Form;
