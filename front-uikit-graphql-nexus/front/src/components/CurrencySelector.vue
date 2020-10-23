<template>
  <div class="uk-margin">
    <select class="uk-select" ref="select" @change="update">
      <option v-for="currency in currencies" :key="currency">{{currency}}</option>
    </select>
  </div>
</template>

<script>
  import CURRENCIES from '../graphql/currency/Currencies.gql';

  export default {
    name: "CurrencySelector",
    props: ['value'],
    methods: {
      update() {
        this.$emit('input', this.$refs.select.value)
      }
    },
    apollo: {
      currencies: {
        query: CURRENCIES,
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

