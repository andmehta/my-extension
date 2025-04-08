import React from 'react';
import LatticeTab, { Application } from './latticeTab';

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

(window as any).extensionsAPI.registerTopBarActionMenuExt(
  () => React.createElement("div", {}, "Click me"),
  "Simple Button",
  "simple_button",
  () => React.createElement("div", {}, "Flyout Works"),
  () => true,
  "",
  false
);

const shouldDisplay = (_application: Application) => true;

// Flyout content
const FlyoutComponent = () => (
  <div style={{ padding: '10px' }}>This is a flyout</div>
);

// Button on the toolbar
const ToolbarButton = () => (
  <div style={{ cursor: 'pointer', padding: '5px 10px' }}>
    Toolbar Extension Test
  </div>
);

console.log("Registering TopBarActionMenuExt...");

(window as any).extensionsAPI.registerTopBarActionMenuExt(
  ToolbarButton,
  'Toolbar Extension Test',
  'toolbar_extension_test',
  FlyoutComponent,
  shouldDisplay,
  'Test tooltip for toolbar button',
  false
);