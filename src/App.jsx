import { useMemo, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useWindowAI } from "window-ai-react";
import Chat from "./Chat";
import RawDemo from "./RawDemo";

function App() {
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: 50 }}>
      <Chat />
      <RawDemo />
    </div>
  );
}

export default App;
