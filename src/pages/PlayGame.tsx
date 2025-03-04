import React, { useCallback, useMemo, useState } from "react";
import Container from "../components/app/Container";
import ScreenHeader from "../components/app/ScreenHeader";
import {
  GameConfig,
  GameOptionItem,
  TokenOptionItem,
} from "../app-data/gameConfig";
import GridOption from "../components/app/GridOption";
import TokenOption from "../components/app/TokenOption";
import Button from "../components/ui/Button";
import Board from "../components/app/Board";

const PlayGame: React.FC = () => {
  // data
  const gridOptions: GameOptionItem[] = useMemo(
    () => GameConfig.gridOptions,
    []
  );
  const tokenOptions: TokenOptionItem[] = useMemo(
    () => GameConfig.tokenOptions,
    []
  );

  // state
  const [gridSize, setGridSize] = useState<number>(
    GameConfig.gridOptions[0].value
  );
  const [token, setToken] = useState<string>(GameConfig.tokenOptions[0].value);
  const [isPlaying, setPlaying] = useState(false);

  // handlers
  const handleGridSize = useCallback((value: number) => {
    setGridSize(value);
  }, []);

  const handleToken = useCallback((value: string) => {
    setToken(value);
  }, []);

  return (
    <Container className="p-2 fade-in-up h-full flex flex-col items-start justify-start">
      <ScreenHeader
        link="/"
        title={isPlaying ? "Game Board" : "Game Configuration"}
      />
      {!isPlaying && (
        <>
          <div className="mt-16 grid grid-cols-2 md:grid-cols-2 gap-4 w-4/5 mx-auto">
            {gridOptions.map((item) => {
              return (
                <GridOption
                  key={item.id}
                  gridItem={item}
                  selected={item.value === gridSize}
                  callback={handleGridSize}
                />
              );
            })}
          </div>
          <div className="mt-16 flex gap-4 w-4/5 mx-auto justify-center">
            {tokenOptions.map((item) => {
              return (
                <TokenOption
                  key={item.id}
                  tokenItem={item}
                  selected={item.value === token}
                  callback={handleToken}
                />
              );
            })}
          </div>
          <div className="mt-16 w-4/5 mx-auto">
            <Button
              onClick={() => setPlaying(true)}
              className="w-full border-2 border-indigo-600 text-2xl py-2 rounded-sm text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold transition-all duration-300"
            >
              Play Game
            </Button>
          </div>
        </>
      )}
      {isPlaying && <Board GRID_SIZE={gridSize} token={token} />}
    </Container>
  );
};

export default PlayGame;
