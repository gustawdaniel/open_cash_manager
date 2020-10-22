<template>
  <div class="container">
    <!--    <div class="row">-->
    <!--      <UploadFile/>-->
    <!--    </div>-->

    <Accounts class="mx-3"/>

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UploadFile from "~/components/UploadFile.vue";
import Accounts from "~/components/Accounts.vue";

export default Vue.extend({
  name: 'MainPage',
  components: {UploadFile, Accounts}
})
</script>

