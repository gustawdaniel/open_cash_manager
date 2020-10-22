<template>
  <div class="min-h-screen flex flex-col">
    <PageTitle/>
    <div class="flex flex-grow">
      <Nuxt class="mx-auto"/>

      <ContextMenu/>
      <ModalDialog/>
    </div>
    <BottomBar/>
  </div>
</template>

<style>
</style>
<script>
import BottomBar from "../components/layout/BottomBar";
import PageTitle from "../components/layout/PageTitle";
import ContextMenu from "../components/partials/ContextMenu";
import ModalDialog from "../components/partials/ModalDialog";

export default {
  components: {ModalDialog, PageTitle, BottomBar, ContextMenu}
}
</script>
