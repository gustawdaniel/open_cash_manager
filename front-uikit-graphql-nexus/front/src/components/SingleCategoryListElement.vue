<template>
  <li>
          <span class="uk-label" :style="{
            color: category.color,
            background: category.color,
            userSelect: 'none'
          }">_</span> {{category.name}}

    <a uk-icon="pencil" style="color: #3a74e5" @click="openUpdateDialog"></a>
    <a uk-icon="trash" style="color: #a73043" @click="handleDeleteRequest"></a>
  </li>
</template>

<script>
  import CLOSE_CATEGORY from '../graphql/category/RemoveCategory.gql';
  import CATEGORIES from '../graphql/category/Categories.gql';
  import CategoryModal from './modals/CategoryModal';

  export default {
    name: "SingleCategoryListElement",
    props: {
      category: {
        type: Object,
        required: true
      }
    },
    methods: {
      openUpdateDialog() {
        this.$store.dispatch('openDialog', { component: CategoryModal, props: { category: this.category } })

      },
      handleDeleteRequest() {
        UIkit.modal.confirm(`Do you want to delete "${this.category.name}" category?`).then(() => {
          console.log('Confirmed.', this.category.id)
          this.$apollo.mutate({
            mutation: CLOSE_CATEGORY,
            variables: {
              where: {
                id: this.category.id
              }
            },
            update(store, { data: { deleteOneCategory } }) {
              const data = store.readQuery({ query: CATEGORIES })

              data.categories.splice(data.categories.findIndex(e => e.id === deleteOneCategory.id), 1)
              store.writeQuery({ query: CATEGORIES, data })

              UIkit.notification({
                message: `Category "${deleteOneCategory.name}" deleted...`,
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