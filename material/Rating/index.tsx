"use client";

import { type MuiElementProps } from "../common";
import MuiBase from "../../utils/base";
import { createStyle, type CssProps } from "../../style";
import { Svg } from "../../utils/svg";
import FilledStar from "@material-design-icons/svg/outlined/star.svg";
import UnfilledStar from "@material-design-icons/svg/filled/star_border.svg";
import StarHalf from "@material-design-icons/svg/outlined/star_half.svg";
import { useState } from "react";
type RatingProps = MuiElementProps & {
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
};

export default function Rating({
  readOnly,
  rating,
  disabled,
  onChange,
  onClick,
  defaultRating,
  ...props
}: RatingProps) {
  const [currentStarUnsertain, setUnsetain] = useState(
    defaultRating || rating || 0
  );
  const [currentSelectedStars, setSelectedStar] = useState(
    defaultRating || rating || 0
  );
  const StarWrapperStyle = createStyle({
    className: "MUI_Rating_Star_Wrapper",
    defaultStyle: {
      display: "flex",
      flexDirection: "row",
    },
    currentStyle: {},
  });

  const StartStyle = createStyle({
    className: "MUI_Rating_Star",
    defaultStyle: {},
    currentStyle: {},
  });

  const svgStarSx: CssProps = {
    fill: "rgb(250, 175, 0)",
  };
  const svgBoxSx: CssProps = {
    transition: "ease-in-out 200ms",
    backgroundColor: "transparent",
    opacity: disabled ? 0.38 : 1,
    ":hover": {
      transform: readOnly || disabled ? "" : "scale(1.3)",
    },
  };

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
    <MuiBase
      MuiStyle={StartStyle}
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
      <Svg
        svg={
          <StarImg
            min={minValue}
            max={maxValue}
            current={currentStarUnsertain}
          />
        }
        sx={{
          svg: svgStarSx,
          box: svgBoxSx,
        }}
      />
    </MuiBase>
  );
  return (
    <MuiBase
      MuiStyle={StarWrapperStyle}
      onMouseLeave={() => {
        if (rating || readOnly || disabled) return;
        setUnsetain(currentSelectedStars);
      }}
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
    </MuiBase>
  );
}
