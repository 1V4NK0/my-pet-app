import GameArea from "./GameArea";
import Header from "../ui/Header";
import HeaderItem from "../ui/HeaderItem";
function GameLayout({ onExit }) {
  return (
    <div>
      <Header>
        <HeaderItem func={onExit}>←</HeaderItem>
        <HeaderItem func={() => {}}>Points: 25</HeaderItem>

        <HeaderItem func={() => {}}>❤️ ❤️ ❤️</HeaderItem>
      </Header>
      <GameArea onExit={onExit} />
    </div>
  );
}

export default GameLayout;
