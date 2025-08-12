/* eslint-disable no-unused-vars */
import "./index.css";
import Body from "./ui/Body";
import Header from "./ui/Header";
import Footer from "./ui/Footer";
import { useState } from "react";
import GameLayout from "./Game/GameLayout";
function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  return (
    <>
      {isPlaying ? (
        <GameLayout />
      ) : (
        <div className="app-container">
          <Header />
          <Body />
          <Footer onPlay={() => setIsPlaying(true)} />
        </div>
      )}
    </>
  );
}
export default App;
