import React, { useCallback, useMemo } from "react";
import { menuList } from "../../app-data/menuList";
import AppMenuItem from "./MenuItem";
import { useNavigate } from "react-router-dom";

const MenuList: React.FC = () => {
  const navigate = useNavigate();
  const menuArr = useMemo(() => menuList, []);

  const handleMenuClick = useCallback((link: string) => {
    navigate(link);
  }, []);

  return (
    <div className="w-full">
      {menuArr.map((menu) => {
        return (
          <AppMenuItem
            key={menu.id}
            menudata={menu}
            callback={handleMenuClick}
          />
        );
      })}
    </div>
  );
};

export default MenuList;
