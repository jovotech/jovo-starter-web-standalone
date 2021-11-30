const { DebuggerConfig } = require('@jovotech/plugin-debugger');

const debuggerConfig = new DebuggerConfig({
  locales: ['en'],
  buttons: [
    {
      label: 'LAUNCH',
      input: {
        type: 'LAUNCH',
      },
    },
    {
      label: 'Light Theme',
      input: {
        intent: 'SwitchThemeIntent',
        entities: {
          theme: {
            resolved: 'light',
            id: 'light',
            value: 'light',
          },
        },
      },
    },
    {
      label: 'Dark Theme',
      input: {
        intent: 'SwitchThemeIntent',
        entities: {
          theme: {
            resolved: 'dark',
            id: 'dark',
            value: 'dark',
          },
        },
      },
    },
    // ...
  ],
});

module.exports = debuggerConfig;
