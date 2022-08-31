<script>
  export let lang;
  import { fade } from "svelte/transition";
  import { onMount } from "svelte";
  import { heroText } from "../text.json";
  let ready = false;
  let titleOnPage = "";
  let index = 0;
  $: titlePhraseLetters = heroText.title[lang].split("");

  setTimeout(() => {
    const titleInterval = setInterval(() => {
      if (index < titlePhraseLetters.length) {
        titleOnPage += titlePhraseLetters[index];
        index++;
      } else {
        clearInterval(titleInterval);
        index = 0;
        const titleDotsInterval = setInterval(() => {
          if (index < 3) {
            titleOnPage += ".";
            index++;
          } else {
            clearInterval(titleDotsInterval);
          }
        }, 500);
      }
    }, 150);
  }, 1500);

  onMount(() => (ready = true));
  $: innerWidth = 0;
</script>

<svelte:window bind:innerWidth />

<div class="hero-content">
  <div class="hero-title-container">
    {#if ready}
      <h2 transition:fade={{ delay: 200, duration: 750 }}>
        {`{ ${titleOnPage} }`}
      </h2>
    {/if}
  </div>
  {#if innerWidth > 768}
    <!-- <div class="hero-image-container"> -->
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
      src="/assets/manual-crop.jpg"
      alt="hero-image"
      class={lang === "en" ? "hero-image flipped" : "hero-image"}
    />
    <!-- </div> -->
  {/if}
</div>

<style lang="scss">
  .hero-content {
    height: 100%;
    display: flex;
    & > * {
      width: 100%;
    }
  }
  .hero-title-container {
    position: relative;
    text-align: center;
    margin: auto;
    bottom: 10vh;
    font-size: 30px;
  }
  .hero-title-container > h2 {
    margin: 0px;
  }
  .hero-image {
    width: 50vw;
    object-fit: contain;
    margin: auto;
  }
  .flipped {
    -webkit-transform: scaleX(-1);
    transform: scaleX(-1);
  }
  @media (max-width: 768px) {
    .hero-content {
      flex-direction: column;
      background-image: url("/assets/manual-crop-mobile.jpg");
      background-repeat: no-repeat;
      background-size: cover;
      transform: translateY(10vh);
    }
    .hero-title-container {
      font-size: 5.5vw;
      bottom: 30vh;
    }
  }
</style>
