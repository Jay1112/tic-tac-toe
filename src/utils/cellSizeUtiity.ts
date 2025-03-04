export const generateBoard = (size: number) => {
  return Array.from({ length: size }, () => new Array(size).fill(""));
};

export const getSizeOfCellBasedOnGrid: (grid: number) => number = (
  grid: number
) => {
  switch (grid) {
    case 3:
      return 100;
    case 4:
      return 70;
    case 5:
      return 60;
    case 6:
      return 50;
  }
  return 50;
};
