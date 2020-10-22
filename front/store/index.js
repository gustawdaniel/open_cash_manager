import {
  TRANSACTION_COST,
  TRANSACTION_TRANSFER,
  TRANSACTION_INCOME
} from "~/constants/transaction-types";

export const state = () => ({
  accounts: [],
  transactions: [],
  config: {
    showHidden: false
  }
})

export const mutations = {
  init(state, payload) {
    state.accounts = payload.accounts;
    state.transactions = payload.transactions;
  },
  setAccount(state, {where, data}) {
    const item = state.accounts.find(item => item.name === where.name);

    if (where.name !== data.name) {
      state.transactions.filter(t => t.account === where.name).forEach(t => {
        Object.assign(t, {...t, account: data.name})
      })
    }

    Object.assign(item, data);
  },
  addAccount(state, {data}) {
    state.accounts.push(data);
  },
  toggleShowHidden(state) {
    state.config.showHidden = !state.config.showHidden;
  },
  reloadTotalAfter(state, {filter = t => t.account === 'mBank'}) {
    state.transactions.sort((a, b) => a.date.localeCompare(b.date))

    state.transactions.filter(filter).reduce((accountsAccumulator, n, i) => {
      if (!accountsAccumulator.hasOwnProperty(n.account)) accountsAccumulator[n.account] = 0;
      accountsAccumulator[n.account] += n.amount * 100;

      console.log(i, n, accountsAccumulator);
      Object.assign(n, {...n, totalAfter: accountsAccumulator[n.account] / 100});
      return accountsAccumulator;
    }, {});
  },
  'transaction/add'(state, {where, data}) {
    if (where) {
      const item = state.transactions.find(item => JSON.stringify(item) === JSON.stringify(where));

      Object.assign(item, data);
    } else {
      state.transactions.push(data);
    }
  },
  fixAmount(state) {
    state.transactions.filter(t => t.account === 'mBank').forEach(t => {
      Object.assign(t, {...t, amount: parseFloat(t.amount)});
    })

  },
  removeTransactions(state, {where}) {
    state.transactions = state.transactions.filter(t => t.account !== where.account);
  },
  removeAccount(state, {where}) {
    const index = state.accounts.findIndex(a => a.name === where.name);
    state.accounts.splice(index, 1)
  },
  removeTransaction(state, {where}) {
    const index = state.transactions.findIndex(t => JSON.stringify(t) === JSON.stringify(where));
    state.transactions.splice(index, 1)
  }
}

export const actions = {
  'account/save'({state, commit}, {where, data}) {
    if (where) {
      if (where.name !== data.name) {
        if (state.accounts.find(item => item.name === data.name)) {
          throw new Error(`Name ${data.name} is taken. Names of accounts need to be unique.`)
        }
      }

      commit('setAccount', {where, data});
    } else {
      commit('addAccount', {data});
    }
  },
  'account/remove'({state, commit}, {where}) {
    commit('removeTransactions', {where: {account: where.name}});
    commit('removeAccount', {where})
  },
  'transaction/save'({state, commit}, {where, data}) {

    if (data.type === TRANSACTION_TRANSFER) {
      commit('transaction/add', {
        data: {
          payee: data.payee,
          account: data.account,
          amount: -parseFloat(data.amount),
          date: data.date,
          type: TRANSACTION_TRANSFER,
          category: `[${data.targetAccount}]`
        }
      })
      commit('transaction/add', {
        data: {
          payee: data.payee,
          account: data.targetAccount,
          amount: parseFloat(data.targetAmount),
          date: data.date,
          type: TRANSACTION_TRANSFER,
          category: `[${data.account}]`
        }
      })


      commit('reloadTotalAfter', {filter: t => t.account === data.account || t.account === data.targetAccount})
    } else {

      if (data.type === TRANSACTION_COST) {
        data.amount = -parseFloat(data.amount);
      } else if (data.type === TRANSACTION_INCOME) {
        data.amount = parseFloat(data.amount);
      }

      commit('transaction/add', {where, data})

      commit('reloadTotalAfter', {filter: t => t.account === data.account})
    }
  }
}

export const getters = {
  accounts(state) {
    const accounts = state.accounts.filter(a => state.config.showHidden || !a.hidden);

    accounts.sort((a, b) => a.order - b.order);

    return accounts;
  }
}
