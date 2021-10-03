import React from "react";
import "./App.css";
import classNames from "classnames";
import { makeStyles } from "@material-ui/core/styles";
import styles from "./assets/styles/components/app";
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { WeatherScreen } from "./views/WeatherScreen";
import { Navbar } from "./components";
let ps;
const useStyles = makeStyles(styles);

function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const mainPanel = React.createRef();
  const classes = useStyles();

  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    } else {
      setMobileOpen(true);
    }
  };

  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);

  const containerClasses = classNames({
    [classes.container]: !mobileOpen,
    [classes.mobileContainer]: mobileOpen
  });

  return (
    <div className="App">
      <React.Fragment>
        <div ref={mainPanel}>
          <Navbar />
          <div className={classes.content}>
            <div className={containerClasses}>
              <WeatherScreen />
            </div>
          </div>
        </div>
      </React.Fragment>
    </div>
  );
}

export default App;
