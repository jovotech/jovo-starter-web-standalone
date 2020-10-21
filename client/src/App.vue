<template>
  <div id="app" class="flex flex-col w-screen h-screen">
    <div class="flex flex-col flex-grow justify-center items-center">
      <div>
        <p class="text-lg">{{ outputText }}</p>
      </div>
    </div>
    <div class="flex flex-col flex-shrink-0 mt-auto justify-center items-center mb-16">
      <div class="mb-4">
        <p class="text-base">{{ inputText }}</p>
      </div>
      <record-button />
    </div>
  </div>
</template>

<script lang="ts">
import RecordButton from '@/components/RecordButton.vue';
import {
  AudioHelper,
  ClientEvent,
  RequestType,
  SpeechRecognizerEvent,
  SpeechSynthesizerEvent,
  WebRequest,
  WebResponse,
} from 'jovo-client-web-vue';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: { RecordButton },
})
export default class App extends Vue {
  inputText = '';
  outputText = '';

  mounted() {
    this.$client.$speechRecognizer.on(
      SpeechRecognizerEvent.SpeechRecognized,
      this.onSpeechRecognized,
    );
    this.$client.on(ClientEvent.Request, this.onRequest);
    this.$client.on(ClientEvent.Response, this.onResponse);
    this.$client.$speechSynthesizer.on(SpeechSynthesizerEvent.Speak, this.onSpeechSpeak);
  }

  beforeDestroy() {
    this.$client.$speechRecognizer.off(
      SpeechRecognizerEvent.SpeechRecognized,
      this.onSpeechRecognized,
    );
    this.$client.off(ClientEvent.Request, this.onRequest);
    this.$client.off(ClientEvent.Response, this.onResponse);
    this.$client.$speechSynthesizer.off(SpeechSynthesizerEvent.Speak, this.onSpeechSpeak);
  }

  private onSpeechRecognized(event: SpeechRecognitionEvent) {
    this.inputText = AudioHelper.textFromSpeechRecognition(event);
  }

  private onRequest(req: WebRequest) {
    if (req.request.type === RequestType.Text || req.request.type === RequestType.TranscribedText) {
      this.inputText = req.request.body.text || '';
    }
  }

  private onResponse(res: WebResponse) {
    if (res.context.request.asr?.text) {
      this.inputText = res.context.request.asr.text;
    }
  }

  private onSpeechSpeak(utterance: SpeechSynthesisUtterance) {
    this.outputText = utterance.text;
  }
}
</script>

<style>
@import 'assets/css/theme.css';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
