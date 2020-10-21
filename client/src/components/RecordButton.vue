<template>
  <button
    class="bg-gray-300 rounded-full p-8 focus:outline-none shadow-inset"
    @mousedown="onMouseDown"
    @touchstart="onMouseDown"
    @click="onClick"
  >
    <play-icon v-if="!$client.isInitialized" />
    <mic-icon v-else :class="[$client.isRecordingInput ? 'text-red-600' : '']" />
  </button>
</template>

<script lang="ts">
import MicIcon from 'vue-feather-icons/icons/MicIcon';
import PlayIcon from 'vue-feather-icons/icons/PlayIcon';
import { Component, Vue } from 'vue-property-decorator';

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
      window.addEventListener('keydown', this.onKeyDown);
    }
  }

  // Could be critical for other OS than Windows because those try to get the MediaStream when starting to record.
  // This will cause the mouse up event to be called before the actual recording has started,
  // which will then cause the recording to not be stopped on immediate mouse up
  // TODO find a solution for the issue mentioned above
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

<style scoped lang="scss"></style>
