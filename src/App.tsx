import react, { useEffect } from "react";

// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import "./App.css";

const App = () => {
  useEffect(() => {
    console.log("router", router);
  }, []);

  return <RouterProvider router={router} />;
};

export default App;
