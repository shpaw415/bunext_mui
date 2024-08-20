"use client";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import Backdrop from "../Backdrop";
import Paper from "../Paper";
import Typography from "../Typography";
import { useClickAwayListener } from "../../utils";
import type { MuiProps } from "../../utils/base";

type MuiDialogProps = {
  title?: string;
  open?: boolean;
  onCloseEvent?: () => void;
  content: {
    text?: string;
    actionButtons?: Array<JSX.Element>;
  };
  /**
   * Form
   */
  children?: JSX.Element;
} & MuiProps &
  Omit<React.HTMLAttributes<HTMLDivElement>, "content">;
type Variants = "default";
type SuffixType = "opened" | "closed";

class Container extends MuiBaseStyleUtils<Variants, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        opacity: "1",
        transition: "opacity 225ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        height: "100%",
        outline: "0px",
        display: "flex",
        "-WebkitBoxPack": "center",
        justifyContent: "center",
        "-WebkitBoxAlign": "center",
        alignItems: "center",
      },
    });
  }
}

class Root extends MuiBaseStyleUtils<Variants, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeOpenState();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        position: "fixed",
        zIndex: "1300",
        inset: "0px",
      },
    });
  }
  private makeOpenState() {
    this.makeStyleFor({
      suffix: "closed",
      commonStyle: {
        display: "none",
      },
    });
  }
}

class Title extends MuiBaseStyleUtils<Variants, SuffixType> {
  public fromTheme = this.colorFromTheme({
    dark: "rgb(255, 255, 255)",
    light: "rgb(0,0,0)",
  });
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        padding: "16px 24px !important",
        flex: "0 0 auto",
      },
    });
  }
}

class ContentRoot extends MuiBaseStyleUtils<Variants, SuffixType> {
  public TextColorFromTheme = this.colorFromTheme({
    light: "rgba(0,0,0, 0.7)",
    dark: "rgba(255, 255, 255, 0.7)",
  });
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        paddingTop: "0px",
        flex: "1 1 auto",
        overflowY: "auto",
        padding: "20px 24px",
      },
    });
  }
}

class ActionRoot extends MuiBaseStyleUtils<Variants, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "flex",
        "-WebkitBoxAlign": "center",
        alignItems: "center",
        padding: "8px",
        "-WebkitBoxPack": "end",
        justifyContent: "flex-end",
        flex: "0 0 auto",
      },
    });
  }
}
/**
 * Dialog with a backdrop that will block user experence for an interaction
 */
export default function Dialog({
  children,
  sx,
  style,
  className,
  ...props
}: MuiDialogProps) {
  const _style = useStyle(sx, style);
  const ref = useClickAwayListener<HTMLDivElement>(() => {
    props.onCloseEvent && props.onCloseEvent();
  });

  const root = new Root({
    staticClassName: "MUI_Dialog_Root",
    currentVariant: "default",
    ..._style,
  }).setProps([props.open ? "opened" : "closed"]);

  const container = new Container({
    staticClassName: "MUI_Dialog_Container",
    currentVariant: "default",
    ..._style,
  });

  const title = new Title({
    staticClassName: "MUI_Dialog_Title",
    currentVariant: "default",
    ..._style,
  });

  const contentRoot = new ContentRoot({
    staticClassName: "MUI_Dialog_Content_Root",
    currentVariant: "default",
    ..._style,
  });

  const actionRoot = new ActionRoot({
    staticClassName: "MUI_Dialog_Action_Root",
    currentVariant: "default",
    ..._style,
  });

  return (
    <div
      role="presentation"
      className={root.createClassNames() + ` ${className || ""}`}
      style={_style.styleFromSx}
    >
      <Backdrop />
      <div className={container.createClassNames()}>
        <Paper>
          <div ref={ref}>
            {props.title && (
              <Typography
                variant="h2"
                className={title.createClassNames()}
                style={{ color: title.fromTheme }}
              >
                {props.title}
              </Typography>
            )}
            <div className={contentRoot.createClassNames()}>
              {props.content.text && (
                <Typography style={{ color: contentRoot.TextColorFromTheme }}>
                  {props.content.text}
                </Typography>
              )}
              {children && children}
              {props.content.actionButtons && (
                <div className={actionRoot.createClassNames()}>
                  {props.content.actionButtons}
                </div>
              )}
            </div>
          </div>
        </Paper>
      </div>
    </div>
  );
}
