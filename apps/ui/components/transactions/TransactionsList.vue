<script lang="ts" setup>
import { FullTransaction, useTransactionStore } from '~/store/transaction';
import { useCategoryStore } from '~/store/category';
import { useAccountStore } from '~/store/account';
import { Currency, sum } from '~/store/currency';

import CategoryColorBox from '~/components/transactions/CategoryColorBox.vue';
import { textColorByAmount } from '~/utils/textColorByAmount';
import { formatAmount } from '~/utils/formatAmount';

const transactionStore = useTransactionStore();
const categoryStore = useCategoryStore();
const accountStore = useAccountStore();

export interface TransactionFilter {
  accountId?: string;
}

const props = defineProps<{ filter?: TransactionFilter }>();

interface ExtendedFullTransaction extends FullTransaction {
  color: string;
  currency: Currency;
  accountSubBalance: number;
}

const transactions = computed<ExtendedFullTransaction[]>(
  (): ExtendedFullTransaction[] => {
    const filter = props.filter;
    const transactions = transactionStore.transactions
      .filter((t) => (filter ? t.accountId === filter.accountId : true))
      .map((t) => {
        const category = categoryStore.categories.find(
          (c) => c.category === t.category,
        );
        const account = accountStore.getById(t.accountId);
        return {
          ...t,
          color: category ? category.color : 'transparent',
          currency: account ? account.currency : 'USD',
          accountSubBalance: 0,
        };
      });

    let subBalance = 0;
    for (const transaction of transactions) {
      subBalance = sum(subBalance, transaction.amount, transaction.currency);
      transaction.accountSubBalance = subBalance;
    }

    return transactions;
  },
);
</script>

<template>
  <UContainer class="mt-6">
    <UCard>
      <!--      <pre v-if="transactions.length">{{ transactions[0] }}</pre>-->
      <ul>
        <li
          v-for="(transaction, index) of transactions.slice().reverse()"
          :key="index"
        >
          <NuxtLink
            :to="`/transaction/${transaction.id}`"
            class="flex justify-between items-start my-1"
          >
            <DateView :date="transaction.date" class="w-16" />
            <CategoryColorBox
              :color="transaction.color"
              :extended="!props.filter?.accountId"
            />
            <div class="flex-grow ml-2">
              <p v-if="!props.filter?.accountId" class="text-xs">
                {{ transaction.account }}
              </p>
              <p class="font-bold">{{ transaction.payee }}</p>
              <p class="text-xs">{{ transaction.category }}</p>
            </div>
            <div class="text-right">
              <p
                :class="textColorByAmount(transaction.amount)"
                class="font-bold"
              >
                {{ formatAmount(transaction.amount) }}
                {{ transaction.currency }}
              </p>
              <p class="text-sm text-gray-700">
                {{ formatAmount(transaction.accountSubBalance) }}
                {{ transaction.currency }}
              </p>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </UCard>
  </UContainer>
</template>

<style scoped></style>