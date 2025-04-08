import React, { useState } from 'react';
import axios from 'axios';

// TODO replace this with the argo-tools Application object?
interface Application {
  metadata: {
    name: string;
  };
  spec: {
    syncPolicy?: {
      automated?: {
        enabled?: boolean;
      };
    };
  };
}

interface ResourceExtensionProps {
  application: Application;
}

const DisableAutoSyncTab: React.FC<ResourceExtensionProps> = ({ application }) => {
  const appName = application.metadata.name;
  const [loading, setLoading] = useState(false);

  const autoSyncEnabled =
    !!application.spec.syncPolicy?.automated &&
    application.spec.syncPolicy.automated.enabled !== false;

  const disableAutoSync = async () => {
    setLoading(true);

    const patchPayload = application.spec.syncPolicy?.automated?.enabled !== undefined
      ? { spec: { syncPolicy: { automated: { enabled: false } } } }
      : { spec: { syncPolicy: {} } };

    try {
      await axios.patch(
        `${window.location.origin}/api/v1/applications/${appName}`,
        {
          name: appName,
          patch: JSON.stringify(patchPayload),
          patchType: 'merge',
        },
        {
          withCredentials: true,
          headers: { 'Content-Type': 'application/json' },
        }
      );

      alert(`Auto-sync disabled for ${appName}`);
      // Optionally: trigger a refresh or update local state
    } catch (err: any) {
      console.error('Failed to disable auto-sync', err);
      alert(`Error disabling auto-sync: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '10px' }}>
      <p>
        {autoSyncEnabled
          ? 'Auto-Sync is currently ENABLED for this application.'
          : 'Auto-Sync is already DISABLED.'}
      </p>
      <button
        onClick={disableAutoSync}
        disabled={loading || !autoSyncEnabled}
        className="argo-button argo-button--base"
      >
        {loading ? 'Disabling...' : 'Disable Auto-Sync'}
      </button>
    </div>
  );
};

// Register the extension
(window as any).extensionsAPI.registerResourceExtension(
  DisableAutoSyncTab,
  'argoproj.io',
  'Application',
  'Auto-Sync Control'
);
