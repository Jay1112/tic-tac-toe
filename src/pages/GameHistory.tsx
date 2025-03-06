import React, { useEffect, useState } from "react";
import Container from "../components/app/Container";
import ScreenHeader from "../components/app/ScreenHeader";
import { db } from "../services/StorageService";
import Spinner from "../components/ui/Spinner";
import GameCard from "../components/app/GameCard";
import { GameCardItem } from "../components/app/GameCard";

const GameHistory: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [gameList, setGameList] = useState<GameCardItem[]>([]);

  useEffect(() => {
    db.getGames()
      .then((data: any) => setGameList(data))
      .catch((error: any) => {
        console.log(error);
        setGameList([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <Container className="p-2 fade-in-up h-full flex flex-col items-start justify-start">
      <ScreenHeader link="/" title="Game History" />
      {loading && (
        <div className="w-full flex items-center justify-center py-4">
          <Spinner />
        </div>
      )}
      {!loading && gameList?.length > 0 && (
        <div className="w-full my-4 overflow-y-auto">
          {gameList.map((game: GameCardItem) => {
            return <GameCard key={game.gameId} game={game} />;
          })}
        </div>
      )}
      {!loading && gameList?.length === 0 && (
        <div className="w-full my-4 overflow-y-auto text-center">
          No Data 
        </div>
      )}
    </Container>
  );
};

export default GameHistory;
