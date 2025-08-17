import { useEffect, useRef, useState } from "react";

/*
TO DO:
- make canvas responsive to the different sizes
- implement the collision logic - DONE
- the game logic (points, lives (decrease lives if item is edible and falls out of the canvas))
- make game harder over progress (points > 20 => spawn items more frequently)


useState for points and lives

THE WAY THE CANVAS AND ANIMATIONS WORK:
- define canvas as a container for the elements
- define canvas context as a tool to draw on a canvas
- declare and initialize useRef for items (array) and pet state management without re-rendering (not efficient for this case)
- define animate() func to draw (and move food items) the elements and move them (items, pet)
- use useEffect to generate and push new food items
- use useEffect to handle key event listener to move your pet and update the position

Common side effects (useEffect):
 - data fetching (I use react query so it's not actually needed)
 - timers and intervals, requestAnimationFrame
 - eventListeners
 - web socket connections
 - DOM manipulations
 - cleanup actions
*/

/* eslint-disable no-unused-vars */
function GameArea({
  lives,
  onExit,
  onIncreaseLives,
  onDecreaseLives,
  onIncreaseScore,
  points,
}) {
  //IDEAS
  //handle the passing points to your money
  //make items appear faster over time or points
  //maybe add onExit to exit as soon as u lose or sort of end game screen
  //when u click "play" -10 energy, +money as points, 
  let gameAreaRef = useRef(null);
  //useState is async so it doesn't update in real time that's why they can't keep in track with animate(), use useRef for immediate updates

  const itemsRef = useRef([]);
  const animationRef = useRef(null);
  const [gameAreaWidth, setGameAreaWidth] = useState(0);
  const food = ["🍔", "🥗", "🍟", "🍕", "🍿", "🍪", "🍫", "🍉", "🍑", "🍇"];
  const trash = ["🐸", "⚡️", "💩", "🧠", "👑", "🍄", "🥊", "⚽️", "🚗", "🎸"];

  const petRef = useRef({ x: 180, y: 550, width: 30, height: 30 });

  useEffect(() => {
    const time = points > 5 ? 1000 : 1500;

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

      itemsRef.current.push(item);
    }, time);

    return () => clearInterval(interval);
  }, [trash, food, points]);

  function animate() {
    //STEPS
    /*
    1. get the canvas ref
    2. define the context for drawing on a canvas
    3. clear the canvas to refresh
    4. update positions of element
    5. draw items
    6. call requestAnimationFrame(animate) for constant looping 
    */

    const canvas = gameAreaRef.current;
    const ctx = canvas.getContext("2d");
    ctx.font = "30px serif";
    ctx.textBaseline = "top";

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    itemsRef.current.forEach((item) => {
      item.y += 2;
      ctx.fillText(item.emoji, item.x, item.y);

      if (
        item.x < petRef.current.x + petRef.current.width &&
        item.x + item.width > petRef.current.x &&
        item.y < petRef.current.y + petRef.current.height &&
        item.y + item.height > petRef.current.y
      ) {
        //Don't use pop() as it removes the last element, not the one collided and it basically removes all the items
        // itemsRef.current.pop(item);
        // console.log("collision! " + item.emoji);

        itemsRef.current = itemsRef.current.filter(
          (currItem) => currItem.id !== item.id
        );

        if (item.edible) {
          onIncreaseScore();
        } else {
          onDecreaseLives();
        }
      }
    });

    itemsRef.current = itemsRef.current.filter(
      (item) => item.y < canvas.height
    );

    ctx.fillText("🐱", petRef.current.x, petRef.current.y);
    // console.log(petRef.current);

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
