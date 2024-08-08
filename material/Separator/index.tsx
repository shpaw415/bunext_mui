import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import type { MuiProps } from "../../utils/base";

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
        margin: "0px",
        flexShrink: "0",
        borderWidth: "0px 0px thin",
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.12)",
      },
    });
  }
}

export default function Divier({ sx }: MuiProps) {
  const _style = useStyle(sx);
  const root = new Root({
    ..._style,
    staticClassName: "MUI_Divier_Root",
    currentVariant: "default",
  });

  return (
    <div
      role="separator"
      className={root.createClassNames()}
      style={_style.styleFromSx}
    />
  );
}
