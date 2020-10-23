<template>
  <tr>
    <td>
      <router-link :to="{name: 'Transactions', params: {id: account.id}}">{{ account.name }}</router-link>
    </td>

    <td>{{account.currency}}</td>

    <td class="uk-inline uk-float-right">
      <a uk-icon="pencil" class="uk-margin-small-right" style="color: #3a74e5" @click="handleEdit"></a>
      <a uk-icon="trash" style="color: #a73043" @click="handleDelete"></a>
    </td>
  </tr>
</template>

<script>
  import CLOSE_ACCOUNT from '../graphql/account/DeleteAccount.gql';
  import ACCOUNTS from '../graphql/account/Accounts.gql';
  import AccountModal from './modals/AccountModal';

  export default {
    name: "SingleAccountListElement",
    props: {
      account: {
        type: Object
      }
    },
    methods: {
      handleEdit() {
        this.$store.dispatch('openDialog', { component: AccountModal, props: { account: this.account } })
      },
      handleDelete() {

        UIkit.modal.confirm(`Do you want to delete "${this.account.name}" account?`).then(() => {
          console.log('Confirmed.', this.account.id)
          this.$apollo.mutate({
            mutation: CLOSE_ACCOUNT,
            variables: {
              where: {
                id: this.account.id
              }
            },
            update(store, { data: { deleteOneAccount } }) {
              const data = store.readQuery({ query: ACCOUNTS })

              data.accounts.splice(data.accounts.findIndex(e => e.id === deleteOneAccount.id), 1)
              store.writeQuery({ query: ACCOUNTS, data })

              UIkit.notification({
                message: `Account "${deleteOneAccount.name}" deleted...`,
                status: 'success',
                pos: 'top-right'
              })

            }
          })

        }, () => {
          console.log('Rejected.')
        });

      },
    }
  }
</script>

<style scoped>
  .uk-nav-header {
    padding: 5px 0;
    text-transform: uppercase;
    font-size: 12px;
  }
</style>