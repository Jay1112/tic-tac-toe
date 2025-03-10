import React, { useEffect, useMemo, useRef, useState } from "react";
import { generateBoard } from "../../utils/cellSizeUtiity";
import Cell from "./Cell";
import { MatchItem } from "../../services/StorageService";

interface HistoryBoardProps {
  GRID_SIZE: number;
  token: string;
  stepList: MatchItem[];
}

const HistoryBoard: React.FC<HistoryBoardProps> = ({
  GRID_SIZE,
  token,
  stepList = [],
}) => {
  const [board, setBoard] = useState(generateBoard(GRID_SIZE));
  const initialToken = useMemo(() => token, []);
  const turnRef = useRef(token);
  const timersRef: any = useRef([]);
  const INITIAL_DELAY = useMemo(() => 1000, []);

  useEffect(() => {
    stepList.forEach((element: MatchItem, index: number) => {
      timersRef.current[index] = setTimeout(() => {
        const { x, y, turn } = element;
        setBoard((prev: any) => {
          let updated = JSON.parse(JSON.stringify(prev));
          updated[x][y] = turn;
          turnRef.current = turnRef.current === "times" ? "circle" : "times";
          return updated;
        });
      }, INITIAL_DELAY * (index + 1));
    });

    return () => {
      if (timersRef.current.length > 0) {
        timersRef.current.forEach((item: any) => {
          clearTimeout(item);
        });
        timersRef.current = [];
      }
    };
  }, []);

  return (
    <>
      <div
        className="inline-block mx-auto my-4"
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
                    callback={() => {}}
                  />
                );
              })}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

export default HistoryBoard;
