<template>
<div class="conic-section--round">
  <h1>canvas test with observable</h1>
  <div>
    <button @click="clearCanvasAllRect">clear all</button>
  </div>
  <div>
    <button @click="setType(CanvasGraphEnum.Circle)">Circle</button>
    <button @click="setType(CanvasGraphEnum.Rect)">Rect</button>
  </div>
  <div class="container">
    <div class="canvas-container">
      <canvas id="my-canvas" ref="round" width="1000" height="500"></canvas>
      <!-- <canvas id="my-canvas" ref="round"></canvas> -->
    </div>
  </div>
</div>
</template>

<script lang="ts">
import Vue from 'vue';
import CanvasRx from '../util/CanvasRx';
import { CanvasGraphEnum } from '../util/CanvasRx';
import WindowRx from '../util/WindowRx';

export default Vue.extend({
  data () {
    return {
      canvasDOM: {} as HTMLCanvasElement,
      // roundCtx: {} as CanvasRenderingContext2D,
      canvasRx: {} as CanvasRx,
      CanvasGraphEnum,
      windowRx: {} as WindowRx,
    };
  },
  methods: {
    initial() {
      this.canvasDOM = <HTMLCanvasElement>this.$refs.round;
      // this.roundCtx = <CanvasRenderingContext2D>this.canvasDOM.getContext('2d');
      // const ctx = this.roundCtx;
      this.canvasRx = new CanvasRx(this.canvasDOM);
      this.canvasRx.initial();
      // this.roundCtx.fillRect(0, 0, 100, 100);
      this.windowRx = new WindowRx(window);
      this.windowRx.initial(this.resizeHandler);
    },
    clearCanvasAllRect() {
      this.canvasRx.clearAllRect();
    },
    setType(type: CanvasGraphEnum) {
      this.canvasRx.setType(type);
    },
    resizeHandler(windowNewWidth: number) {
      console.log('resizeHandler');
      const width = windowNewWidth * 0.95;
      this.canvasDOM.width = width;
      this.canvasDOM.height = width / 2;
    }
  },
  mounted() {
    this.initial();
  }
});
</script>

<style lang="scss">
.container {
  // background-color: #aaa;
  display: flex;
  justify-content: center;
  // width: 1000px;
  // height: 500px;
  #my-canvas {
    border: 1px solid #aaa;
  }
}
</style>
