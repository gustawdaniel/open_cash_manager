<script lang="ts" setup>
import ExtendableListEditForm from '../expandableList/ExtendableListEditForm.vue';
import type { PersistedProject } from '~/store/project';

defineProps<{ project: PersistedProject }>();
</script>

<template>
  <ExtendableListEditForm :init-value="project" resource="project" />
</template>
