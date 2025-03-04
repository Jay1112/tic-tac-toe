import React from "react";
import { TokenOptionItem } from "../../app-data/gameConfig";
import clsx from "clsx";

interface TokenOptionProps {
  tokenItem: TokenOptionItem;
  selected: boolean;
  callback: (value: string) => void;
}

const TokenOption: React.FC<TokenOptionProps> = ({
  tokenItem,
  selected,
  callback,
}) => {
  return (
    <div
      className={clsx(
        "text-center px-4 py-2 rounded-sm border-2 font-semibold",
        selected
          ? "border-indigo-600 bg-indigo-600 text-white"
          : "invert-dark-class"
      )}
      onClick={() => callback(tokenItem.value)}
    >
      <p className="text-7xl">
        <i className={`pi pi-${tokenItem.icon}`}></i>
      </p>
      <p className="mt-2">{tokenItem.name}</p>
    </div>
  );
};

export default TokenOption;
