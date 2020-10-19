<template>
  <div class="uk-container uk-margin-medium-top">
    <div class="uk-card uk-card-default uk-card-body">

      <div class="uk-flex uk-flex-between">
        <h3 class="uk-card-title">Categories</h3>
        <div>
          <a uk-icon="plus" style="color: #3a74e5" @click="openSaveCategoryDialog"></a>
          <router-link :to="{name: 'Accounts'}" uk-icon="reply" class="uk-margin-small-left"></router-link>
        </div>
      </div>

      <ul class="uk-list uk-list-divider">
        <SingleCategoryListElement v-for="category in categories"
                                   :key="category.id"
                                   :category="category"/>
      </ul>
    </div>
  </div>
</template>

<script>
  import CategoryModal from '../components/modals/CategoryModal';
  import CATEGORIES from '../graphql/category/Categories.gql';
  import SingleCategoryListElement from '../components/SingleCategoryListElement';

  export default {
    name: "Categories",
    components: { SingleCategoryListElement },
    methods: {
      openSaveCategoryDialog() {
        this.$store.dispatch('openDialog', { component: CategoryModal, props: { category: null } })
      }
    },
    apollo: {
      categories: CATEGORIES
    }
  }
</script>

<style scoped>

</style>