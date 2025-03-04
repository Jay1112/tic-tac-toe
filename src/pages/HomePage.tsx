import React from "react";
import Container from "../components/app/Container";
import MenuList from "../components/app/MenuList";

const HomePage: React.FC = () => {
  return (
    <Container className="p-2 fade-in-up h-full flex items-center justify-center">
      <MenuList />
    </Container>
  );
};

export default HomePage;
