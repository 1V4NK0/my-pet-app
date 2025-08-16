import { useEffect, useRef, useState } from "react";

/* eslint-disable no-unused-vars */
function GameArea({ onExit }) {
  let gameAreaRef = useRef(null);
  let lives = 3;
  const itemsRef = useRef([]);
  const animationRef = useRef(null);
  const [gameAreaWidth, setGameAreaWidth] = useState(0);
  const food = ["🍔", "🥗", "🍟", "🍕", "🍿", "🍪", "🍫", "🍉", "🍑", "🍇"];
  const trash = ["🐸", "⚡️", "💩", "🧠", "👑", "🍄", "🥊", "⚽️", "🚗", "🎸"];
  const itemY = useRef(40);
  const petRef = useRef({ x: 180, y: 550, width: 30, height: 30 });

  useEffect(() => {
    const interval = setInterval(() => {
      const isEdible = Math.random() < 0.5;
      const randomIndex = Math.floor(Math.random() * 10);
      let item = {
        id: Date.now(),
        edible: isEdible,
        emoji: isEdible ? food[randomIndex] : trash[randomIndex],
        x: Math.random() * (gameAreaRef.current.offsetWidth - 35 - 35),
        y: 30,
        width: 25,
        height: 25,
      };

      // setItems((prev) => [...prev, item]);
      itemsRef.current.push(item);
    }, 1700);

    return () => clearInterval(interval);
  }, [trash, food]);

  function animate() {
    //STEPS
    /*
    1. clear the canvas for the new frames
    2. update game state (move items y+=3)
    3. draw everything with ctx (ctx.fillText)
    4. request next frame (call requestAnimationFrame(animate) again)
    */

    const canvas = gameAreaRef.current;
    const ctx = canvas.getContext("2d");
    ctx.font = "30px serif";
    ctx.textBaseline = "top";

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    itemsRef.current.forEach((item) => {
      item.y += 2;
      ctx.fillText(item.emoji, item.x, item.y);
    });

    itemsRef.current = itemsRef.current.filter(
      (item) => item.y < canvas.height
    );

    ctx.fillText("🐱", petRef.current.x, petRef.current.y);
    console.log(petRef.current);

    //4. schedule the next frame
    animationRef.current = requestAnimationFrame(animate);
  }

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  useEffect(() => {
    if (gameAreaRef.current) {
      setGameAreaWidth(gameAreaRef.current.offsetWidth - 35 - 35);
    }
  }, []);

  useEffect(() => {
    function handleKeyDown(e) {
      const canvas = gameAreaRef.current;
      if (e.key === "ArrowLeft") {
        petRef.current.x = Math.max(petRef.current.x - 5, 0);
      } else if (e.key === "ArrowRight") {
        petRef.current.x = Math.min(
          petRef.current.x + 5,
          canvas.width - petRef.current.width
        );
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameAreaWidth]);

  return (
    <canvas
      className="game-area"
      width={400}
      height={600}
      ref={gameAreaRef}
    ></canvas>
  );
}

export default GameArea;
