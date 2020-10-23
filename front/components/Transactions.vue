<template>
  <div class="container">
    <div class="mx-3">
      <h1 class="flex justify-between">{{ accountName }}
        <button @click="reload">
          <svg class="w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
          </svg>
        </button>
      </h1>
    </div>
    <hr>
    <div class="mx-3">
      <div>
        <div :key="index" v-for="(transaction, index) in transactions.filter((e,i) => i < 100)"
             class="flex items-center border-b">
          <div class="w-3/12 sm:w-1/6">
            <span>{{ transaction.date | date }}</span>
          </div>
          <div class="w-5/12 sm:w-1/2 cursor-pointer" @contextmenu.prevent="rightClickMenu($event, transaction)">
            <p>{{ transaction.payee }}</p>
            <p class="text-xs text-gray-700">
              <span v-if="/\[.*\]/.test(transaction.category)">
                {{
                  $t(transaction.amount > 0 ? 'transfer.from' : 'transfer.to', {name: transaction.category.match(/\[(.*)\]/)[1]})
                }}
              </span>
              <span v-else>{{ transaction.category }}</span>
            </p>
          </div>
          <div class="w-1/3 text-right">
            <p class="font-bold"
               :class="{'text-red-800': transaction.amount < 0, 'text-green-800': transaction.amount > 0}">
              {{ transaction.amount.toFixed(2) }}
              {{ account.currency }}
            </p>
            <p class="text-xs text-gray-700">
              {{ transaction.hasOwnProperty('totalAfter') ? transaction.totalAfter.toFixed(2) : '' }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Transactions",
  props: {
    accountName: {
      type: String,
      required: true
    }
  },
  methods: {
    reload() {
      this.$store.commit('reloadTotalAfter', {filter: t => t.account === this.accountName});
    },
    rightClickMenu(event, transaction) {
      const ctxMenuData = [
        {
          title: 'transaction.edit', handler: () => {
            this.$router.push({
              path: '/transactions/edit', query: {
                'base-transaction': JSON.stringify(transaction)
              }
            })
          }
        },
        {
          title: 'transaction.remove', handler: () => {
            this.$root.$emit('modal', {
              data: {
                title: this.$t('transaction.remove'),
                text: this.$t('transaction.really-remove'),
                handler: () => {
                  this.$store.commit('removeTransaction', {
                    where: {...transaction}
                  })
                }
              }
            })
          }
        },
        {
          title: 'transaction.copy', handler: () => {
            this.$router.push({
              path: '/transactions/edit', query: {
                'copy-mode': true,
                'base-transaction': JSON.stringify(transaction)
              }
            })
          }
        },
        {
          title: 'schedule.create', handler: () => {
          }
        },
      ]

      this.$root.$emit("contextmenu", {event, ctxMenuData});
    }
  },
  computed: {
    transactions() {
      return this.$store.state.transactions.filter(t => t.account === this.accountName).reverse()
    },
    account() {
      return this.$store.state.accounts.find(a => a.name === this.accountName);
    }
  },
  filters: {
    date(value) {
      return new Intl.DateTimeFormat('en-US', {
        year: '2-digit',
        day: '2-digit',
        month: '2-digit'
      }).format(new Date(value))
    }
  }
}
</script>

<style scoped>

</style>
