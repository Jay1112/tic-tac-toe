export interface MenuItem {
  id: string;
  title: string;
  icon: string;
  link: string;
  style?: string;
}

export const menuList: MenuItem[] = [
  {
    id: "play-game",
    title: "Play Game",
    icon: "play-circle",
    link: "/play-game/",
    style: "dark-class transition-all duration-300 hover:scale-[1.01]",
  },
  {
    id: "game-history",
    title: "Game History",
    icon: "chart-bar",
    link: "/game-history/",
    style: "dark-class transition-all duration-300 hover:scale-[1.01]",
  },
  {
    id: "settings",
    title: "Settings",
    icon: "cog",
    link: "/settings/",
    style: "dark-class transition-all duration-300 hover:scale-[1.01]",
  },
];
