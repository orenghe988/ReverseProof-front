<script>
  import { fade, fly } from "svelte/transition";
  import { isDark } from "../stores/darkmode";
  import { animatedSquareText } from "../text.json";
  const intervals = {
    squareIntervals: [3, 4, 5, 6, 0],
    squareSizes: [60, 55, 40, 25, 60],
    mathIntervals: [4, 5, 6, 0],
    mathSizes: [32, 23, 15, 28],
  };
  $: animationProgress = scrollY / innerHeight;
  $: instructionVisible =
    animationProgress >= 0.8 && animationProgress <= 7.5 ? true : false;
  $: mathVisible =
    animationProgress >= 2.25 && animationProgress <= 6.8 ? true : false;
  $: sizeFactor = innerWidth < 768 ? 0.7 : 1;
  $: isShaking = animationProgress >= 5 ? true : false;
  $: animationProgress >= 6 ? isDark.set(false) : isDark.set(true);
  $: squareSize = () => {
    for (let [index, interval] of intervals.squareIntervals.entries()) {
      if (animationProgress < interval)
        return intervals.squareSizes[index] * sizeFactor;
    }
    return intervals.squareSizes.at(-1) * sizeFactor;
  };
  $: mathSize = () => {
    for (let [index, interval] of intervals.mathIntervals.entries()) {
      if (animationProgress < interval)
        return intervals.mathSizes[index] * sizeFactor;
    }
    return intervals.mathSizes.at(-1) * sizeFactor;
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
  6
    ? 'black'
    : 'white'}; --container-background-color: {animationProgress >= 6
    ? 'white'
    : animationProgress >= 5
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
          class={animationProgress >= 6 ? "math proof-" + lang : "math problem"}
          in:fly={{ y: -100, duration: 750 }}
          out:fly={{ y: 100, duration: 750 }}
        />
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
  @mixin centerFlexBox {
    display: flex;
    justify-content: center;
  }
  .animatedSquare-container {
    @include centerFlexBox;
    height: 700vh;
    width: 100%;
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
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.3), 0 6px 20px 0 rgba(0, 0, 0, 0.29);
    &.shaking {
      animation: horizontal-shaking 0.3s;
      animation-iteration-count: infinite;
    }
    &.dark {
      background-image: url("/assets/square-only-fully-transparent.png");
      border-radius: 42px;
    }
    &.light {
      background-image: url("/assets/square-margin.webp");
      border-radius: 40px;
    }
  }
  .math-container {
    @include centerFlexBox;
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
  @keyframes horizontal-shaking {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(5px);
    }
    50% {
      transform: translateX(-5px);
    }
    75% {
      transform: translateX(5px);
    }
    100% {
      transform: translateX(0);
    }
  }
</style>
