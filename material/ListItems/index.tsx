import MuiBase, { type MuiProps } from "../../utils/base";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import Typography from "../Typography";
import { cloneElement } from "react";

type Props = {
  children: JSX.Element[] | JSX.Element;
  Header?: string;
  disablePadding?: boolean;
} & MuiProps &
  React.HTMLAttributes<HTMLDivElement>;

type Variant = "default";
type SuffixType = "selected" | "noPadding";

class Ul extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeNoPadding();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        listStyle: "none",
        margin: "0px",
        padding: "8px 0px",
        position: "relative",
      },
    });
  }
  private makeNoPadding() {
    this.makeStyleFor({
      suffix: "noPadding",
      commonStyle: {
        padding: "0px",
      },
    });
  }
}

class _Header extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        boxSizing: "border-box",
        lineHeight: "48px",
        listStyle: "none",
        color: "rgba(0, 0, 0, 0.6)",
        fontFamily: "Roboto, Helvetica, Arial, sans-serif",
        fontWeight: "500",
        fontSize: "0.875rem",
        paddingLeft: "16px",
        paddingRight: "16px",
        position: "sticky",
        top: "0px",
        zIndex: "1",
        backgroundColor: "rgb(255, 255, 255)",
      },
    });
  }
}

export default function ListItems({
  children,
  Header,
  disablePadding,
  sx,
  style,
  ...props
}: Props) {
  const _style = useStyle(sx, style);

  const ul = new Ul({
    ..._style,
    staticClassName: "MUI_ListItem_ul",
    currentVariant: "default",
  }).setProps([disablePadding ? "noPadding" : undefined]);

  let groupedChildren: Array<JSX.Element[] | JSX.Element> = [];
  let currentGroup: JSX.Element[] = [];

  if (Header) {
    const _Header_ = new _Header({
      ..._style,
      staticClassName: "MUI_ListItem_subHeader",
      currentVariant: "default",
    });
    groupedChildren.push(
      <div className={_Header_.createClassNames()} key="Mui-List-Header">
        <Typography>{Header}</Typography>
      </div>
    );
  }

  if (!Array.isArray(children)) children = [children];

  for (const el of children) {
    if (el.type.name != "Divier") {
      currentGroup.push(el);
      continue;
    }
    groupedChildren.push(currentGroup);
    groupedChildren.push(el);
    currentGroup = [];
  }
  groupedChildren.push(currentGroup);

  return (
    <div style={_style.styleFromSx} {...props}>
      {groupedChildren.flatMap((elArrayORSeparator, index) => {
        if (Array.isArray(elArrayORSeparator))
          return (
            <nav key={index}>
              {(groupedChildren[index] as Array<JSX.Element>).flatMap(
                (elArray, index) => {
                  return (
                    <ul key={index} className={ul.createClassNames()}>
                      {elArray}
                    </ul>
                  );
                }
              )}
            </nav>
          );

        return elArrayORSeparator;
      })}
    </div>
  );
}

type ListItemsElement = {
  StartElement?: JSX.Element;
  EndElement?: JSX.Element;
  children?: string | JSX.Element;
  helperText?: string | JSX.Element;
  selected?: boolean;
  inset?: boolean;
} & React.HTMLAttributes<HTMLDivElement> &
  MuiProps;

class Li extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "flex",
        "--WebkitBoxPack": "start",
        justifyContent: "flex-start",
        "--WebkitBoxAlign": "center",
        alignItems: "center",
        position: "relative",
        textDecoration: "none",
        width: "100%",
        boxSizing: "border-box",
        textAlign: "left",
      },
    });
  }
}

class Wrapper extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeSelected();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        "--WebkitTapHighlightColor": "transparent",
        backgroundColor: "transparent",
        outline: "0px",
        border: "0px",
        margin: "0px",
        borderRadius: "0px",
        cursor: "pointer",
        userSelect: "none",
        verticalAlign: "middle",
        appearance: "none",
        color: "inherit",
        display: "flex",
        "--WebkitBoxFlex": "1",
        flexGrow: "1",
        "--WebkitBoxPack": "start",
        justifyContent: "flex-start",
        "--WebkitBoxAlign": "center",
        alignItems: "center",
        position: "relative",
        textDecoration: "none",
        minWidth: "0px",
        boxSizing: "border-box",
        textAlign: "left",
        padding: "8px 16px",
        transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        ":hover": {
          textDecoration: "none",
          backgroundColor: this.colorFromTheme({
            light: "rgba(0, 0, 0, 0.04)",
            dark: "rgba(255, 255, 255, 0.08)",
          }),
        },
      },
    });
  }
  private makeSelected() {
    this.makeStyleFor({
      suffix: "selected",
      commonStyle: {
        backgroundColor: this.colorFromTheme({
          light: `rgba(${this.extractColorToRGB(this.theme.primary.light).join(
            ", "
          )}, 0.08)`,
          dark: `rgba(${this.extractColorToRGB(this.theme.primary.light).join(
            ", "
          )}, 0.08)`,
        }),
      },
    });
  }
}

class ContentWrapper extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        flex: "1 1 auto",
        minWidth: "0px",
        marginTop: "4px",
        marginBottom: "4px",
      },
    });
  }
}

class StartIconRoot extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        minWidth: "56px",
        color: this.colorFromTheme({
          light: "rgba(0, 0, 0, 0.54)",
          dark: "rgb(255, 255, 255)",
        }),
        flexShrink: "0",
        display: "inline-flex",
      },
    });
  }
}

class EndIconRoot extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        color: this.colorFromTheme({
          light: "rgba(0, 0, 0, 0.54)",
          dark: "rgb(255, 255, 255)",
        }),
      },
    });
  }
}

class StartIconSVG extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        "--WebkitUserSelect": "none",
        "--MozUserSelect": "none",
        "--MsUserSelect": "none",
        userSelect: "none",
        width: "1em",
        height: "1em",
        display: "inline-block",
        fill: "currentColor",
        "--WebkitFlexShrink": "0",
        "--MsFlexNegative": "0",
        flexShrink: "0",
        "--WebkitTransition": "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        transition: "fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",
        fontSize: "1.5rem",
      },
    });
  }
}

class HelperText extends MuiBaseStyleUtils<Variant, SuffixType> {
  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
  }
  public makeStyle() {
    return {
      fontWeight: "400",
      fontSize: "0.875rem",
      lineHeight: "1.43",
      letterSpacing: "0.01071em",
      color: this.colorFromTheme({
        light: "rgba(0, 0, 0, 0.6)",
        dark: "rgba(255, 255, 255, 0.7)",
      }),
      display: "block",
    } as React.CSSProperties;
  }
}

export function ListItemElement({
  children,
  StartElement,
  EndElement,
  helperText,
  selected,
  inset,
  sx,
  style,
  ...props
}: ListItemsElement) {
  const _style = useStyle();

  const li = new Li({
    ..._style,
    staticClassName: "MUI_ListItem_li",
    currentVariant: "default",
  });

  const wrapper = new Wrapper({
    ..._style,
    staticClassName: "MUI_ListItem_li_Wrapper",
    currentVariant: "default",
  }).setProps([selected ? "selected" : undefined]);

  const contentWrapper = new ContentWrapper({
    ..._style,
    staticClassName: "MUI_ListItem_li_Content_Wrapper",
    currentVariant: "default",
  });

  const IconRoot = new StartIconRoot({
    ..._style,
    staticClassName: "MUI_ListItem_li_StartIcon_Root",
    currentVariant: "default",
  });

  const endIconRoot = new EndIconRoot({
    ..._style,
    staticClassName: "MUI_ListItem_EndElement_Root",
    currentVariant: "default",
  });

  const IconSVG = new StartIconSVG({
    ..._style,
    staticClassName: "MUI_ListItem_li_StartIcon_SVG",
    currentVariant: "default",
  });

  const helper = new HelperText({
    ..._style,
    staticClassName: "MUI_ListItem_li_HelperText",
    currentVariant: "default",
  });

  return (
    <li className={li.createClassNames()} style={_style.styleFromSx}>
      <MuiBase
        element="div"
        ripple
        className={wrapper.createClassNames()}
        tabIndex={0}
        role="button"
        {...props}
      >
        {StartElement && (
          <div className={IconRoot.createClassNames()}>
            {cloneElement<HTMLElement>(StartElement, {
              className: `${IconSVG.createClassNames()} ${
                StartElement.props.className || ""
              }`,
            })}
          </div>
        )}
        {inset && <div className={IconRoot.createClassNames()} />}
        {typeof children == "string" ? (
          <div className={contentWrapper.createClassNames()}>
            <Typography>{children}</Typography>
            {helperText && (
              <Typography style={helper.makeStyle()}>{helperText}</Typography>
            )}
          </div>
        ) : (
          children
        )}

        {EndElement && (
          <div
            onClick={(e) => e.stopPropagation()}
            className={endIconRoot.createClassNames()}
          >
            {cloneElement<HTMLElement>(EndElement, {
              className: `${IconSVG.createClassNames()} ${
                EndElement.props.className || ""
              }`,
            })}
          </div>
        )}
      </MuiBase>
    </li>
  );
}
