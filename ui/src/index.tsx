import React from 'react';
import LatticeTab from './latticeTab';

// Register the extensions 1 at a time
const statusPanelComponent = () => {
  return React.createElement(
    "div",
    { style: { padding: "10px" } },
    "Hello World from Lattice Component"
  );
};

(window as any).extensionsAPI.registerResourceExtension(
  LatticeTab,
  'argoproj.io',
  'Application',
  'Auto-Sync Control'
);

(window as any).extensionsAPI.registerStatusPanelExtension(
  statusPanelComponent,
  "Lattice Top Button",
  "lattice_top-button",
);

const shouldDisplay = () => {
  return true;
};
const flyout = () => {
  return React.createElement(
          "div",
          { style: { padding: "10px" } },
          "This is a flyout"
  );
};
const component = () => {
  return React.createElement(
          "div",
          {
            onClick: () => flyout()
          },
          "Toolbar Extension Test"
  );
};
(window as any).extensionsAPI.registerTopBarActionMenuExt(
        component,
        "Toolbar Extension Test",
        "Toolbar_Extension_Test",
        flyout,
        shouldDisplay,
        '',
        true
);