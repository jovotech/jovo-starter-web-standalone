import { App } from 'jovo-framework';
import { WebPlatform } from 'jovo-platform-web';
import { ActionType } from 'jovo-platform-core';
import { FileDb } from 'jovo-db-filedb';
import { NlpjsNlu } from 'jovo-nlu-nlpjs';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const app = new App();

const webPlatform = new WebPlatform();
webPlatform.use(
  new NlpjsNlu(),
);

app.use(webPlatform, new FileDb());



// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
  LAUNCH() {
    return this.ask('Hold the microphone button and try to change the background color to blue.');
  },

  SwitchThemeIntent() {
    const theme = this.$inputs.theme?.key;

    if (theme !== 'dark' && theme !== 'light') {
      return this.tell('You can switch to either light or dark mode by saying "switch to dark mode" or "switch to light mode".');
    }

    this.$webApp?.addActions([
      {
        type: ActionType.Custom,
        command: 'set-theme',
        value: theme,
      },
    ]);
    return this.tell(`Alright, I am switching to ${theme} mode.`);
  },

  Unhandled() {
    return this.tell('You can switch to either light or dark mode by saying "switch to dark mode" or "switch to light mode."');
  }
});

export { app };
