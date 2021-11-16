<template>
  <div id="app" class="flex flex-col w-screen h-screen bg-gray-300 dark:bg-gray-900">
    <div
      v-if="$client.speechRecognizer.isAvailable"
      class="flex flex-col flex-grow justify-center items-center"
    >
      <div class="flex flex-col flex-grow justify-center items-center">
        <div class="px-8">
          <p class="text-lg text-center text-gray-800 dark:text-gray-400">{{ outputText }}</p>
        </div>
      </div>
      <div class="flex flex-col flex-shrink-0 mt-auto justify-center items-center mb-16">
        <div class="mb-4 px-8">
          <p class="text-base text-center text-gray-800 dark:text-gray-400">{{ inputText }}</p>
        </div>
        <record-button />
      </div>
    </div>
    <div v-else class="flex flex-col flex-grow justify-center items-center">
      <div class="px-8">
        <p class="text-lg text-center text-gray-800 dark:text-gray-400">
          This demo uses the Chrome Web Speech API, which unfortunately isn't supported in this
          browser.
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import RecordButton from '@/components/RecordButton.vue';
import {
  AudioHelper,
  ClientEvent,
  ClientRequest,
  NormalizedOutputTemplate,
  SpeechRecognizerEvent,
  SpeechSynthesizerEvent,
} from '@jovotech/client-web-vue2';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { RecordButton },
})
export default class App extends Vue {
  inputText = '';
  outputText = 'Press the button below to get started.';

  mounted() {
    this.$client.speechRecognizer.on(
      SpeechRecognizerEvent.SpeechRecognized,
      this.onSpeechRecognized,
    );
    this.$client.on(ClientEvent.Request, this.onRequest);
    this.$client.on(ClientEvent.Output, this.onOutput);
    this.$client.speechSynthesizer.on(SpeechSynthesizerEvent.Speak, this.onSpeechSpeak);
  }

  beforeDestroy() {
    this.$client.speechRecognizer.off(
      SpeechRecognizerEvent.SpeechRecognized,
      this.onSpeechRecognized,
    );
    this.$client.off(ClientEvent.Request, this.onRequest);
    this.$client.speechSynthesizer.off(SpeechSynthesizerEvent.Speak, this.onSpeechSpeak);
  }

  private onSpeechRecognized(event: SpeechRecognitionEvent) {
    this.inputText = AudioHelper.textFromSpeechRecognition(event);
  }

  private onRequest(req: ClientRequest) {
    if (req.input?.text) {
      this.inputText = req.input.text || '';
    }
  }

  private onSpeechSpeak(utterance: SpeechSynthesisUtterance) {
    this.outputText = utterance.text;
  }

  private isValidTheme(theme?: unknown): theme is 'light' | 'dark' {
    return !!theme && typeof theme === 'string' && ['light', 'dark'].includes(theme);
  }

  private onOutput(output: NormalizedOutputTemplate) {
    const theme = output.platforms?.web?.theme;
    if (this.isValidTheme(theme)) {
      this.toggleDarkMode(theme);
    }
  }

  private toggleDarkMode(theme: 'dark' | 'light') {
    if (theme === 'dark') {
      if (!document.documentElement.classList.contains('mode-dark')) {
        document.documentElement.classList.add('mode-dark');
      }
    } else if (theme === 'light') {
      if (document.documentElement.classList.contains('mode-dark')) {
        document.documentElement.classList.remove('mode-dark');
      }
    }
  }
}
</script>

<style>
@import 'assets/css/theme.pcss';

#app {
  -webkit-tap-highlight-color: transparent;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
