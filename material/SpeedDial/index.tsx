import FloatingButton from "../FloatingActionButton";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import AddSvg from "@material-design-icons/svg/filled/add.svg";
import { cloneElement, useCallback, useState } from "react";
import { useClickAwayListener } from "../../utils";
import ToolTip from "../ToolTip";
import IconButton from "../IconButton";
import Backdrop from "../Backdrop";
type SpeedDialProps = {
  backDrop?: boolean;
  children: JSX.Element | JSX.Element[];
  open?: boolean;
  onOpen?: () => void;
  onClose?: () => void;
  direction?: "top" | "left" | "right" | "bottom";
  position?: "top-left" | "top-right" | "bottom-right" | "bottom-left";
} & React.HTMLAttributes<HTMLDivElement>;

type Variant = SpeedDialProps["direction"];
type SuffixType = "opened" | "closed" | SpeedDialProps["position"];

class OpenSVG extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeOpened();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        scale: "1.5",
        transition: "rotate 225ms ease-in-out",
      },
    });
  }
  private makeOpened() {
    this.makeStyleFor({
      suffix: "opened",
      commonStyle: {
        rotate: "45deg",
      },
    });
  }
}

class MenuWrapper extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeOpened();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "flex",
        justifyContent: "space-evenly",
        alignItems: "center",
        transition: "scale 250ms ease-in-out, opacity 200ms ease-in-out",
        transitionDelay: "50ms",
        flexDirection: "column",
        scale: 0,
        opacity: 0,
        width: "100%",
        minWidth: "100%",
      },
      top: {
        flexDirection: "column",
      },
      bottom: {
        flexDirection: "column",
      },
      left: {
        flexDirection: "row-reverse",
      },
      right: {
        flexDirection: "row",
      },
    });
  }
  private makeOpened() {
    this.makeStyleFor({
      suffix: "opened",
      commonStyle: {
        scale: 1,
        opacity: 1,
      },
    });
  }
}

class Root extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makePosition();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "flex",
        flexDirection: "column",
        minHeight: 50,
        minWidth: 50,
        height: 0,
        width: 0,
        overflow: "visible",
        position: "fixed",
        bottom: 15,
        right: 15,
      },
      top: {
        flexDirection: "column-reverse",
      },
      left: {
        flexDirection: "row-reverse",
      },
      right: {
        flexDirection: "row",
      },
    });
  }
  private makePosition() {
    this.makeStyleFor({
      suffix: "bottom-left",
      commonStyle: {
        bottom: 15,
        left: 15,
      },
    });

    this.makeStyleFor({
      suffix: "top-left",
      commonStyle: {
        top: 15,
        left: 15,
      },
    });

    this.makeStyleFor({
      suffix: "top-right",
      commonStyle: {
        bottom: 15,
        right: 15,
      },
    });
  }
}

export default function SpeedDial({
  open,
  onClose,
  onOpen,
  backDrop,
  direction,
  position,
  children,
}: SpeedDialProps) {
  const _style = useStyle();
  const [opened, setOpen] = useState(open ?? false);
  const ref = useClickAwayListener<HTMLButtonElement>(() => {
    setOpen(false);
    onClose && onClose();
  });
  const currentVariant = direction ?? "top";

  const openedClassState = open ?? opened ? "opened" : "closed";
  const positionClassState = position ?? "bottom-right";

  const root = new Root({
    ..._style,
    staticClassName: "MUI_SpeedDial_Root",
    currentVariant,
  }).setProps([openedClassState, positionClassState]);
  const opensvg = new OpenSVG({
    ..._style,
    staticClassName: "MUI_SpeedDial_Open_Svg",
    currentVariant,
  }).setProps([openedClassState]);

  const menuWrapper = new MenuWrapper({
    ..._style,
    staticClassName: "MUI_SpeedDial_Menu_Wrapper",
    currentVariant,
  }).setProps([openedClassState]);

  if (open && open != opened) setOpen(open);

  if (!Array.isArray(children)) children = [children];

  const toolTipSide = useCallback<
    () => "top" | "bottom" | "left" | "right"
  >(() => {
    if (position == "top-left") {
      if (direction == "right") return "bottom";
      else if (direction == "bottom") return "right";
    } else if (position == "top-right") {
      if (direction == "left") return "bottom";
      else if (direction == "bottom") return "left";
    } else if (position == "bottom-right") {
      if (direction == "left") return "top";
      else if (direction == "top") return "left";
    } else if (position == "bottom-left") {
      if (direction == "right") return "top";
      else if (direction == "top") return "right";
    }
    return "left";
  }, []);

  return (
    <>
      <div
        onMouseLeave={() => {
          setOpen(false);
          onClose && onClose();
        }}
        className={root.createClassNames()}
      >
        <FloatingButton
          ref={ref}
          color="primary"
          style={{
            minHeight: 50,
            minWidth: 50,
            maxHeight: 200,
            maxWidth: 200,
            padding: 0,
          }}
          onMouseEnter={() => {
            if (!opened) {
              onOpen && onOpen();
              setOpen(true);
            }
          }}
          onClick={() => {
            if (opened) {
              onClose && onClose();
              setOpen(false);
            } else {
              onOpen && onOpen();
              setOpen(true);
            }
          }}
        >
          <AddSvg className={opensvg.createClassNames()} />
        </FloatingButton>
        <div className={menuWrapper.createClassNames()}>
          {children.map((child, index) =>
            cloneElement<SpeedDialElementProps & { key: any }>(child, {
              position: toolTipSide(),
              key: index,
            })
          )}
        </div>
      </div>
      {opened && backDrop && <Backdrop />}
    </>
  );
}

type SpeedDialElementProps = {
  description?: string;
  children: JSX.Element;
  position?: "left" | "right" | "top" | "bottom";
};

class MenuElementRoot extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        width: "100%",
        height: "100%",
        minHeight: 50,
        minWidth: 50,
        display: "flex",
        justifyContent: "center",
      },
    });
  }
}

export function SpeedDialElement({
  children,
  description,
  position,
}: SpeedDialElementProps) {
  const _style = useStyle();
  const StandAloneIcon = (
    <IconButton
      style={{
        boxShadow: "4px 4px 20px 0px #0000003d",
        color: "rgba(0, 0, 0, 0.6)",
        overflow: "hidden",
      }}
    >
      {children}
    </IconButton>
  );

  const currentVariant = "top";

  const root = new MenuElementRoot({
    ..._style,
    staticClassName: "MUI_SpeedDial_Element_Root",
    currentVariant,
  });

  return (
    <div className={root.createClassNames()}>
      {!description && StandAloneIcon}
      {description && (
        <ToolTip
          position={position ?? "left"}
          title={description}
          trigger="onMouseEnter"
        >
          {StandAloneIcon}
        </ToolTip>
      )}
    </div>
  );
}
