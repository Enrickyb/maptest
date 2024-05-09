import React, { useState } from "react";
import "./TabNavigation.css";
const TabNavigation = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <div className="tab-navigation">
      <div className="tabs">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={`tab ${index === activeTab ? "active" : ""}`}
            onClick={() => handleTabClick(index)}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className="divider"></div>
      <div className="tab-content">{tabs[activeTab].content}</div>
    </div>
  );
};

export default TabNavigation;
