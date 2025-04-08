import React from 'react';
import LatticeTab, { Application } from './latticeTab';

// Register the extensions 1 at a time
const statusPanelComponent = () => {
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
  statusPanelComponent,
  "Lattice Top Button",
  "lattice_top-button",
);

const flyout = () => {
  return React.createElement(
          "div",
          { style: { padding: "10px" } },
          "This is a flyout"
  );
};
const topBarActionMenuExtComponent = () => {
  return React.createElement(
          "div",
          {
            onClick: () => flyout()
          },
          "Toolbar Extension Test"
  );
};

const shouldDisplay = (app?: Application) => {
  return !!app;
};

(window as any).extensionsAPI.registerTopBarActionMenuExt(
  topBarActionMenuExtComponent,
  "Lattice Auto-Sync disable",
  "lattice_auto-sync-disable",
  flyout,
  shouldDisplay,
  "fa fa-sync",
)