<script>
  import { isDark } from "../states/darkmode";
  export let lang;
</script>

<div class="header-wrapper" style={$isDark ? "color: white" : ""}>
  <div class="header">
    <div class={lang === "en" ? "logo-wrapper" : "logo-wrapper rtl-flex"}>
      <a href="/" class="logo-link">
        <img
          src={$isDark
            ? "/assets/square-margin-fully-transparent.png"
            : "/assets/square-margin.png"}
          alt="header logo"
          class="header-logo"
        />
      </a>
      <a href="/" class="logo-link">
        <span class="logo-text">ReverseProof</span>
      </a>
    </div>
  </div>
</div>

<style lang="scss">
  .header-wrapper {
    position: fixed;
    width: 80vw;
    height: 50px;
    top: 20px;
    z-index: 100;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
  }
  .header {
    position: sticky;
    width: 100%;
    height: 100%;
    background: rgba(81, 81, 81, 0.1);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(204, 204, 204, 0.25);
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
  }
  .logo-wrapper {
    display: inline-flex;
  }
  .rtl-flex {
    flex-direction: row-reverse;
  }
  .logo-wrapper > a {
    margin: auto;
    padding: 5px;
    font-family: "Miriam Libre", sans-serif;
    font-size: 20px;
    text-decoration: none;
    color: inherit;
    display: inline-flex;
    justify-content: center;
    flex-basis: auto;
  }
  .logo-text {
    display: inline-flex;
    flex-direction: column;
    vertical-align: middle;
    line-height: normal;
  }
  .header-logo {
    height: 40px;
    border-radius: 7px;
  }
  .logo-text {
    transition: color 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
    &:hover {
      color: lightgrey;
    }
  }
</style>
