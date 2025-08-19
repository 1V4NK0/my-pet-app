/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import "../index.css";
import { usePet } from "../hooks/usePet";

import { useChangeName } from "../hooks/useChangeName";
import BasicSelect from "./Select";

function Pet({ frameIndex }) {
  const style = {
    backgroundImage: "url(/Idle.png)",
    // Use pixel-based positioning with CSS calc for precise frame positioning
    backgroundPosition: `calc(-${frameIndex} * var(--sprite-size)) 0px`,
    backgroundSize: `calc(var(--sprite-size) * 10) var(--sprite-size)`,
    backgroundRepeat: "no-repeat",
    imageRendering: "pixelated",
  };

  return <div className="pet-sprite" style={style} />;
}

function NameTag({ name }) {
  const { changeName, isChangingName } = useChangeName();
  return (
    <input
      className="pet-name"
      defaultValue={name}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          changeName(e.target.value);
        }
      }}
    />
  );
}

function Stats({ hunger, energy, health }) {
  return (
    <ul className="stats-container">
      <li>🍗 {hunger}</li>
      <li>⚡️ {energy}</li>
      <li>❤️ {health}</li>
    </ul>
  );
}

function PetContainer() {
  const [frameIndex, setFrameIndex] = useState(0);
  const frameCount = 10; // total frames in your sprite
  const { pet, error, isLoading } = usePet();
  const [petStats, setStats] = useState({
    hunger: 0,
    energy: 0,
    health: 0,
  });

  useEffect(() => {
    if (pet) {
      setStats({
        hunger: pet.hunger,
        energy: pet.energy,
        health: pet.health,
      });
    }
  }, [pet]);

  useEffect(() => {
    // Change frame every 150ms (~6-7 frames per second)
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % frameCount);
    }, 250);

    return () => clearInterval(interval);
  }, [frameCount]);

  useEffect(() => {
    const eventSource = new EventSource(
      "http://localhost:8080/pets/sse/pet-stats"
    );

    eventSource.onmessage = (event) => {
      const parsedDataToJSON = JSON.parse(event.data);
      console.log(parsedDataToJSON);
      setStats((prevState) => ({
        ...prevState,
        hunger: parsedDataToJSON.hunger,
        energy: parsedDataToJSON.energy,
      }));
    };

    return () => {
      eventSource.close();
    };
  }, []);

  if (isLoading) return <h2>Loading...</h2>;
  if (error) return <h2>Error: error.message</h2>;
  const { hunger, energy, health, name } = pet;

  return (
    <div className="pet-container">
      <div className="pet-select">
        <BasicSelect />
      </div>
      <NameTag name={name} />
      <Pet frameIndex={frameIndex} frameCount={frameCount} />
      <Stats
        hunger={petStats.hunger}
        energy={petStats.energy}
        health={petStats.health}
      />
    </div>
  );
}

export default PetContainer;
