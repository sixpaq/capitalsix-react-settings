# React Settings

This module provides a React context that loads settings from
server-side before starting the application. Once the settings
are loaded the app starts and the settings are available for
every subscriber.

The main advantage of this approacht is that settings can be
defined at deployment stage and not at build stage. In a CI/CD
setup with multiple environments it is no longer necessary to
have different builds per environment. One build for all and
different settings per environment is prefered.

This is especially usefull for settings that would otherwise
have been embedded in the code, like api url's.

## Settings file
Any file or api call will do as long as the result is JSON.
The default filename, if none is provided, is "/settings.json".

The module will try to retrieve these settings and on success
it will start the application where the settings will be available to any component.

## Usage

``` c#
const PreloadApp = () => (
  <SettingsProvider filename="/settings.json">
    <App />
  </SettingsProvider>
);

export default PreloadApp;
```

## Getting the settings
If you need any setting from your deployed settings, you can
use the higher order component withSettings. This component
will provide the settings object from the retrieved settings
and provide it as a property to your component.

### Example

*settings.json*:
```Json
{
  "deployedEnvironment": "Production",
  "apiUrl": "https://myserver.com/api"
}
```

*MyComponent.jsx:*
```javascript
const MyComponent = ({ settings }) => {
  const { deployedEnvironment } = settings;

  return (
    <div>
      {deployedEnvironment}
    </div>
  );
}

export default withSettings(MyComponent);
```