function Pet({ position }) {
  return (
    <div
      style={{
        left: position + "px",
      }}
      className="pet"
    >
      😻
    </div>
  );
}

export default Pet;
