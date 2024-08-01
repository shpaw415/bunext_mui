import Backdrop from "../Backdrop";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import Paper from "../Paper";
import { useState } from "react";

type DrawerProps = {
  open: boolean;
  onClose?: () => void;
  onOpen?: () => void;
  position?: "top" | "right" | "bottom" | "left";
  children: JSX.Element | JSX.Element[];
} & React.HTMLAttributes<HTMLDivElement>;

type Variant = DrawerProps["position"];
type SuffixType = "opened" | "closed" | "restrained";

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }

  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        position: "fixed",
        zIndex: 1200,
        inset: "0px",
        transition: "transform 1000ms",
        display: "flex",
      },
    });
  }
}

class DrawerBox extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeOpenstate();
  }

  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        transform: "none",
        transition: "transform 350ms cubic-bezier(0, 0, 0.2, 1) 0ms",
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        width: "fit-content",
        maxWidth: "30%",
      },
    });
  }
  private makeOpenstate() {
    this.makeStyleFor({
      suffix: "closed",
      variants: {
        left: {
          transform: "translateX(-100%)",
        },
      },
    });
  }
}
export default function Drawer({
  open,
  position,
  children,
  onClose,
  onOpen,
  style,
  className,
  ...props
}: DrawerProps) {
  const _style = useStyle();
  const [displayed, setDisplayed] = useState<"hidden" | "visible">("hidden");
  const currentVariant = position ?? "left";

  const root = new Root({
    ..._style,
    staticClassName: "MUI_Drawer_Root",
    currentVariant,
  });

  const drawerBox = new DrawerBox({
    ..._style,
    staticClassName: "MUI_Drawer_Box",
    currentVariant,
  }).setProps([open ? "opened" : "closed"]);

  if (!open && displayed == "visible")
    setTimeout(() => setDisplayed("hidden"), 500);
  else if (open && displayed == "hidden") setDisplayed("visible");
  return (
    <div
      className={root.createClassNames()}
      style={{
        visibility: open ? "visible" : displayed,
      }}
    >
      <Backdrop
        onClick={onClose}
        style={{
          opacity: open ? 1 : 0,
          transition: "opacity 250ms",
        }}
      />
      <div className={className ?? "" + drawerBox.createClassNames()}>
        <Paper
          style={{
            margin: 0,
            paddingTop: 0,
            minHeight: "100%",
            maxHeight: "100%",
            overflowY: "auto",
            borderRadius: "0",
            ...(style ?? {}),
          }}
          {...props}
        >
          {children}
        </Paper>
      </div>
    </div>
  );
}
