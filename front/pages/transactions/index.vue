<template>
  <Transactions :accountName="$route.query.account"/>
</template>

<script>
import Transactions from "../../components/Transactions";
export default {
name: "index",
  components: {Transactions}
}
</script>

<style scoped>

</style>
