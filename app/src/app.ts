import { App } from 'jovo-framework';
import { WebPlatform } from 'jovo-platform-web';
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

  ColorIntent() {
    const color = this.$inputs.color?.key;

    if (!color) {
      return this.ask('I could not understand the color. Try again?');
    }

    // this.$webApp?.addActions([
    //   {
    //     type: 'CUSTOM',
    //     command: 'set-color',
    //     value: color,
    //   },
    // ]);
    return this.tell(`OK, ${color}.`);
  },
});

export { app };
