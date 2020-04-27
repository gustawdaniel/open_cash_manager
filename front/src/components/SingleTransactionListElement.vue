<template>
  <tr>
    <td>
      <time :datetime="transaction.date">{{transaction.date}}</time>
    </td>
    <td>
      <div class="">
        <div class="">
          <div class="">
            <div class="">
              <p class="uk-margin-remove-bottom">{{transaction.name}}</p>
              <p class="uk-text-meta uk-margin-remove-top">
                category {{transaction}}
              </p>
            </div>
          </div>
        </div>
      </div>
    </td>
    <td>{{transaction.value}} {{account.currency}}</td>
    <td>
      <a uk-icon="pencil" style="color: #3a74e5" @click="openUpdateDialog"></a>
      <a uk-icon="trash" style="color: #a73043" @click="handleDeleteRequest"></a>
    </td>
  </tr>
</template>

<script>
  import TransactionModal from './modals/TransactionModal';
  import DELETE_TRANSACTION from '../graphql/transaction/RemoveTransaction.gql';
  import TRANSACTIONS from '../graphql/transaction/Transactions.gql';

  export default {
    name: "SingleTransactionListElement",
    props: {
      transaction: {
        type: Object,
        required: true
      },
      account: {
        type: Object,
        required: true
      }
    },
    methods: {
      openUpdateDialog() {
        this.$store.dispatch('openDialog', {
          component: TransactionModal,
          props: { transaction: this.transaction, accountId: this.account.id }
        })
      },
      handleDeleteRequest() {

        UIkit.modal.confirm(`Do you want to delete "${this.transaction.name}" transaction?`).then(() => {
          console.log('Confirmed.', this.transaction.id)

          const self = this;

          this.$apollo.mutate({
            mutation: DELETE_TRANSACTION,
            variables: {
              where: {
                id: this.transaction.id
              }
            },
            update(store, { data: { deleteOneTransaction } }) {

              const variables = {
                where: {
                  accountId: {
                    equals: self.account.id
                  }
                }
              };

              const data = store.readQuery({ query: TRANSACTIONS, variables })

              data.transactions = data.transactions.filter(e => e.id !== deleteOneTransaction.id);

              store.writeQuery({
                query: TRANSACTIONS, variables, data
              })

              UIkit.notification({
                message: `Transaction "${deleteOneTransaction.name}" deleted...`,
                status: 'success',
                pos: 'top-right'
              })

            }
          })

        }, () => {
          console.log('Rejected.')
        });

      }
    }
  }
</script>

<style scoped>

</style>