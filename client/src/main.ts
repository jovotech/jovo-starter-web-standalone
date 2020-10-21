import JovoWebClientVue, { JovoWebClientVueConfig } from 'jovo-client-web-vue';
import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

Vue.use<JovoWebClientVueConfig>(JovoWebClientVue, {
  url: process.env.VUE_APP_CLIENT_ENDPOINT_URL || 'https://webhook.jovo.cloud/<id>',
  client: {
    audioRecorder: {
      startDetection: {
        enabled: false,
      },
      silenceDetection: {
        enabled: false,
      },
    },
    speechRecognizer: {
      startDetection: {
        enabled: false,
      },
      silenceDetection: {
        enabled: false,
      },
    },
    repromptHandler: {
      enabled: false,
    },
  },
});

new Vue({
  render: (h) => h(App),
}).$mount('#app');
