import { container } from "../mainStyles.js";

const headerStyle = () => ({
  logoHeight: {
    height: "3rem"
  },
  appBar: {
    backgroundColor: "#FFFFFF",
    boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.1)",
    paddingTop: "5px",
    zIndex: "1029",
    padding: "10px 0",
    paddingRight: "0px !important"
  },
  container: {
    ...container,
    minHeight: "50px"
  }
});

export default headerStyle;
