<script>
  export let lang;
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { hero } from "../text.json";
  let ready = false;
  $: titlePhraseLetters = hero.title[lang].split("");
  let titleTypedChar = "";
  let index = 0;

  setTimeout(() => {
    const titleInterval = setInterval(() => {
      if (index >= titlePhraseLetters.length) {
        clearInterval(titleInterval);
        index = 0;
        const titleDotsInterval = setInterval(() => {
          if (index >= 3) {
            clearInterval(titleDotsInterval);
          } else {
            titleTypedChar += ".";
            index++;
          }
        }, 1000);
      } else {
        titleTypedChar += titlePhraseLetters[index];
        index++;
      }
    }, 100);
  }, 1500);

  onMount(() => (ready = true));
</script>

<div class="hero-content">
  <div class="hero-title">
    {#if ready}
      <h2 transition:fade={{ delay: 200, duration: 750 }}>
        {`{ ${titleTypedChar} }`}
      </h2>
    {/if}
  </div>
  <div class="hero-image-container">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
      src="assets/manual-crop.jpg"
      alt="hero-image"
      class={lang === "en" ? "hero-image flipped" : "hero-image"}
    />
  </div>
</div>

<style lang="scss">
  .hero-content {
    height: 100%;
    display: flex;
    grid-template-columns: 1fr 1fr;
    & > * {
      width: 100%;
    }
  }
  .hero-title {
    position: relative;
    text-align: center;
    margin: auto;
    bottom: 10vh;
    font-size: 30px;
  }
  .hero-image-container {
    display: flex;
  }
  .hero-image {
    width: 45vw;
    object-fit: contain;
    margin: auto;
  }
  .flipped {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
</style>
