<template>
  <div id="app">
    <router-view/>
    <ModalRoot/>
  </div>
</template>


<script>
  import ModalRoot from './components/ModalRoot';
  export default {
    components: { ModalRoot }
  }
</script>