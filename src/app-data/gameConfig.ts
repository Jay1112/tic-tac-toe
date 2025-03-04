export interface GameOptionItem {
  id: any;
  name: string;
  value: number;
}

export interface TokenOptionItem {
  id: any;
  name: string;
  value: string;
  icon: string;
}

interface GameConfigType {
  gridOptions: GameOptionItem[];
  tokenOptions: TokenOptionItem[];
}

export const GameConfig: GameConfigType = {
  gridOptions: [
    {
      id: 1,
      name: "3 x 3",
      value: 3,
    },
    {
      id: 2,
      name: "4 x 4",
      value: 4,
    },
    {
      id: 3,
      name: "5 x 5",
      value: 5,
    },
    {
      id: 4,
      name: "6 x 6",
      value: 6,
    },
  ],
  tokenOptions: [
    {
      id: 1,
      name: "Cross",
      value: "times",
      icon: "times",
    },
    {
      id: 2,
      name: "Circle",
      value: "circle",
      icon: "circle",
    },
  ],
};
