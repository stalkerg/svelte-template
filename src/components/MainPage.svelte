<script>
  import { _, language } from 'global';

  export let asr;

  function setLanguage(lang) {
    $language = lang;
  }
</script>

<div class="container-fluid">
  <div class="btn-group langauge-block" role="group">
    <button type="button"
            class="btn btn-secondary"
            on:click={() => setLanguage('en')}
    >English</button>
    <button type="button"
            class="btn btn-secondary"
            on:click={() => setLanguage('ja')}
    >日本語</button>
    <button type="button"
            class="btn btn-secondary"
            on:click={() => setLanguage('ru')}
    >Русский</button>
  </div>
  <h2>{ $_('Hello World!') }</h2>
  
  <div class="card text-center">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs">
        <li class="nav-item">
          <a class="nav-link"
             class:active={asr.stateIsActive('app.text', {})}
             href={`/#${asr.makePath('app.text', {})}`}>{ $_('Text') }</a>
        </li>
        <li class="nav-item">
          <a class="nav-link"
             class:active={asr.stateIsActive('app.chart', {})}
             href={`/#${asr.makePath('app.chart', {})}`}>{ $_('Chart') }</a>
        </li>
      </ul>
    </div>
    <uiView />
  </div>
</div>

<style>
  h2 {
    margin-top: 10px;
    text-align: center;
  }

  .langauge-block {
    margin-left: auto;
  }

  .langauge-block.btn-group > .btn:last-child,
  .langauge-block.btn-group > .btn:first-child {
    border-top-right-radius: 0;
    border-top-left-radius: 0;
  }
</style>