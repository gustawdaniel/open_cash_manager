<template>
  <div>
    <template v-if="open">
      <component :is="component" v-bind.sync="props"/>
    </template>
  </div>
</template>

<script>
  import { MODAL_CLOSE, MODAL_OPEN, ModalBus } from '../helpers/modalBus';

  export default {
    name: "ModalRoot",
    data() {
      return {
        component: null,
        props: null,
        open: false
      }
    },
    created() {
      ModalBus.$on(MODAL_OPEN, ({ component, props = null }) => {
        this.component = component;
        this.props = props;
        this.open = true;
      });
      ModalBus.$on(MODAL_CLOSE, () => {
        this.open = false;
      })
    }
  }
</script>

<style scoped>

</style>