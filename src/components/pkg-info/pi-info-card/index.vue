<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { PkgDetails } from 'src/@types/application';
import VueMarkdown from 'vue-markdown-render';

interface Props {
  pkg?: PkgDetails;
}

const props = defineProps<Props>();
</script>

<template>
  <q-card class="card">
    <q-card-section class="q-mb-md">
      <div class="row justify-between no-wrap">
        <div class="basic-info">
          <h4 class="text-h4">{{ pkg?.name }}</h4>
          <p class="text-caption text-lightShadeOne text-weight-regular">
            {{ pkg?.version }} - Last published {{ pkg?.time?.modified }}
          </p>
          <p class="text-subtitle">{{ pkg?.description }}</p>
        </div>
        <div class="">
          <p class="text-subtitle2">Select Package manager</p>
          <pic-radio-group />
        </div>
      </div>
    </q-card-section>

    <q-separator />
    <q-card-section class="row justify-between">
      <p>weekly downloads</p>
      <p>license</p>
      <p>repository</p>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <article>
        <VueMarkdown :source="pkg?.readme" />
      </article>
    </q-card-section>

    <!-- <q-separator /> -->

    <!--  <q-card-actions>
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions> -->
  </q-card>
</template>

<style scoped lang="scss">
.card {
  padding: 2rem;
}
.basic-info {
  & > * + * {
    margin-top: 0.5rem;
  }
}

article {
  line-height: unset;
  & ::v-deep(h1) {
    font-size: 2rem;
  }
  & ::v-deep(h2) {
    font-size: 1.5rem;
  }
  & ::v-deep(h3) {
    font-size: 1rem;
  }
}
</style>
