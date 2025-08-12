function HeaderItem({ children, func }) {
  //IN FUTURE MAY ACCEPT ICON AND CALLBACK FUNC
  return (
    <button className="header-item" onClick={() => func()}>
      {children}
    </button>
  );
}

export default HeaderItem;
