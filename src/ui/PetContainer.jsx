import "../index.css";

function Pet({ frameIndex }) {
  const frameSize = 32;
  const backgroundPosition = `-${frameIndex * frameSize}px 0px`;

  const style = {
    backgroundImage: "url(/Idle.png)",
    // make sure Idle.png is in the public folder
    backgroundPosition: backgroundPosition,
  };

  return <div className="pet-sprite" style={style} />;
}

function NameTag({ name }) {
  return <div className="pet-name">{name}</div>;
}

function PetContainer({ name, frameIndex }) {
  return (
    <div className="pet-container">
      <NameTag name={name} />
      <Pet frameIndex={frameIndex} />
    </div>
  );
}

export default PetContainer;
