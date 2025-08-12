import { useFeed } from "../hooks/useFeed";
import { usePlay } from "../hooks/usePlay";
import { useRest } from "../hooks/useRest";
import ActionItem from "./ActionItem";
function ActionsContainer() {
  const { isResting, rest } = useRest();
  const { isPlaying, playWithPet } = usePlay();
  const { isFeeding, feed } = useFeed();
  return (
    <div className="actions-container">
      <ActionItem name="feed" func={() => feed()} disabled={isFeeding} />
      <ActionItem name="play" func={() => playWithPet()} disabled={isPlaying} />
      <ActionItem name="rest" func={() => rest()} disabled={isResting} />
    </div>
  );
}
export default ActionsContainer;
