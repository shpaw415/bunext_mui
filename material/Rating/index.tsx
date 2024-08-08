"use client";

import {
  MuiBaseStyleUtils,
  useStyle,
  type MuiBaseStyleUtilsProps,
} from "../../style";
import FilledStar from "@material-design-icons/svg/outlined/star.svg";
import UnfilledStar from "@material-design-icons/svg/filled/star_border.svg";
import StarHalf from "@material-design-icons/svg/outlined/star_half.svg";
import { useState } from "react";
import type { MuiProps } from "../../utils/base";

type RatingProps = MuiProps & {
  readOnly?: boolean;
  rating?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  defaultRating?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;
  disabled?: boolean;
  onChange?: (
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>
  ) => void;
  onClick?: (
    value: number,
    setValue: React.Dispatch<React.SetStateAction<number>>
  ) => void;
} & React.HTMLAttributes<HTMLDivElement>;

type Variants = "default";
type SuffixTypes = "disabled" | "readOnly";

class RatingWrapperManager extends MuiBaseStyleUtils<Variants, SuffixTypes> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        display: "flex",
        flexDirection: "row",
      },
      default: {},
    });
  }
}

class StarManager extends MuiBaseStyleUtils<Variants, SuffixTypes> {
  constructor(props: MuiBaseStyleUtilsProps<Variants>) {
    super(props);
    if (this.alreadyExists()) return;
    this.makeDefault();
    this.makeReadOnly();
    this.makeDisabled();
  }
  private makeDefault() {
    this.makeDefaultStyle({
      commonStyle: {
        transition: "ease-in-out 200ms",
        backgroundColor: "transparent",
        ":hover": {
          transform: "scale(1.3)",
        },
        ":customStyle": `.<!ID!> > svg { fill: rgb(250, 175, 0); }`,
      },
      default: {},
    });
  }
  private makeDisabled() {
    this.makeStyleFor({
      suffix: "disabled",
      commonStyle: {
        opacity: 0.38,
        transform: "none",
      },
      variants: {
        default: {},
      },
    });
  }
  private makeReadOnly() {
    this.makeStyleFor({
      suffix: "readOnly",
      commonStyle: {
        ":hover": {
          transform: "none",
        },
      },
      variants: {
        default: {},
      },
    });
  }
}

export default function Rating({
  readOnly,
  rating,
  disabled,
  onChange,
  onClick,
  defaultRating,
  sx,
  className,
  style,
  ...props
}: RatingProps) {
  const [currentStarUnsertain, setUnsetain] = useState(
    defaultRating || rating || 0
  );
  const [currentSelectedStars, setSelectedStar] = useState(
    defaultRating || rating || 0
  );
  const _style = useStyle(sx, style);

  const StarWrapperStyle = new RatingWrapperManager({
    staticClassName: "MUI_Rating_Star_Wrapper",
    currentVariant: "default",
    ..._style,
  });

  const StartStyle = new StarManager({
    staticClassName: "MUI_Rating_Star",
    currentVariant: "default",
    ..._style,
  });

  const MouseIsOverHalf = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, width } = (e.target as any).getBoundingClientRect() as {
      left: number;
      width: number;
    };
    const x = e.clientX - left;
    if (x > width / 2) return true;
    return false;
  };

  const StarImg = ({
    min,
    max,
    current,
  }: {
    min: number;
    max: number;
    current: number;
  }) => {
    if (current == min) return <StarHalf />;
    if (current >= max) return <FilledStar />;
    else return <UnfilledStar />;
  };

  const StarElement = ({
    minValue,
    maxValue,
  }: {
    minValue: number;
    maxValue: number;
  }) => (
    <div
      className={StartStyle.createClassNames()}
      onMouseEnter={() => {
        if (readOnly || rating || disabled) return;
        setUnsetain(minValue);
      }}
      onMouseMove={(e) => {
        if (readOnly || rating || disabled) return;
        if (MouseIsOverHalf(e)) setUnsetain(maxValue);
        else setUnsetain(minValue);
      }}
      onClick={(e) => {
        if (onClick) {
          if (readOnly || rating || disabled)
            onClick(currentSelectedStars, setSelectedStar);
          else
            onClick(MouseIsOverHalf(e) ? maxValue : minValue, setSelectedStar);
        }
        if (readOnly || rating || disabled) return;
        if (onChange) {
          if (readOnly || rating || disabled)
            onChange(currentSelectedStars, setSelectedStar);
          else
            onChange(MouseIsOverHalf(e) ? maxValue : minValue, setSelectedStar);
        }
        setSelectedStar(MouseIsOverHalf(e) ? maxValue : minValue);
      }}
    >
      <StarImg min={minValue} max={maxValue} current={currentStarUnsertain} />
    </div>
  );
  return (
    <div
      className={StarWrapperStyle.createClassNames() + ` ${className || ""}`}
      onMouseLeave={() => {
        if (rating || readOnly || disabled) return;
        setUnsetain(currentSelectedStars);
      }}
      style={_style.styleFromSx}
      {...props}
    >
      <StarElement minValue={1} maxValue={2} />
      <StarElement minValue={3} maxValue={4} />
      <StarElement minValue={5} maxValue={6} />
      <StarElement minValue={7} maxValue={8} />
      <StarElement minValue={9} maxValue={10} />
      <input
        type="number"
        style={{
          display: "none",
        }}
        onChange={() => {
          onChange && onChange(currentSelectedStars, setSelectedStar);
        }}
        value={currentSelectedStars}
      />
    </div>
  );
}
