import React from "react";
import { MenuItem } from "../../app-data/menuList";
import clsx from "clsx";

interface AppMenuItemProps {
  menudata: MenuItem;
  callback: (link: string) => void;
}

const AppMenuItem: React.FC<AppMenuItemProps> = ({ menudata, callback }) => {
  return (
    <p
      key={menudata.id}
      className={clsx(
        "px-8 py-4 flex items-stretch justify-center rounded-md my-6",
        menudata?.style ? menudata?.style : ""
      )}
      onClick={() => callback(menudata.link)}
    >
      <span className="inline-block flex items-center justify-center text-2xl">
        <i className={`pi pi-${menudata.icon}`}></i>
      </span>
      <span className="inline-block flex-1 text-2xl font-semibold px-4">
        {menudata.title}
      </span>
    </p>
  );
};

export default AppMenuItem;
