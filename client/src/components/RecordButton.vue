<template>
  <button
    class="bg-gray-100 dark:bg-gray-800 hover:bg-white dark:hover:bg-gray-700 rounded-full p-8 focus:outline-none shadow-2xl"
    @mousedown="onMouseDown"
    @touchstart="onMouseDown"
    @click="onClick"
  >
    <play-icon v-if="!$client.isInitialized" class="text-gray-700" />
    <mic-icon v-else :class="[$client.isRecordingInput ? 'text-red-600' : 'text-gray-700 dark:text-gray-300']" />
  </button>
</template>

<script lang="ts">
import MicIcon from 'vue-feather-icons/icons/MicIcon';
import PlayIcon from 'vue-feather-icons/icons/PlayIcon';
import { Component, Vue } from 'vue-property-decorator';
import { RequestType } from 'jovo-client-web-vue';

@Component({
  name: 'record-button',
  components: {
    MicIcon,
    PlayIcon,
  },
})
export default class RecordButton extends Vue {
  beforeDestroy() {
    if (this.$client.isInitialized) {
      window.removeEventListener('keydown', this.onKeyDown);
    }
  }

  async onClick(event: MouseEvent) {
    if (!this.$client.isInitialized) {
      await this.$client.initialize();
      await this.$client.createRequest({ type: RequestType.Launch }).send();
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
    await this.$client.startInputRecording();
  }

  private onMouseUp(event: MouseEvent | TouchEvent) {
    window.removeEventListener('mouseup', this.onMouseUp);
    this.$client.stopInputRecording();
  }

  private async onKeyDown(event: KeyboardEvent) {
    if (event.key === ' ') {
      window.addEventListener('keyup', this.onKeyUp);
      await this.$client.startInputRecording();
    }
  }

  private async onKeyUp(event: KeyboardEvent) {
    if (event.key === ' ') {
      window.removeEventListener('keyup', this.onKeyUp);
      this.$client.stopInputRecording();
    }
  }
}
</script>
