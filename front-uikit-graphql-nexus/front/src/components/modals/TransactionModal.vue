<template>
  <div id="modal-example" ref="modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">

      <fieldset class="uk-fieldset">

        <legend class="uk-legend">{{transaction ? `Modify Transaction: "${transaction.name}"` : 'Add Transaction'}}
        </legend>

        <div class="uk-margin">
          <input v-model="name" class="uk-input" type="text" placeholder="Name" autofocus>
        </div>

        <div class="uk-margin">
          <input v-model="value" class="uk-input" type="text" placeholder="Value">
        </div>

        <div class="uk-margin">
          <input v-model="date" class="uk-input" type="text" placeholder="Date" @keydown.enter="save">
        </div>

        <CategorySelector v-model="categoryId"/>

        <div class="uk-margin">
          <textarea v-model="description" class="uk-textarea" type="text" placeholder="Description" rows="2"/>
        </div>
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
  import OPEN_TRANSACTION from '../../graphql/transaction/AddTransaction.gql';
  import UPDATE_TRANSACTION from '../../graphql/transaction/UpdateTransaction.gql';
  import TRANSACTIONS from '../../graphql/transaction/Transactions.gql';
  import { modalMixin } from './modalMixin';
  import { dateToDisplayString, dateToInputString } from '../../helpers/dateFormat';
  import CategorySelector from '../CategorySelector';

  export default {
    name: "TransactionModal",
    components: { CategorySelector },
    mixins: [modalMixin],
    props: {
      transaction: {
        type: Object,
        required: false
      },
      accountId: {
        type: Number,
        required: true
      }
    },
    data() {
      return {
        id: null,
        name: "",
        value: 0,
        date: dateToDisplayString(new Date()),
        description: "",
        categoryId: null
      }
    },
    created() {
      if (this.transaction) {
        this.id = this.transaction.id;
        this.name = this.transaction.name;
        this.value = this.transaction.value;
        this.description = this.transaction.description;
        this.categoryId = this.transaction.categoryId;
      }
    },

    methods: {
      save() {
        console.log(this.name, this.transaction)

        let variables = {
          data: {
            name: this.name,
            value: parseFloat(this.value),
            description: this.description,
            date: dateToInputString(this.date),
            Account: {
              connect: {
                id: this.accountId
              }
            }
          }
        };

        console.log("CAT", this.categoryId);

        if(this.categoryId) {
          variables.data.Category = {
            connect: {
              id: parseInt(this.categoryId)
            }
          }
        }

        if (this.transaction) {

          variables.where = {
            id: this.transaction.id
          };

          console.log("VAR", variables);

          this.$apollo.mutate({
            mutation: UPDATE_TRANSACTION,
            variables,
            update: (store, { data: { updateOneTransaction } }) => {
              const data = store.readQuery({
                query: TRANSACTIONS,
                variables: { where: { accountId: { equals: this.accountId } } }
              })

              data.transactions.find(a => a.id === updateOneTransaction.id).name = updateOneTransaction.name;
              store.writeQuery({ query: TRANSACTIONS, data })

              UIkit.modal(this.$refs.modal).hide();
              UIkit.notification({
                message: `Transaction "${this.name}" updated...`,
                status: 'success',
                pos: 'top-right'
              })
              this.name = "";
            },
          })


        } else {



          this.$apollo.mutate({
            mutation: OPEN_TRANSACTION,
            variables,
            update: (store, { data: { createOneTransaction } }) => {
              const data = store.readQuery({
                query: TRANSACTIONS,
                variables: { where: { accountId: { equals: this.accountId } } }
              })

              console.log("CREATE", createOneTransaction);
              console.log("DATA", data);

              data.transactions.push(createOneTransaction)
              store.writeQuery({ query: TRANSACTIONS, data })

              UIkit.modal(this.$refs.modal).hide();
              UIkit.notification({
                message: `Transaction "${this.name}" created...`,
                status: 'success',
                pos: 'top-right'
              })
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