import React from 'react';
import LatticeTab from './latticeTab';

// Register the extensions 1 at a time
const component = () => {
  return React.createElement(
    "div",
    { style: { padding: "10px" } },
    "Hello World"
  );
};
(window as any).extensionsAPI.registerResourceExtension(
  LatticeTab,
  'argoproj.io',
  'Application',
  'Auto-Sync Control'
);

// can create our own flyout widget too with an optional 4th param. 
// But could probably just make this a button
(window as any).extensionsAPI.registerStatusPanelExtension(
  component,
  "Lattice Top Button",
  "lattice_top-button",
);
