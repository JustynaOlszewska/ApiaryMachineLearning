// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
// import React from "react";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes.tsx";
import "./App.css";

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
