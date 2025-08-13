import Item from "./Item";
import Pet from "./Pet";
import { useEffect, useRef, useState } from "react";

/* eslint-disable no-unused-vars */
function GameArea() {
  // CHANGE LATER TO THE GAME CONTAINER WIDTH
  const [items, setItems] = useState([]);
  let visibleScreenWidth = window.innerWidth - 100;
  let lives = 3;
  let gameAreaRef = useRef(null);
  let petRef = useRef(null);
  const [gameAreaWidth, setGameAreaWidth] = useState(0);
  const [petWidth, setPetWidth] = useState(30);
  //generate random eatable and pick random food out of arr?
  const food = ["🍔", "🥗", "🍟", "🍕", "🍿", "🍪", "🍫", "🍉", "🍑", "🍇"];
  const trash = ["🐸", "⚡️", "💩", "🧠", "👑", "🍄", "🥊", "⚽️", "🚗", "🎸"];

  const [petX, setPetX] = useState(180);

  useEffect(() => {
    const interval = setInterval(() => {
      const isEdible = Math.random() < 0.5;
      const randomIndex = Math.floor(Math.random() * 10);
      let item = {
        id: Date.now(),
        edible: isEdible,
        emoji: isEdible ? food[randomIndex] : trash[randomIndex],
        x: Math.random() * (gameAreaRef.current.offsetWidth - petWidth - 15),
        y: 30,
      };

      setItems((prev) => [...prev, item]);
    }, 1700);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems((prevArr) =>
        prevArr.map((item) => ({ ...item, y: item.y + 4 }))
      );

      //UPDATE EACH ITEM X Y W & H here
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (petRef.current) {
      setPetWidth(petRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (gameAreaRef.current) {
      setGameAreaWidth(gameAreaRef.current.offsetWidth - petWidth - 15);
    }
  }, []);

  useEffect(() => {
    //U SHOULD GET THE START AND END WIDTH OF THE GAME CONTAINER FOR BOUNDARIES LATER
    function handleKeyDown(e) {
      if (e.key === "ArrowLeft") {
        setPetX((prevX) => Math.max(prevX - 10, 0));
      } else if (e.key === "ArrowRight") {
        setPetX((prevX) => Math.min(prevX + 10, gameAreaWidth));
      }
    }
    //UPDATE PET'S X Y HEIGHT AND WIDTH HERE

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameAreaWidth]);

  return (
    <div className="game-area" ref={gameAreaRef}>
      {items.map((item) => {
        return (
          <Item
            emoji={item.emoji}
            style={{
              position: "absolute",
              top: item.y + "px",
              left: item.x + "px",
            }}
          />
        );
      })}
      <Pet position={petX} ref={petRef} />
    </div>
  );
}

export default GameArea;
