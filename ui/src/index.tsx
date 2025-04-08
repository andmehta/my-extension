import React from 'react';
import LatticeTab from './latticeTab';

// Register the extensions 1 at a time
(window as any).extensionsAPI.registerResourceExtension(
  LatticeTab,
  'argoproj.io',
  'Application',
  'Auto-Sync Control'
);

((window) => {
  const component = () => {
    return React.createElement(
      "div",
      { style: { padding: "10px" } },
      "Hello World"
    );
  };
  (window as any).extensionsAPI.registerSystemLevelExtension(
    component,
    "Test Ext",
    "/hello",
    "fa-flask"
  );
})(window);