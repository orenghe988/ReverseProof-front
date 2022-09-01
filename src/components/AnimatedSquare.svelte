<script>
  import { fade, fly } from "svelte/transition";
  import { isDark } from "../stores/darkmode";
  import { animatedSquareText } from "../text.json";
  $: animationProgress = scrollY / innerHeight;
  $: instructionVisible = animationProgress >= 0.8 ? true : false;
  $: problemVisible = animationProgress >= 1.25 ? true : false;
  $: sizeFactor = innerWidth < 768 ? 0.7 : 1;
  $: squareSize = () => {
    switch (true) {
      case animationProgress < 2:
        return 60 * sizeFactor;
      case animationProgress < 2.5:
        return 55 * sizeFactor;
      case animationProgress < 3:
        return 40 * sizeFactor;
      case animationProgress < 3.5:
        return 25 * sizeFactor;
    }
  };
  $: problemSize = () => {
    switch (true) {
      case animationProgress < 2.5:
        return 32 * sizeFactor;
      case animationProgress < 3:
        return 23 * sizeFactor;
      case animationProgress < 3.5:
        return 14.5 * sizeFactor;
    }
  };
  let scrollY;
  let innerHeight;
  let innerWidth;
  export let lang;
</script>

<svelte:window bind:scrollY bind:innerHeight bind:innerWidth />

<div
  class="animatedSquare-container"
  style="--squareSize: {squareSize()}vh; --problemSize: {problemSize()}vh"
>
  <div class="square-image">
    {#if problemVisible}
      <div class="math-problem-container">
        <div class="math-problem" transition:fly={{ y: -100, duration: 750 }} />
      </div>
    {/if}
  </div>
  {#if instructionVisible}
    <p class="animation-progress-demo" transition:fade={{ duration: 100 }}>
      {Math.round(animationProgress * 100) / 100}
    </p>
    <p class="instruction" transition:fade={{ duration: 100 }}>
      {animatedSquareText.instruction[lang]}
    </p>
  {/if}
</div>

<style lang="scss">
  .animatedSquare-container {
    color: white;
    background-color: rgb(15, 15, 15);
    height: 500vh;
    width: 100%;
    display: flex;
    justify-content: center;
  }
  .square-image {
    background-image: url("/assets/square-only-fully-transparent.png");
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-position: sticky;
    position: sticky;
    top: calc(50% - calc(var(--squareSize) / 2));
    height: var(--squareSize);
    width: var(--squareSize);
    padding: 0px;
    transition: height 0.3s, width 0.3s, top 0.3s;
  }
  .math-problem-container {
    display: flex;
    justify-content: center;
  }
  .math-problem {
    position: absolute;
    // background-color: aliceblue;
    background-image: url("/assets/math.webp");
    background-size: contain;
    top: calc(50% - calc(var(--problemSize) / 2));
    height: var(--problemSize);
    width: var(--problemSize);
    transition: height 0.3s, width 0.3s, top 0.3s;
    border: 1px solid dimgrey;
    border-radius: 10px;
  }
  .animation-progress-demo {
    position: fixed;
    bottom: 2vh;
  }
  .instruction {
    position: fixed;
    bottom: 5vh;
    margin: 10px;
    color: dimgrey;
  }
</style>
