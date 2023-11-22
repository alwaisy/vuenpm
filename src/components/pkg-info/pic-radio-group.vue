<script setup lang="ts">
const preferredPm = ref('npm');

const pmList = ['npm', 'pnpm', 'yarn'];
</script>

<template>
  <div class="q-gutter-sm">
    <q-radio
      v-model="preferredPm"
      :val="pm"
      :label="pm"
      v-for="pm in pmList"
      :key="pm"
      checked-icon="task_alt"
      unchecked-icon="panorama_fish_eye"
    />
  </div>

  <div>
    <p class="text-caption">
      Now all packages will be installed with

      <i>{{ preferredPm }}</i>
    </p>
  </div>
</template>
