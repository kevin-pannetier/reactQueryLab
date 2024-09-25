import React from "react";

type TwoColumnsLayoutProps = {
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
};

export const TwoColumnsLayout = ({
  leftContent,
  rightContent,
}: TwoColumnsLayoutProps) => {
  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <div className="flex flex-1 p-6 h-full">
        {/* Left side (3/4 of the page), make it scrollable */}
        <div className="w-3/4 bg-white p-6 rounded-lg shadow-md overflow-auto h-full">
          <header className="bg-blue-600 text-white p-4">
            <h1 className="text-2xl">TanStack Query Lab</h1>
          </header>
          {leftContent}
        </div>

        {/* Right side (1/4 of the page), make it scrollable */}
        <div className="w-1/4 bg-white p-6 rounded-lg shadow-md overflow-auto h-full ml-6">
          {rightContent}
        </div>
      </div>
    </div>
  );
};
