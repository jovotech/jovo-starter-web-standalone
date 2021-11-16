import { App } from '@jovotech/framework';
import { NlpjsNlu } from '@jovotech/nlu-nlpjs';
import { WebPlatform } from '@jovotech/platform-web';
import { LangEn } from '@nlpjs/lang-en';
import { GlobalComponent } from './components/GlobalComponent';
/*
|--------------------------------------------------------------------------
| APP CONFIGURATION
|--------------------------------------------------------------------------
|
| All relevant components, plugins, and configurations for your Jovo app
| Learn more here: v4.jovo.tech/docs/app-config
|
*/

const app = new App({
  /*
  |--------------------------------------------------------------------------
  | Components
  |--------------------------------------------------------------------------
  |
  | Components contain the Jovo app logic
  | Learn more here: v4.jovo.tech/docs/components
  |
  */

  components: [GlobalComponent],

  /*
  |--------------------------------------------------------------------------
  | Plugins
  |--------------------------------------------------------------------------
  |
  | Includes platforms, database integrations, third-party plugins, and more
  | Learn more here: v4.jovo.tech/marketplace
  |
  */

  plugins: [
    // Add Jovo plugins here
    new WebPlatform({
      plugins: [
        new NlpjsNlu({
          languageMap: {
            en: LangEn,
          },
        }),
      ],
    }),
  ],

  /*
  |--------------------------------------------------------------------------
  | Other options
  |--------------------------------------------------------------------------
  |
  | Includes all other configuration options like logging
  | Learn more here: v4.jovo.tech/docs/app-config
  |
  */

  logging: true,

  routing: {
    intentMap: {
      'AMAZON.StopIntent': 'END',
    },
  },
});

export { app };
