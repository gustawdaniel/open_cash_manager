<template>
  <AddTransaction :accountName="$route.query.account"/>
</template>

<script>
import AddTransaction from "../../../components/TransactionForm";

export default {
  name: "index",
  components: {AddTransaction}
}
</script>


