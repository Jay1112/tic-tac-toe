import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import PlayGame from "./pages/PlayGame";
import { useEffect } from "react";
import { db } from "./services/StorageService";
import GameHistory from "./pages/GameHistory";

function App() {

  useEffect(()=>{
    db.init();
  },[])

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/play-game/" element={<PlayGame />} />
        <Route path="/game-history/" element={<GameHistory />} />
      </Routes>
    </>
  );
}

export default App;
