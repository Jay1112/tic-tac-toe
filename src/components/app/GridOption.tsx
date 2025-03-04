import React from "react";
import { GameOptionItem } from "../../app-data/gameConfig";
import clsx from "clsx";

interface GridOptionProps {
  gridItem: GameOptionItem;
  selected: boolean;
  callback: (value: number) => void;
}

const GridOption: React.FC<GridOptionProps> = ({
  gridItem,
  selected,
  callback,
}) => {
  return (
    <div
      className={clsx(
        "flex-1 text-center py-2 rounded-sm border-2 font-semibold",
        selected ? "border-indigo-600 bg-indigo-600 text-white" : "invert-dark-class"
      )}
      onClick={() => callback(gridItem.value)}
    >
      {gridItem.name}
    </div>
  );
};

export default GridOption;
