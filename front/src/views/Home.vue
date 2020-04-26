<template>
  <div class="home">

    <div class="uk-container uk-margin-medium-top">
      <div class="uk-card uk-card-default uk-card-body">
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
