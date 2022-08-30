<script>
  import { fade, fly } from "svelte/transition";
  import { isDark } from "../stores/darkmode";
  import { animatedSquareText } from "../text.json";
  let scrollY;
  let innerHeight;
  $: animationProgress = scrollY / innerHeight;
  $: instructionVisible = animationProgress >= 0.85 ? true : false;
  $: problemVisible = animationProgress >= 1.2 ? true : false;
  $: squareSize = () => {
    switch (true) {
      case animationProgress < 1.5:
        return 75;
      case animationProgress < 1.7:
        return 65;
      case animationProgress < 2:
        return 50;
      case animationProgress < 2.3:
        return 35;
    }
  };
  $: problemSize = () => {
    switch (true) {
      case animationProgress < 1.7:
        return 30;
      case animationProgress < 2:
        return 24;
      case animationProgress < 2.3:
        return 16.5;
    }
  };
  export let lang;
</script>

<svelte:window bind:scrollY bind:innerHeight />

<div
  class="animatedSquare-container"
  style="--squareSize: {squareSize()}vh; --problemSize: {problemSize()}vh"
>
  <div class="square-image">
    {#if problemVisible}
      <div class="math-problem-container">
        <div class="math-problem" transition:fly={{ y: -100 }} />
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
    background-image: url("assets/square-margin-fully-transparent.png");
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
    background-image: url("assets/math.jpg");
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
