import IconButton from "../IconButton";
import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import ArrowSvg from "@material-design-icons/svg/filled/arrow_back_ios.svg";
import type { MuiProps } from "../../utils/base";
type PaginationProps = {
  count: number;
  selected: number;
  onSelect: (selected: number) => void;
  color?: "primary" | "secondary";
  variant?: "standard" | "outlined";
  disabled?: boolean;
} & MuiProps &
  React.HTMLAttributes<HTMLElement>;
type Variant = PaginationProps["variant"];
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
        display: "flex",
        flexWrap: "wrap",
        "-WebkitBoxAlign": "center",
        alignItems: "center",
        padding: "0px",
        margin: "0px",
        listStyle: "none",
      },
    });
  }
}

class Element extends MuiBaseStyleUtils<Variant, SuffixType> {
  private bgColor = {
    primary: this.colorFromTheme({
      light: this.theme.primary.light,
      dark: this.theme.primary.dark,
    }),
    secondary: this.colorFromTheme({
      light: this.theme.secondary.light,
      dark: this.theme.secondary.dark,
    }),
    default: this.colorFromTheme({
      light: "rgba(0,0,0,0.16)",
      dark: "rgba(255,255,255,0.16)",
    }),
  };

  constructor(props: MuiBaseStyleUtilsProps<Variant>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        width: "40px",
        height: "40px",
      },
    });
  }
  public backgroundColorOnSelect(
    selected: boolean,
    color: PaginationProps["color"]
  ) {
    if (!selected) return undefined;
    else if (!color) return this.bgColor.default;
    return this.bgColor[color];
  }
}

export default function Pagination({
  count,
  variant,
  onSelect,
  selected,
  color,
  sx,
  style,
  ...props
}: PaginationProps) {
  const _style = useStyle(sx, style);

  const currentVariant = variant ?? "standard";

  const root = new Root({
    ..._style,
    currentVariant,
    staticClassName: "MUI_Pagination_Root",
  });

  const el = new Element({
    ..._style,
    currentVariant,
    staticClassName: "MUI_Pagination_Element",
  });

  const buttonSize = "32px";

  const _selected = selected - 1;

  return (
    <nav style={_style.styleFromSx} {...props}>
      <ul className={root.createClassNames()}>
        <li className={el.createClassNames()}>
          <IconButton
            size="small"
            style={{
              width: buttonSize,
              height: buttonSize,
            }}
            onClick={() => selected > 1 && onSelect(selected - 1)}
          >
            <ArrowSvg
              style={{
                translate: "2px 0",
              }}
            />
          </IconButton>
        </li>
        {Array(count)
          .fill(0)
          .map((notused, index, list) => {
            const pageElement = () => {
              const isSelected = index == selected - 1;
              return (
                <li key={index} className={el.createClassNames()}>
                  <IconButton
                    style={{
                      width: buttonSize,
                      height: buttonSize,
                      backgroundColor: el.backgroundColorOnSelect(
                        isSelected,
                        color ?? undefined
                      ),
                      color: isSelected ? "white" : "black",
                    }}
                    onClick={() => onSelect(index + 1)}
                  >
                    <span
                      style={{
                        fontSize: "0.9rem",
                        translate: "0 0",
                      }}
                    >
                      {index + 1}
                    </span>
                  </IconButton>
                </li>
              );
            };
            const dotedElement = () => (
              <li key={index}>
                <span
                  style={{
                    width: buttonSize,
                    height: buttonSize,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "0.9rem",
                  }}
                >
                  ...
                </span>
              </li>
            );
            if (_selected == index) return pageElement();
            else if (index == 0 || index == list.length - 1)
              return pageElement();
            else if (
              (_selected < 4 && index < 5) ||
              (_selected > list.length - 5 && index > list.length - 4)
            )
              return pageElement();
            else if (index == _selected + 1 || index == _selected - 1)
              return pageElement();
            else if (
              (_selected < 5 && index == 5) ||
              (_selected > list.length - 4 && index == list.length - 4)
            )
              return dotedElement();
            else if (_selected + 2 == index || _selected - 2 == index)
              return dotedElement();
          })
          .filter((e) => e != undefined)}
        <li className={el.createClassNames()}>
          <IconButton
            size="small"
            style={{
              width: buttonSize,
              height: buttonSize,
            }}
            onClick={() => selected < count && onSelect(selected + 1)}
          >
            <ArrowSvg
              style={{
                translate: "-2px 0",
                rotate: "180deg",
              }}
            />
          </IconButton>
        </li>
      </ul>
    </nav>
  );
}
