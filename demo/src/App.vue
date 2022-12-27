<script setup lang="ts">
  import { useHoverIntent } from 'vue-use-hover-intent'
  import { ref } from 'vue-demi'

  const elementRef = ref<HTMLElement>()

  const isHovering = useHoverIntent(elementRef)
</script>

<template>
  <div class="app">
    <div
      ref="elementRef"
      :class="['app__box', { 'app__box--is-hovering': isHovering }]">
      <p v-if="isHovering">Hovering</p>
      <p v-else>Not hovering</p>
    </div>
  </div>
</template>

<style scoped>
  .app {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }

  .app__box {
    display: flex;
    justify-content: center;
    align-items: center;
    width: max(10rem, 15vw);
    aspect-ratio: 1/1;
    background-color: rgba(255,255,255,0.75);
    transition: 0.25s;
    font-size: clamp(1rem, 1.5vw, 4rem);
    border-radius: 50%;
  }

  .app__box--is-hovering {
    background-color: rgba(255, 255, 255, 1);
    transform: scale(1.1);
    box-shadow: 0px 0px 20px #000;
  }
</style>
