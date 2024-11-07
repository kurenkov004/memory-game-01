import { createRoot } from "react-dom/client";
import App  from "./App";

import './index.scss';

const MemoryGame = () => {
  return (
    <div className="memory-game">
      <App />
    </div>
  );
};

// Finds the root of the app
const container = document.querySelector("#root");
const root = createRoot(container);
// Tells React to render the app in the root DOM element
root.render(<MemoryGame />)