import React, { useEffect, useState } from "react";
import { db } from "../../services/StorageService";
import clsx from "clsx";
import HistoryBoard from "./HistoryBoard";

export interface GameCardItem {
  winner: string;
  gameId: string;
  gridSize : number;
  initialToken : string;
}

interface GameCardProps {
  game: GameCardItem;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [toggle, setToggle] = useState<Boolean>(false);
  const [stepList, setStepList] = useState<any>([]);

  useEffect(() => {
    if (toggle) {
      db.getStepsForGameId(game.gameId).then((data) => setStepList(data));
    } else {
      setStepList([]);
    }
  }, [toggle]);

  return (
    <div className="border-2 border-slate-800 p-2 rounded-lg my-2.5">
      <div className="flex">
        <div className="flex-1">
          <p>
            <span className="inline-block w-[100px] font-bold">Game Id </span>
            <span>{game.gameId}</span>
          </p>
          <p>
            <span className="inline-block w-[100px] font-bold mt-1.5">
              Winner
            </span>
            <span>
              {game.winner === "times" || game.winner === "circle" ? (
                <i
                  className={`pi pi-${game.winner} font-bold text-green-600`}
                ></i>
              ) : (
                "None"
              )}
            </span>
          </p>
        </div>
        <div className="flex items-center justify-center">
          <div
            className="w-[2.5rem] h-[2.5rem] flex items-center justify-center rounded-full bg-[#000] text-white cursor-pointer"
            onClick={() => setToggle(!toggle)}
          >
            <i
              className={`pi pi-play transition-all duration-300 ${
                toggle ? "rotate-90" : ""
              }`}
            ></i>
          </div>
        </div>
      </div>
      <div
        className={clsx(
          "transition-all duration-300 overflow-hidden flex items-center justify-center",
          toggle ? "max-h-[500px]" : "max-h-0"
        )}
      >
        { toggle && stepList && stepList.length > 0 && <HistoryBoard GRID_SIZE={game.gridSize} token={game.initialToken} stepList={stepList}  />}
      </div>
    </div>
  );
};

export default GameCard;
