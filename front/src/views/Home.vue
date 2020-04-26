<template>
  <div class="home">

    <div class="uk-container uk-margin-medium-top">
      <div class="uk-card uk-card-default uk-card-body">
        <h3 class="uk-card-title">Accounts</h3>

        <ul class="uk-list uk-list-divider">
          <SingleAccountListElement :key="account.id" v-for="account in accounts" :account="account"/>
        </ul>

      </div>

      <OpenAccountButton/>
    </div>
  </div>
</template>

<script>
  import ACCOUNTS from '../graphql/Accounts.gql';

  import OpenAccountButton from '../components/OpenAccountButton';
  import SingleAccountListElement from '../components/SingleAccountListElement';

  export default {
    name: 'Home',
    components: {
      SingleAccountListElement,
      OpenAccountButton
    },
    apollo: {
      accounts: ACCOUNTS
    }
  }
</script>
