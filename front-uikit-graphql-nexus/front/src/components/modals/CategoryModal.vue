<template>
  <div id="modal-example" ref="modal" uk-modal>
    <div class="uk-modal-dialog uk-modal-body">

      <fieldset class="uk-fieldset">

        <legend class="uk-legend">{{category ? `Modify Category: "${category.name}"` : 'Define Category'}}</legend>

        <div class="uk-margin">
          <input v-model="name" class="uk-input" type="text" placeholder="Name" autofocus @keydown.enter="save">
        </div>

        <div class="color">
          <input type="color" id="color" v-model="color">
          <label for="color">Color</label>
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
  import { modalMixin } from './modalMixin';
  import { randomColor } from '../../helpers/randomColor';
  import UPDATE_CATEGORY from '../../graphql/category/UpdateCategory.gql';
  import CATEGORIES from '../../graphql/category/Categories.gql';
  import OPEN_CATEGORY from '../../graphql/category/CreateCategory.gql';

  export default {
    name: "CategoryModal",
    mixins: [modalMixin],
    props: {
      category: {
        type: Object,
        required: false
      }
    },
    data() {
      return {
        id: null,
        name: "",
        color: randomColor()
      }
    },
    created() {
      if (this.category) {
        this.id = this.category.id;
        this.name = this.category.name;
        this.color = this.category.color;
      }
    },
    methods: {
      save() {
        console.log(this.name, this.category)

        if(this.category) {

          this.$apollo.mutate({
            mutation: UPDATE_CATEGORY,
            variables: {
              where: {
                id: this.category.id
              },
              data: {
                name: this.name,
                color: this.color
              },
            },
            update: (store, { data: { updateOneCategory } }) => {
              const data = store.readQuery({ query: CATEGORIES })
              data.categories.find(a => a.id === updateOneCategory.id).name = updateOneCategory.name;
              store.writeQuery({ query: CATEGORIES, data })

              UIkit.modal(this.$refs.modal).hide();
              UIkit.notification({ message: `Category "${this.name}" updated...`, status: 'success', pos: 'top-right' })
              this.name = "";
            },
          })


        } else {

          this.$apollo.mutate({
            mutation: OPEN_CATEGORY,
            variables: {
              data: {
                name: this.name,
                color: this.color
              },
            },
            update: (store, { data: { createOneCategory } }) => {
              const data = store.readQuery({ query: CATEGORIES })
              data.categories.push(createOneCategory)
              store.writeQuery({ query: CATEGORIES, data })

              UIkit.modal(this.$refs.modal).hide();
              UIkit.notification({ message: `Category "${this.name}" created...`, status: 'success', pos: 'top-right' })
              this.name = "";
            },
          })

        }

      }
    }
  }
</script>

<style scoped lang="scss">
  .color {
    p, label {
      font: 1rem 'Fira Sans', sans-serif;
    }

    input {
      margin: .4rem;
    }
  }
</style>