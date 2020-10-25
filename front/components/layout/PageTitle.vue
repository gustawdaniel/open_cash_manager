<template>
  <div class="container mx-auto">
    <client-only>
      <div class="flex items-center mx-3">
        <nuxt-link class="cursor-pinter w-4" to="/">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        </nuxt-link>

        <h1 class="my-1 mx-3">
          <span v-if="name">{{name}}</span>
          <span v-else>{{ $t(`pages.${computedName}`) }}</span>
        </h1>
      </div>

    </client-only>
  </div>
</template>

<script>
export default {
  name: "PageTitle",
  props: {
    name: {
      type: String,
      required: false
    }
  },
  computed: {
    computedName() {
      if (typeof this.$route.name === 'string') {
        return this.$route.name.replace(/___\w+/, '')
      } else {
        return 'not-known';
      }
    }
  }
}
</script>

<style scoped>

</style>
