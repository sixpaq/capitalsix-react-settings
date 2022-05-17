import React, { useState, useEffect } from 'react';

const SettingsContext = React.createContext({});

export const SettingsConsumer = SettingsContext.Consumer;

export const SettingsProvider = ({ filename, children }) => {
  const [settings, setSettings] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(filename || '/settings.json')
      .then(
        response => response.json(),
        (e) => { console.error('Loading settings failed', e); })
      .then(settings => {
        setSettings(settings);
        setLoading(false);
      });
  }, [setSettings, setLoading]);

  if (loading) return null;

  return (
    <SettingsContext.Provider value={settings}>
      {children}
    </SettingsContext.Provider>
  );
};

export function withSettings(WrappedComponent) {
  return (props) => (
    <SettingsConsumer>
      {(settings) => <WrappedComponent settings={settings} {...props} />}
    </SettingsConsumer>
  );
};
