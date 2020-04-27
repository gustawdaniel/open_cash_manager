<template>
  <div class="uk-margin">
    <select class="uk-select" ref="select" @change="update">
      <option v-for="category in categories" :key="category.id" :value="category.id">{{category.name}}</option>
    </select>
  </div>
</template>

<script>
  import CATEGORIES from '../graphql/category/Categories.gql';

  export default {
    name: "CategorySelector",
    props: ['value'],
    methods: {
      update() {
        this.$emit('input', this.$refs.select.value)
      }
    },
    apollo: {
      categories: {
        query: CATEGORIES,
      }
    },
    watch: {
      currencies(val) {
        this.$emit('input',val.find((e, i) => i === 0) )
      }
    }
  }
</script>

<style scoped>

</style>