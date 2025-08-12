function ActionItem({ name, func }) {
  // THE COMPONENT ACCEPTS: ACTION NAME, ICON, CALLBACK FUNCTION
  return (
    <button className="action-button" onClick={() => func()}>
      {name}
    </button>
  );
}
export default ActionItem;
