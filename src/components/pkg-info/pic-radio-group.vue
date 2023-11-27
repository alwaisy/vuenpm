<script setup lang="ts">
import { PmList } from 'src/@types/application';

const preferredPm = ref<PmList>('npm');
const pmList: PmList[] = ['npm', 'pnpm', 'yarn'];

// props
defineProps<{
  mainClass?: string;
  note?: boolean;
}>();

// emits
const emit = defineEmits<{ (e: 'pm-change', pm: PmList): void }>();

// methods
function onPmChange() {
  emit('pm-change', preferredPm.value);
}
</script>

<template>
  <div :class="mainClass">
    <div class="q-gutter-sm">
      <q-radio
        v-model="preferredPm"
        :val="pm"
        :label="pm"
        v-for="pm in pmList"
        :key="pm"
        checked-icon="task_alt"
        unchecked-icon="panorama_fish_eye"
        @update:model-value="onPmChange"
      />
    </div>

    <div v-if="note">
      <p class="text-caption">
        Now all packages will be installed with

        <i>{{ preferredPm }}</i>
      </p>
    </div>
  </div>
</template>
