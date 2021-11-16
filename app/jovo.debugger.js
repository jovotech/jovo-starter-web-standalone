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
          theme: 'light',
        },
      },
    },
    {
      label: 'Dark Theme',
      input: {
        intent: 'SwitchThemeIntent',
        entities: {
          theme: 'dark',
        },
      },
    },
    // ...
  ],
});

module.exports = debuggerConfig;
