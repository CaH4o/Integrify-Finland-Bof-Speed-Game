import React from "react";
import { Box } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";

import { ICircle } from "../types/Game";
import { useAppDispatch } from "../app/hooks";
import { deleteCiecle, increaseLives } from "../redux/game/gameSlice";
import { useAudio } from "./useAudio";


export default function Circle(circle: ICircle): JSX.Element {
  const dispatch = useAppDispatch();
  const p: number = circle.size;
  const bgcolor: string = circle.color;
  const top: string = circle.top;
  const left: string = circle.left;
  const randomInt: number = parseInt((Math.random() * 1000).toString());
  const isLife: boolean = randomInt <= 5;
  const circleClickedURL: string = "../assets/circle_click.mp3";
  const [playing, toggle] = useAudio(circleClickedURL);

  const style = {
    bgcolor,
    p,
    top,
    left,
    position: "absolute" as "absolute",
    transitionDuration: "0.1s",
    boxShadow: 12,
  };

  function handleClick() {
    toggle();
    dispatch(deleteCiecle(circle));
    if (isLife) dispatch(increaseLives());
  }

  return (
    <Box onClick={handleClick} className="Circle" sx={style}>
      {isLife ? <FavoriteIcon /> : null}
    </Box>
  );
}
