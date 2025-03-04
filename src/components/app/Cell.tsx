import React, { useMemo } from "react";
import { getSizeOfCellBasedOnGrid } from "../../utils/cellSizeUtiity";
import clsx from "clsx";

interface CellProps {
  GRID_SIZE: number;
  cell: string;
  initialToken: string;
  callback: (xc: number, yc: number) => void;
  xc: number;
  yc: number;
}

const Cell: React.FC<CellProps> = ({
  GRID_SIZE,
  cell,
  initialToken,
  callback = () => {},
  xc,
  yc,
}) => {
  const dimension = useMemo(() => getSizeOfCellBasedOnGrid(GRID_SIZE), []);

  return (
    <React.Fragment>
      <span
        className={clsx(
          `inline-block border-2 border-[#000] flex items-center justify-center cursor-pointer `,
          cell
            ? cell === initialToken
              ? "bg-red-500"
              : "bg-green-500"
            : "hover:bg-indigo-300"
        )}
        style={{
          width: `${dimension}px`,
          height: `${dimension}px`,
        }}
        onClick={() => callback(xc, yc)}
      >
        {cell && (
          <i
            className={`pi pi-${cell}`}
            style={{ fontSize: `${dimension - 25}px` }}
          ></i>
        )}
      </span>
    </React.Fragment>
  );
};

export default Cell;
