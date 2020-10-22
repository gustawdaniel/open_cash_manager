<template>
  <AccountForm :name="name"/>
</template>

<script>
import AccountForm from "../../../components/AccountForm";
export default {
  name: "index",
  components: {AccountForm},
  computed: {
    name() {
      return this.$route.query.name;
    }
  }
}
</script>

<style scoped>

</style>
