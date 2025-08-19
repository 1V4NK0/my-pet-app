/* eslint-disable no-unused-vars */
import "./index.css";
import Body from "./ui/Body";
import Header from "./ui/Header";
import HeaderItem from "./ui/HeaderItem";
import Footer from "./ui/Footer";
import { useState } from "react";
import GameLayout from "./Game/GameLayout";
import { usePet } from "./hooks/usePet";
function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { pet, isLoading } = usePet();

  return (
    <div className="app-container">
      {isPlaying ? (
        <GameLayout onExit={() => setIsPlaying(false)} />
      ) : (
        <div className="app-container">
          <Header>
            <HeaderItem func={() => console.log("adding money...")}>
              {isLoading ? "Loading.." : `${pet.balance}$`}
            </HeaderItem>
            <HeaderItem func={() => console.log("accessing profile...")}>
              {isLoading ? "Loading.." : `${pet.owner_name} 🧑`}
            </HeaderItem>
          </Header>
          <Body />
          <Footer onPlay={() => setIsPlaying(true)} />
        </div>
      )}
    </div>
  );
}
export default App;
