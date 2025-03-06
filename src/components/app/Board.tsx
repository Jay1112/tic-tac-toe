import React, { useMemo, useRef, useState } from "react";
import { generateBoard } from "../../utils/cellSizeUtiity";
import { checkWinner } from "../../utils/checkWinner";
import clsx from "clsx";
import Button from "../ui/Button";
import Cell from "./Cell";
import { MatchItem, db } from "../../services/StorageService";

interface BoardProps {
  GRID_SIZE: number;
  token: string;
}

const Board: React.FC<BoardProps> = ({ GRID_SIZE, token }) => {
  const [board, setBoard] = useState(generateBoard(GRID_SIZE));
  const initialToken = useMemo(() => token, []);
  const turnRef = useRef(token);
  const status = useRef("Current Turn");
  const winnerRef = useRef("");
  const storageRef = useRef<MatchItem[]>([]);
  const gameId = useRef<string>(new Date().getTime().toString());

  const handleResetGame = () => {
    turnRef.current = initialToken;
    status.current = "Current Turn";
    winnerRef.current = "";
    const updatedBoard = generateBoard(GRID_SIZE);
    setBoard(updatedBoard);
    storageRef.current = [];
  };

  const handleCellClicked = (x: number, y: number) => {
    const value = board[x][y];
    if (value || winnerRef.current) {
      return;
    }
    let updated = JSON.parse(JSON.stringify(board));
    updated[x][y] = turnRef.current;

    setBoard(updated);
    storageRef.current.push({
      x,
      y,
      turn: turnRef.current,
      color: turnRef.current === initialToken ? "bg-red-500" : "bg-green-500",
      gameId: gameId.current,
    });

    const winner = checkWinner(updated, GRID_SIZE);
    if (winner === "draw") {
      status.current = "Match Draw";
      turnRef.current = "";
      winnerRef.current = winner;
      db.addMatch(storageRef.current);
      db.addGame({
        gameId: gameId.current,
        winner: "draw",
      });
      return;
    } else if (winner) {
      status.current = "Winner";
      winnerRef.current = winner;
      db.addMatch(storageRef.current);
      db.addGame({
        gameId: gameId.current,
        winner,
      });
      return;
    }

    turnRef.current = turnRef.current === "times" ? "circle" : "times";
  };

  return (
    <>
      <div
        className="mx-auto my-8 fade-in-up"
        style={{
          display: "grid",
          gridTemplateRows: `repeat(${GRID_SIZE},1fr)`,
          gridTemplateColumns: `repeat(${GRID_SIZE},1fr)`,
          gap: "0.5rem",
        }}
      >
        {board.map((row: any, xc: number) => {
          return (
            <React.Fragment key={xc}>
              {row.map((cell: any, yc: number) => {
                return (
                  <Cell
                    key={`${xc}-${yc}`}
                    xc={xc}
                    yc={yc}
                    GRID_SIZE={GRID_SIZE}
                    cell={cell}
                    initialToken={initialToken}
                    callback={handleCellClicked}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
      <div
        className={
          "w-full h-full flex flex-col items-center justify-center fade-in-up transition-all duration-300"
        }
      >
        <div
          className={clsx(
            "flex items-center justify-center flex-col rounded-md p-4 ",
            winnerRef.current ? "bg-indigo-600 text-white" : ""
          )}
        >
          {winnerRef.current !== "draw" && (
            <p className="w-full text-center">
              <i className={`pi pi-${turnRef.current} text-6xl`}></i>
            </p>
          )}
          <p
            className={clsx(
              "font-semibold",
              winnerRef.current !== "draw" && "mt-2"
            )}
          >
            {status.current}
          </p>
        </div>
        {winnerRef.current && (
          <Button
            onClick={handleResetGame}
            className="border-2 border-indigo-600 text-lg p-2 my-6 rounded-sm text-indigo-600 hover:bg-indigo-600 hover:text-white font-semibold transition-all duration-300"
          >
            Reset Game
          </Button>
        )}
      </div>
    </>
  );
};

export default Board;
