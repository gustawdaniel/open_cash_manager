<template>
  <div class="modal-layer" @click="resetCtx" :class="{hidden: !display}">
    <div class="modal-dialog">
      <div class="bg-white border shadow-lg" style="width: 120%;">
        <div v-if="config.type === 'new-category'">
          <CategoryForm :handler="config.handler"/>
        </div>
        <div v-else-if="config.type === 'list'">
          <div class="p-3 text-center">
            <h1 class="text-xl mb-1">{{ config.title }}</h1>
            <ul class="border-t">
              <li :key="index" v-for="(element, index) in config.elements" class="cursor-pointer border-b border-r border-l p-1" @click="element.handler">
                {{element.name}}
              </li>
            </ul>
          </div>
        </div>
        <div v-else>
          <div class="p-3 text-center">
            <h1 class="text-xl">{{ config.title }}</h1>
            <p>{{ config.text }}</p>
          </div>
          <div class="flex w-full">
            <button class="w-1/2 border-r border-t p-2" @click="resetCtx">{{ $t('common.cancel') }}</button>
            <button class="w-1/2 border-t p-2" @click="config.handler">{{ $t('common.confirm') }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CategoryForm from '~/components/CategoryForm'

export default {
  name: "ModalDialog",
  comments: {CategoryForm},
  data() {
    return {
      display: false,
      config: {
        title: '',
        text: '',
        handler: () => {
        }
      }
    }
  },
  methods: {
    resetCtx() {
      this.display = false;
    },
    async onContextMenu(event, data) {
      this.display = false;
      await this.$nextTick();
      this.config = data;
      this.display = true;
    }
  },
  mounted() {
    // Listen on contextmenu event through the $root instance
    this.$root.$on("modal", async payload => {
      // if the payload is null reset and handler the action
      if (payload === null) this.resetCtx();
      else await this.onContextMenu(payload.event, payload.data);
    });
  },
  beforeDestroy() {
    this.$root.$off("modal", () => {
    });
  }
}
</script>

<style scoped>
.modal-dialog {
  position: absolute;
  top: 40%;
  left: 40%;
  transform: translate(-40%, -40%);
}

.modal-layer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.4);
}
</style>
