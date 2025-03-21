import React from "react";
import Container from "../components/app/Container";
import MenuList from "../components/app/MenuList";

const HomePage: React.FC = () => {
  return (
    <Container className="p-2 fade-in-up h-full flex items-center justify-center flex-col">
      <div className="flex items-center justify-center flex-col bg-[#000] w-[100px] h-[100px] text-white p-2 rounded-full">
        <p>
          <i className="pi pi-th-large text-5xl"></i>
        </p>
      </div>
      <MenuList />
    </Container>
  );
};

export default HomePage;
