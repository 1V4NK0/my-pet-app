import ActionsContainer from "./ActionsContainer";
function Footer() {
  // KINDA USELESS AS IT'S JUST A WRAPPER TO MAKE IT SORT OF ORGANISED AND CLEAN:
  // HEADER -> BODY -> FOOTER
  // WILL JUST HAVE AN ACTIONS CONTAINER
  return (
    <div className="footer-container">
      <ActionsContainer />
    </div>
  );
}
export default Footer;
