<script>
  import { hero } from "../text.json";

  $: heroTitle = hero.title[lang];
  $: x = 0;
  const dotsInterval = setInterval(() => {
    if (++x === 3) clearInterval(dotsInterval);
    heroTitle += ".";
  }, 750);

  export let lang;
</script>

<div class="hero-content">
  <div class="hero-title">{heroTitle}</div>
  <div class="hero-image-container">
    <!-- svelte-ignore a11y-img-redundant-alt -->
    <img
      src="assets/manual-crop.jpg"
      alt="hero-image"
      class={lang === "en" ? "hero-image flipped" : "hero-image"}
    />
  </div>
</div>

<style>
  .hero-content {
    height: 100%;
    display: flex;
    grid-template-columns: 1fr 1fr;
  }
  .hero-content > * {
    width: 100%;
  }
  .hero-title {
    position: relative;
    text-align: center;
    margin: auto;
    bottom: 10vh;
    font-size: 50px;
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
