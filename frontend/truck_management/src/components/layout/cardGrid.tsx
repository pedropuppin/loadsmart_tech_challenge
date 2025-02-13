import React from "react";

interface CardGridProps {
  children: React.ReactNode;
  cols?: string;
}

const CardGrid: React.FC<CardGridProps> = ({ children, cols = "grid-cols-1 md:grid-cols-3 lg:grid-cols-4" }) => {
  return (
    <div className={`grid ${cols} gap-5 mt-5`}>
      {children}
    </div>
  );
};

export default CardGrid;