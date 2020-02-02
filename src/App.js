import React from "react";
import HelloBootstrap from "./components/HelloBootstrap";
import HelloNavbar from "./components/HelloNavbar";
import HelloFooter from "./components/HelloFooter";
import "./styles/root.css";

function App() {
  return (
    <div id="containerwrapper">
      <HelloNavbar />
      <HelloBootstrap />
      <HelloFooter />
    </div>
  );
}

export default App;
