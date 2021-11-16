<template>
  <button
    class="bg-gray-100 dark:bg-gray-800 rounded-full p-8 focus:outline-none shadow-2xl"
    :class="[
      $client.isRecordingInput ? 'shadow-inner animate-ripple dark:animate-ripple-dark' : '',
    ]"
    @mousedown="onMouseDown"
    @touchstart="onMouseDown"
    @click="onClick"
  >
    <svg
      v-if="!$client.isInitialized"
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-gray-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M13 5l7 7-7 7M5 5l7 7-7 7"
      />
    </svg>

    <svg
      v-else
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 text-gray-700 dark:text-gray-300"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
      />
    </svg>
  </button>
</template>

<script lang="ts">
import { InputType } from '@jovotech/client-web-vue2';
import { Component, Vue } from 'vue-property-decorator';

@Component({
  name: 'record-button',
  components: {},
})
export default class RecordButton extends Vue {
  beforeDestroy() {
    if (this.$client.isInitialized) {
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }

  async onClick() {
    if (!this.$client.isInitialized) {
      await this.$client.initialize();
      await this.$client.send({
        type: InputType.Launch,
      });
      window.addEventListener('keydown', this.onKeyDown);
    }
  }

  async onMouseDown(event: MouseEvent | TouchEvent) {
    if (this.$client.isInitialized) {
      event.preventDefault();
    }
    if (this.$client.isRecordingInput || !this.$client.isInitialized) {
      return;
    }
    if (event instanceof MouseEvent) {
      window.addEventListener('mouseup', this.onMouseUp);
    } else {
      window.addEventListener('touchend', this.onMouseUp);
    }
    await this.$client.startRecording();
  }

  private onMouseUp(event: MouseEvent | TouchEvent) {
    if (event instanceof MouseEvent) {
      window.removeEventListener('mouseup', this.onMouseUp);
    } else {
      window.removeEventListener('touchend', this.onMouseUp);
    }
    this.$client.stopRecording();
  }

  private async onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      window.addEventListener('keyup', this.onKeyUp);
      await this.$client.startRecording();
    }
  }

  private async onKeyUp(event: KeyboardEvent) {
    if (event.key === ' ') {
      window.removeEventListener('keyup', this.onKeyUp);
      this.$client.stopRecording();
    }
  }
}
</script>
