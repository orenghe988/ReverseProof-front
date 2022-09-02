<script>
  import { fade, fly } from "svelte/transition";
  import { isDark } from "../stores/darkmode";
  import { animatedSquareText } from "../text.json";
  $: animationProgress = scrollY / innerHeight;
  $: instructionVisible =
    animationProgress >= 0.8 && animationProgress <= 5 ? true : false;
  $: mathVisible =
    animationProgress >= 1.25 && animationProgress <= 4.4 ? true : false;
  $: sizeFactor = innerWidth < 768 ? 0.7 : 1;
  $: isShaking = animationProgress >= 3 ? true : false;
  $: animationProgress >= 3.75 ? isDark.set(false) : isDark.set(true);
  $: squareSize = () => {
    switch (true) {
      case animationProgress < 2:
        return 60 * sizeFactor;
      case animationProgress < 2.5:
        return 55 * sizeFactor;
      case animationProgress < 3:
        return 40 * sizeFactor;
      case animationProgress < 3.75:
        return 25 * sizeFactor;
      default:
        return 60 * sizeFactor;
    }
  };
  $: mathSize = () => {
    switch (true) {
      case animationProgress < 2.5:
        return 32 * sizeFactor;
      case animationProgress < 3:
        return 23 * sizeFactor;
      case animationProgress < 3.75:
        return 14.5 * sizeFactor;
      default:
        return 28 * sizeFactor;
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
  style="--squareSize: {squareSize()}vh; --mathSize: {mathSize()}vh; --container-text-color: {animationProgress >=
  3.75
    ? 'black'
    : 'white'}; --container-background-color: {animationProgress >= 3.75
    ? 'white'
    : animationProgress >= 3
    ? '#8b0000'
    : 'rgb(15, 15, 15)'};"
>
  <div
    class={$isDark
      ? isShaking
        ? "square-image shaking dark"
        : "square-image dark"
      : "square-image light"}
  >
    {#if mathVisible}
      <div class="math-container">
        <div
          class={animationProgress >= 3.75
            ? "math proof-" + lang
            : "math problem"}
          in:fly={{ y: -100, duration: 750 }}
          out:fly={{ y: 100, duration: 750 }}
        />
      </div>
    {/if}
  </div>
  {#if instructionVisible}
    <!-- <p class="animation-progress-demo" transition:fade={{ duration: 100 }}>
      {Math.round(animationProgress * 100) / 100}
    </p> -->
    <p class="instruction" transition:fade={{ duration: 100 }}>
      {animatedSquareText.instruction[lang]}
    </p>
  {/if}
</div>

<style lang="scss">
  .animatedSquare-container {
    height: 450vh;
    width: 100%;
    display: flex;
    justify-content: center;
    transition: background-color 1s cubic-bezier(0.165, 0.84, 0.44, 1);
    -webkit-transition: background-color 1s cubic-bezier(0.165, 0.84, 0.44, 1);
    color: var(--container-text-color);
    background-color: var(--container-background-color);
  }
  .square-image {
    background-repeat: no-repeat;
    background-size: cover;
    -webkit-position: sticky;
    position: sticky;
    top: calc(50% - calc(var(--squareSize) / 2));
    height: var(--squareSize);
    width: var(--squareSize);
    padding: 0px;
    -webkit-transition: height 0.3s, width 0.3s, top 0.3s, background-image 0.3s;
    transition: height 0.3s, width 0.3s, top 0.3s, background-image 0.3s;
    &.dark {
      background-image: url("/assets/square-only-fully-transparent.png");
      border-radius: 40px;
    }
    &.light {
      background-image: url("/assets/square-margin.webp");
      border-radius: 40px;
    }
  }
  .square-image.shaking {
    //background-color: yellow;
  }
  .math-container {
    display: flex;
    justify-content: center;
  }
  .math {
    position: absolute;
    background-size: contain;
    top: calc(50% - calc(var(--mathSize) / 2));
    height: var(--mathSize);
    width: var(--mathSize);
    transition: height 0.3s, width 0.3s, top 0.3s, background-image 0.3s;
    -webkit-transition: height 0.3s, width 0.3s, top 0.3s, background-image 0.3s;
    border: 1px solid dimgrey;
    border-radius: 10px;
    &.problem {
      background-image: url("/assets/problem.webp");
    }
    &.proof-he {
      background-image: url("/assets/proof-hebrew.jpg");
    }
    &.proof-en {
      background-image: url("/assets/proof-english.jpg");
    }
  }
  .animation-progress-demo {
    position: fixed;
    bottom: 2vh;
  }
  .instruction {
    position: fixed;
    bottom: 5vh;
    margin: 10px;
    color: grey;
  }
</style>
