<template>
    <AddTransaction :account-name="accountName"
                    :base-transaction="baseTransaction"
                    :copy-mode="Boolean($route.query['copy-mode'])"/>
</template>

<script>
import AddTransaction from "../../../components/TransactionForm";

export default {
  name: "index",
  components: {AddTransaction},
  computed: {
    baseTransaction() {
      return JSON.parse(String(this.$route.query['base-transaction']));
    },
    accountName() {
      return this.baseTransaction.account;
    }
  }
}
</script>

<style scoped>

</style>
