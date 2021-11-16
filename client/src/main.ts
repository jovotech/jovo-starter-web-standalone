import JovoWebClientVue, { JovoWebClientVueConfig } from '@jovotech/client-web-vue2';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use<JovoWebClientVueConfig>(JovoWebClientVue, {
  endpointUrl: process.env.VUE_APP_CLIENT_ENDPOINT_URL || 'http://localhost:3000/webhook',
  config: {
    input: {
      audioRecorder: {
        startDetection: {
          enabled: false,
        },
        silenceDetection: {
          enabled: false,
        },
      },
      speechRecognizer: {
        lang: 'en',
        startDetection: {
          enabled: false,
        },
        silenceDetection: {
          enabled: false,
        },
      },
    },
    output: {
      reprompts: {
        enabled: false,
      },
    },
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
