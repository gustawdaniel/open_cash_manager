<template>
  <div class="container flex flex-col justify-between">

    <div class="flex flex-wrap">
      <div class="w-full px-2 my-2">
        <label>
          <span>{{ $t('account.name') }}</span>
          <input type="text" v-model="account.name"
                 class="border p-2 w-full focus:outline-none focus:border-blue-300 focus:outline-none focus:border-blue-300">
        </label>
      </div>
      <div class="w-1/2 px-2  my-2">
        <div>
          <p>{{ $t('account.type') }}</p>

          <multiselect
            v-model="account.type"
            :allow-empty="false"
            :searchable="false"
            :clear-on-select="false"
            :options="accountTypes">
          </multiselect>

        </div>
      </div>
      <div class="w-1/2 px-2  my-2">
        <div>
          <p>{{ $t('account.currency') }}</p>

          <multiselect
            v-model="account.currency"
            :allow-empty="false"
            :searchable="false"
            :clear-on-select="false"
            :options="currencies">
          </multiselect>
        </div>
      </div>

      <div class="w-full px-2  my-2">
        <label>
          <span>{{ $t('account.description') }}</span>
          <textarea v-model="account.description" class="border p-2 w-full focus:outline-none focus:border-blue-300"/>
        </label>
      </div>

      <div class="w-full px-2">
        <label class="flex flex-start items-center">
          <input type="checkbox" v-model="account.hidden" class="mx-2">
          <span>{{ $t('account.show-box') }}</span>
        </label>
      </div>

      <div class="w-full px-2 my-2">
        <label>
          <p>{{ $t('account.order') }}</p>
          <input type="number" min="0" v-model="account.order"
                 class="border p-2 w-full focus:outline-none focus:border-blue-300">
        </label>
      </div>
    </div>


    <div class="flex justify-around">
      <nuxt-link class="border-r border-t w-1/2 p-3 text-center" to="/">{{ $t('common.back') }}</nuxt-link>
      <button class="border-t w-1/2 p-3" @click="save">{{ $t('common.save') }}</button>
    </div>
  </div>
</template>

<script>
import Multiselect from 'vue-multiselect'

export default {
  name: "AccountForm",
  props: {
    name: {
      type: String,
      required: false
    }
  },
  components: {Multiselect},
  data() {

    if (this.name) {

      const account = this.$store.state.accounts.find(account => account.name === this.name);

      return {
        account: {
          name: this.name,
          type: account.type,
          description: account.description,
          currency: account.currency || 'PLN',
          hidden: account.hidden || false,
          order: account.order || 0
        }
      }

    } else {

      return {
        account: {
          name: '',
          type: 'Bank',
          description: '',
          currency: 'PLN',
          hidden: false,
          order: this.$store.state.accounts.length + 1
        }
      }

    }
  },
  computed: {
    currencies() {
      return ['PLN', 'USD', 'EUR', 'BTC', 'UNC'];
    },
    accountTypes() {
      return ['Bank', 'Cash', 'CCard'];
    }
  },
  methods: {
    async save() {
      const payload = {
        data: this.account
      };

      if (this.name) {
        payload.where = {name: this.name};
      }

      await this.$store.dispatch('account/save', payload);
      return this.$router.push({path: '/'})
    }
  }
}
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
