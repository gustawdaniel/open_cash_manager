import { useLocalStorage } from '@vueuse/core';
import { nextTick } from 'vue';

export async function clearLocalStorage() {
  for (const key of ['account', 'category', 'transaction']) {
    const ls = useLocalStorage(key, []);
    ls.value = [];
    await nextTick();
  }
}
