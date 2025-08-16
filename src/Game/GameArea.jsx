import Item from "./Item";
import Pet from "./Pet";
import { useEffect, useRef, useState } from "react";

/* eslint-disable no-unused-vars */
function GameArea({ onExit }) {
  // CHANGE LATER TO THE GAME CONTAINER WIDTH
  const [items, setItems] = useState([]);

  let visibleScreenWidth = window.innerWidth - 100;
  let lives = 3;
  let gameAreaRef = useRef(null);
  let petRef = useRef(null);
  const itemsRef = useRef([]);
  const animationRef = useRef(null);
  const [gameAreaWidth, setGameAreaWidth] = useState(0);
  const [petWidth, setPetWidth] = useState(30);
  //generate random eatable and pick random food out of arr?
  const food = ["🍔", "🥗", "🍟", "🍕", "🍿", "🍪", "🍫", "🍉", "🍑", "🍇"];
  const trash = ["🐸", "⚡️", "💩", "🧠", "👑", "🍄", "🥊", "⚽️", "🚗", "🎸"];

  //   const [petX, setPetX] = useState(180);
  const [petCoordinates, setPetCoordinates] = useState({
    x: 180,
    y: 20,
    width: petWidth,
    height: 30,
  });
  useEffect(() => {
    const interval = setInterval(() => {
      const isEdible = Math.random() < 0.5;
      const randomIndex = Math.floor(Math.random() * 10);
      let item = {
        id: Date.now(),
        edible: isEdible,
        emoji: isEdible ? food[randomIndex] : trash[randomIndex],
        x: Math.random() * (gameAreaRef.current.offsetWidth - petWidth - 35),
        y: 30,
        width: 25,
        height: 25,
      };

      setItems((prev) => [...prev, item]);
      itemsRef.current.push(item);
    }, 1700);

    return () => clearInterval(interval);
  }, []);



  function animate() {
    //1. update items positions
    itemsRef.current.forEach((item) => {
      item.y += 3;
    });

    //2. update items state (trigger re-render if needed)
    setItems([...itemsRef.current]);

    //3. schedule the next frame
    animationRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  useEffect(() => {
    if (petRef.current) {
      setPetWidth(petRef.current.offsetWidth);
    }
  }, []);

  useEffect(() => {
    if (gameAreaRef.current) {
      setGameAreaWidth(gameAreaRef.current.offsetWidth - petWidth - 35);
    }
  }, []);

  useEffect(() => {
    //U SHOULD GET THE START AND END WIDTH OF THE GAME CONTAINER FOR BOUNDARIES LATER
    function handleKeyDown(e) {
      if (e.key === "ArrowLeft") {
        setPetCoordinates((prevCoord) => ({
          ...prevCoord,
          x: Math.max(prevCoord.x - 5, 0),
        }));
      } else if (e.key === "ArrowRight") {
        setPetCoordinates((prevCoord) => ({
          ...prevCoord,
          x: Math.min(prevCoord.x + 5, gameAreaWidth),
        }));
      }
    }

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
      <Pet position={petCoordinates.x} ref={petRef} />
    </div>
  );
}

export default GameArea;
