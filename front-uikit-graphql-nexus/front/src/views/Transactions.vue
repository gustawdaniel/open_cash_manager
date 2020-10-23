<template>
  <div class="about">

    <div class="uk-container uk-margin-medium-top">
      <div class="uk-card uk-card-default uk-card-body">

        <div class="uk-flex uk-flex-between">
          <h3 class="uk-card-title">
            Transactions: <span class="uk-text-muted" v-if="account">{{account.name}}</span>
          </h3>
          <div>
            <a uk-icon="plus" style="color: #3a74e5" @click="openSaveTransactionDialog"></a>
            <router-link :to="{name: 'Accounts'}" uk-icon="reply" class="uk-margin-small-left"></router-link>
          </div>
        </div>

        <table class="uk-table uk-table-divider uk-table-middle">
          <tbody v-if="account">
          <SingleTransactionListElement v-for="transaction in transactions"
                                        :key="transaction.id"
                                        :account="account"
                                        :transaction="transaction"/>
          </tbody>
        </table>

      </div>
    </div>
  </div>
</template>

<script>
  import ACCOUNT from '../graphql/account/Account.gql';
  import TRANSACTIONS from '../graphql/transaction/Transactions.gql';
  import SingleTransactionListElement from '../components/SingleTransactionListElement';
  import TransactionModal from '../components/modals/TransactionModal';

  export default {
    name: 'Transactions',
    props: {
      id: {
        type: Number,
        required: true
      }
    },
    components: {
      SingleTransactionListElement
    },
    methods: {
      openSaveTransactionDialog() {
        this.$store.dispatch('openDialog', { component: TransactionModal, props: {
          transaction: null,
          accountId: this.id
        } })
      }
    },
    apollo: {
      account: {
        query: ACCOUNT,
        variables() {
          return { where: { id: parseInt(this.id) } }
        }
      },
      transactions: {
        query: TRANSACTIONS,
        variables() {
          return { where: { accountId: { equals: parseInt(this.id) } } }
        }
      }
    }
  }
</script>