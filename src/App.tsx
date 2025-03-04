import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlayGame from "./pages/PlayGame";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play-game/" element={<PlayGame />} />
      </Routes>
    </>
  );
}

export default App;
