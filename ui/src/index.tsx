// I get an error on build when I have this import, but I get eslint errors in the editor when I don't... probably fixable. Worth investigating
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

const shouldDisplay = (_application: Application) => true;

// Flyout content
const FlyoutComponent = () => (
  <div style={{ padding: '10px' }}>This is a flyout</div>
);

// Button on the toolbar
const ToolbarButton = () => (
  <div style={{ cursor: 'pointer', padding: '1px' }}>
    Lattice
  </div>
);

(window as any).extensionsAPI.registerTopBarActionMenuExt(
  ToolbarButton,
  'Lattice Toolbar',
  'toolbar_extension',
  FlyoutComponent,
  shouldDisplay,
  'fa fa-cog',
  true
);