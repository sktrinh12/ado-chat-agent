import React, { FC } from "react";

interface TabsProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: string[];
}

const Tabs: FC<TabsProps> = ({ activeTab, setActiveTab, tabs }) => {
  return (
    <div
      style={{
        display: "flex",
        borderBottom: "2px solid #ccc",
        marginBottom: "10px",
      }}
    >
      {tabs.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <div
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              cursor: "pointer",
              padding: "8px 16px",
              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px",
              border: isActive ? "2px solid #007bff" : "2px solid transparent",
              borderBottom: isActive
                ? "2px solid white"
                : "2px solid transparent",
              marginRight: "4px",
              backgroundColor: isActive ? "white" : "#f1f1f1",
              fontWeight: isActive ? "bold" : "normal",
              color: isActive ? "#007bff" : "#555",
              transition: "all 0.2s",
            }}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
