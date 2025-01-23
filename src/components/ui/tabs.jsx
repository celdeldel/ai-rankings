import React, { useState } from 'react';

export const Tabs = ({ children, defaultValue }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  
  return (
    <div className="tabs" data-active={activeTab}>
      {React.Children.map(children, child => {
        if (!child) return null;
        return React.cloneElement(child, { activeTab, setActiveTab });
      })}
    </div>
  );
};

export const TabsList = ({ children, className = '' }) => (
  <div className={`flex border-b ${className}`}>
    {children}
  </div>
);

export const TabsTrigger = ({ children, value, activeTab, setActiveTab, className = '' }) => (
  <button 
    className={`px-4 py-2 ${activeTab === value ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-600'} ${className}`}
    onClick={() => setActiveTab(value)}
  >
    {children}
  </button>
);

export const TabsContent = ({ children, value, activeTab }) => {
  if (value !== activeTab) return null;
  return <div>{children}</div>;
};