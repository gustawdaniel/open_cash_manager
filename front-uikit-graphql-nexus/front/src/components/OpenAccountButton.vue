<template>
  <div>
    <button class="uk-button uk-button-primary uk-margin-small-right uk-margin-small-top uk-width-1-1"
            type="button" @click="openAccountModal">Open
<!--      uk-toggle="target: #modal-example" -->
    </button>


    <!-- This is the modal -->


  </div>
</template>

<script>

  import AccountModal from './modals/AccountModal';

  export default {
    name: "OpenAccountButton",
    methods: {
      openAccountModal() {
        this.$store.dispatch('openDialog', { component: AccountModal, props: {account: null} })
      }
    }
  }
</script>

<style scoped>

</style>