import { App } from 'jovo-framework';
import { WebPlatform } from 'jovo-platform-web';
import { JovoDebugger } from 'jovo-plugin-debugger';
import { FileDb } from 'jovo-db-filedb';
import { LexSlu } from 'jovo-slu-lex';
import { PollyTts } from 'jovo-tts-polly';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const app = new App();

const webPlatform = new WebPlatform();

app.use(webPlatform, new JovoDebugger(), new FileDb());

webPlatform.use(
  new LexSlu({
    botAlias: process.env.LEX_BOT_ALIAS,
    botName: process.env.LEX_BOT_NAME,
  }),
  // new PollyTts(),
);

// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
  LAUNCH() {
    return this.toIntent('HelloWorldIntent');
  },

  HelloWorldIntent() {
    this.ask("Hello World! What's your name?", 'Please tell me your name.');
    this.$webApp?.showQuickReplies([
      'John',
      'Eva',
      'Max',
    ]);
  },

  MyNameIsIntent() {
    this.tell('Hey ' + this.$inputs.name.value + ', nice to meet you!');
  },
});

export { app };
