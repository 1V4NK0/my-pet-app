import Item from "./Item";
import Pet from "./Pet";
import { useEffect, useState } from "react";

/* eslint-disable no-unused-vars */
function GameArea() {
  // CHANGE LATER TO THE GAME CONTAINER WIDTH
  let visibleScreenWidth = window.innerWidth - 100;
  let lives = 3;
  //generate random eatable and pick random food out of arr?
  const food = ["🍔", "🥗", "🍟", "🍕", "🍿", "🍪", "🍫", "🍉", "🍑", "🍇"];
  const trash = ["🐸", "⚡️", "💩", "🧠", "👑", "🍄", "🥊", "⚽️", "🚗", "🎸"];

  const isEdible = Math.random() < 0.5;
  const randomIndex = Math.floor(Math.random() * 10);
  const [petX, setPetX] = useState(180);

  useEffect(() => {
    //U SHOULD GET THE START AND END WIDTH OF THE GAME CONTAINER FOR BOUNDARIES LATER
    function handleKeyDown(e) {
      if (e.key === "ArrowLeft") {
        setPetX((prevX) => Math.max(prevX - 5, 0));
      } else if (e.key === "ArrowRight") {
        setPetX((prevX) => Math.min(prevX + 5, visibleScreenWidth));
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="game-area">
      <Pet position={petX} />
      <Item
        emoji="🍕"
        style={{ position: "absolute", top: "50px", left: "100px" }}
      />
      <Item
        emoji="💩"
        style={{ position: "absolute", top: "100px", left: "150px" }}
      />
    </div>
  );
}

export default GameArea;
