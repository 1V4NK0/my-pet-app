import { usePet } from "../hooks/usePet";
import HeaderItem from "./HeaderItem";

function Header() {
  const { pet, isLoading } = usePet();

  return (
    <div className="header-container">
      <HeaderItem func={() => console.log("adding money...")}>
        {isLoading ? "Loading.." : `${pet.balance}$`}
      </HeaderItem>
      <HeaderItem func={() => console.log("accessing profile...")}>
        {isLoading ? "Loading.." : `${pet.owner_name} 🧑`}
      </HeaderItem>
    </div>
  );
}

export default Header;
