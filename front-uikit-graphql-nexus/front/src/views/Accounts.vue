<template>
  <div class="home">

    <div class="uk-container uk-margin-medium-top">
      <div class="uk-card uk-card-default uk-card-body">
        <router-link :to="{name: 'Categories'}" class="uk-card-badge uk-label" style="color: white">
          Categories
        </router-link>

        <h3 class="uk-card-title">Accounts</h3>

        <table class="uk-table uk-table-divider">
          <tbody>
            <SingleAccountListElement :key="account.id" v-for="account in accounts" :account="account"/>
          </tbody>
        </table>
      </div>

      <OpenAccountButton/>
    </div>
  </div>
</template>

<script>
  import ACCOUNTS from '../graphql/account/Accounts.gql';

  import OpenAccountButton from '../components/OpenAccountButton';
  import SingleAccountListElement from '../components/SingleAccountListElement';

  export default {
    name: 'Accounts',
    components: {
      SingleAccountListElement,
      OpenAccountButton
    },
    apollo: {
      accounts: ACCOUNTS
    }
  }
</script>
