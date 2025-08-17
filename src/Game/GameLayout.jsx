/* eslint-disable no-unused-vars */
import GameArea from "./GameArea";
import Header from "../ui/Header";
import HeaderItem from "../ui/HeaderItem";
import { useRef, useState } from "react";
import { useDodep } from "../hooks/useDodep";

function GameLayout({ onExit }) {
  //move the states and refs here lives and score and pass them to children
  const [lives, setLives] = useState(3);
  const [points, setPoints] = useState(0);
  const livesRef = useRef(3);
  const pointsRef = useRef(0);
  const { dodep } = useDodep();

  function handleIncreaseLives() {
    livesRef.current += 1;
    setLives(livesRef.current);
  }

  function handleDecreaseLives() {
    livesRef.current -= 1;
    setLives(livesRef.current);

    if (livesRef.current <= 0) {
      onExit();
      dodep(pointsRef.current);
    }
  }

  function handleIncreaseScore() {
    pointsRef.current += 1;
    setPoints(pointsRef.current);
  }
  return (
    <div>
      <Header>
        <HeaderItem func={onExit}>↩</HeaderItem>
        <HeaderItem func={() => {}}>Points: {points}</HeaderItem>

        <HeaderItem func={() => {}}>{"❤️".repeat(livesRef.current)}</HeaderItem>
      </Header>
      <GameArea
        onExit={onExit}
        onIncreaseLives={handleIncreaseLives}
        onDecreaseLives={handleDecreaseLives}
        onIncreaseScore={handleIncreaseScore}
        lives={livesRef.current}
        points={pointsRef.current}
      />
    </div>
  );
}

export default GameLayout;
