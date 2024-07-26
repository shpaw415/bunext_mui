import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import { forwardRef } from "react";

type MuiFormProps = {
  children: JSX.Element | Array<JSX.Element>;
  maxInputWidth?: string;
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

const Form = forwardRef<HTMLFormElement, MuiFormProps>((props, ref) => {
  const _style = useStyle();
  const root = new Root({
    staticClassName: "MUI_Form_Root",
    currentVariant: "default",
    ..._style,
  });
  const formRoot = new FormRoot({
    ..._style,
    staticClassName: "MUI_Form_Form_Root",
    currentVariant: "default",
  });
  return (
    <div className={root.createClassNames()}>
      <form
        ref={ref}
        className={formRoot.createClassNames()}
        style={{
          gridTemplateColumns: `repeat(auto-fit,minmax(${props.maxInputWidth},1fr))`,
        }}
      >
        {props.children}
      </form>
    </div>
  );
});

Form.displayName = "Form";

export default Form;
