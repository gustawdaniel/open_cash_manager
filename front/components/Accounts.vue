<template>
  <div>
    <div v-for="account in accounts" class="flex">
      <div class="w-1/6">
        <div class="h-10">
          <svg class="h-10 w-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
               stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" :d="icon(account.type)"/>
          </svg>
        </div>
      </div>
      <div class="w-1/3 cursor-pointer" @click="$router.push({path: '/transactions', query: {account: account.name}})"
           @contextmenu.prevent="rightClickMenu($event, account.name)">
        <p>{{ account.name }}</p>
        <p class="text-xs text-gray-700">{{ account.description }}</p>
      </div>
      <div class="w-1/2 text-right font-bold"
           :class="{'text-red-800': amount(account.name) < 0, 'text-green-800': amount(account.name) > 0}">
        {{ amount(account.name) }}

        {{ account.currency }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Accounts",
  computed: {
    accounts() {
      return this.$store.getters.accounts;
    }
  },
  methods: {
    amount(name) {
      return (this.$store.state.transactions.filter(({account}) => account === name).reduce((p, n) => p + 100 * n.amount, 0) / 100).toFixed(2);
    },
    icon(type) {
      switch (type) {
        case 'CCard':
          return 'M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z';
        case 'Cash':
          return 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z';
        case 'Bank':
          return 'M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z';
      }
    },

    openLink(target) {
      console.log(target);
    },
    toggleShowHidden() {
      this.$store.commit('toggleShowHidden');
    },
    copyLink(name) {
      console.log(name);

    },

    rightClickMenu(event, name) {
      console.log(event);

      const element = event.target;

      const ctxMenuData = [
        {
          title: "account.edit",
          handler: () => {
            this.$router.push({path: this.localePath('account-edit'), query: {name}})
          }
        },
        {
          title: "account.remove",
          handler: () => {
            this.$root.$emit('modal', {
              data: {
                title: this.$t('account.remove'),
                text: this.$t('account.really-remove'),
                handler: () => {
                  console.log("Confirmed removing", name);
                  this.$store.dispatch('account/remove', {where: {name}})
                }
              }
            })
          }
        },
        {
          title: "account.show",
          handler: this.toggleShowHidden.bind(this, element)
        }
      ];

      this.$root.$emit("contextmenu", {event, ctxMenuData});

    }
  }
}
</script>

<style scoped>

</style>
