<template>
  <div id="modal-example" ref="modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">

      <fieldset class="uk-fieldset">

        <legend class="uk-legend">{{account ? `Modify Account: "${account.name}"` : 'Define Account'}}</legend>

        <div class="uk-margin">
          <input v-model="name" class="uk-input" type="text" placeholder="Name" autofocus @keydown.enter="save">
        </div>

        <CurrencySelector v-model="currency"/>
      </fieldset>

      <p class="uk-text-right">
        <button class="uk-button uk-button-default uk-modal-close" type="button">Cancel</button>
        <button class="uk-margin-small-left uk-button uk-button-primary" type="button" @click="save">
          Save
        </button>
      </p>
    </div>
  </div>
</template>

<script>
  import OPEN_ACCOUNT from '../../graphql/OpenAccount.gql';
  import UPDATE_ACCOUNT from '../../graphql/UpdateAccount.gql';
  import ACCOUNTS from '../../graphql/Accounts.gql';
  import { MODAL_CLOSE, ModalBus } from '../../helpers/modalBus';
  import CurrencySelector from '../CurrencySelector';

  export default {
    name: "AccountModal",
    components: { CurrencySelector },
    props: {
      account: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        id: null,
        name: "",
        currency: null
      }
    },
    created() {
      if(this.account) {
        this.id =this.account.id;
        this.name =this.account.name;
        this.currency =this.account.currency;
      }
    },
    mounted() {
      UIkit.modal(this.$refs.modal).show();
      this.$refs.modal.addEventListener('hidden', () => {
        ModalBus.$emit(MODAL_CLOSE);
      });
    },
    methods: {
      save() {
        console.log(this.name, this.account)

        if(this.account) {

          this.$apollo.mutate({
            mutation: UPDATE_ACCOUNT,
            variables: {
              where: {
                id: this.account.id
              },
              data: {
                name: this.name,
                currency: this.currency
              },
            },
            update: (store, { data: { updateOneAccount } }) => {
              const data = store.readQuery({ query: ACCOUNTS })
              data.accounts.find(a => a.id === updateOneAccount.id).name = updateOneAccount.name;
              store.writeQuery({ query: ACCOUNTS, data })

              UIkit.modal(this.$refs.modal).hide();
              UIkit.notification({ message: `Account "${this.name}" updated...`, status: 'success', pos: 'top-right' })
              this.name = "";
            },
          })


        } else {

          this.$apollo.mutate({
            mutation: OPEN_ACCOUNT,
            variables: {
              data: {
                name: this.name,
                currency: this.currency
              },
            },
            update: (store, { data: { createOneAccount } }) => {
              const data = store.readQuery({ query: ACCOUNTS })
              data.accounts.push(createOneAccount)
              store.writeQuery({ query: ACCOUNTS, data })

              UIkit.modal(this.$refs.modal).hide();
              UIkit.notification({ message: `Account "${this.name}" created...`, status: 'success', pos: 'top-right' })
              this.name = "";
            },
          })

        }


      },
    }
  }
</script>

<style scoped>

</style>