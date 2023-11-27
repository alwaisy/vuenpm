<script setup>
import { limitChars } from 'src/utils';
import { pkgManagers, columns } from 'src/data';
import { copyToClipboard, useQuasar } from 'quasar';

// props
defineProps({
  rows: {
    type: Array,
    required: true,
  },
});

// vars
const $q = useQuasar();
const preferredPm = ref();

function onPmChange(pkgManager) {
  preferredPm.value = pkgManager;
  $q.notify({
    type: 'positive',
    message: `${preferredPm.value} set as preferred package manager`,
    position: 'top',
  });
}

function copyCommand(cmd) {
  copyToClipboard(cmd)
    .then(() => {
      // success!
      $q.notify({
        type: 'positive',
        message: 'Copied to clipboard',
        position: 'top',
      });
    })
    .catch(() => {
      // fail
      $q.notify({
        type: 'negative',
        message: 'Failed to copy to clipboard',
        position: 'top',
      });
    });
}

// so called computed
const installCmd = (pkg) => {
  if (preferredPm.value) {
    return `${preferredPm.value} ${pkgManagers[preferredPm.value].cmd} ${pkg}`;
  }
  return `npm i ${pkg}`;
};
</script>

<template>
  <q-table
    title="Curated Vue 3 packages"
    :rows="rows"
    :columns="columns"
    flat
    bordered
    row-key="name"
    no-data-label="I didn't find anything for you"
    class="q-mt-lg table"
    table-header-class="table-header"
  >
    <template v-slot:top-right>
      <div class="q-pa-md q-gutter-sm">
        <pic-radio-group @pm-change="onPmChange" />
      </div>
    </template>
    <template v-slot:body-cell-name="props">
      <q-td :props="props">
        <div>
          <q-badge color="primary" :label="props.value" />
        </div>
        <div class="my-table-details">
          {{ props.row.details }}
        </div>
      </q-td>
    </template>
    <template v-slot:body-cell-description="props">
      <q-td :props="props">
        <p>
          <q-tooltip
            transition-show="scale"
            transition-hide="scale"
            v-if="props.value?.length > 80"
          >
            {{ props.value }}
          </q-tooltip>
          {{ props.value ? limitChars(props.value, 80) : null }}
        </p>
      </q-td>
    </template>
    <template v-slot:body-cell-repo="props">
      <q-td :props="props">
        <a :href="props.value" target="_blank" v-if="props.value">
          <q-btn
            size="xs"
            outline
            color="secondary"
            icon="link"
            no-caps
            class="q-px-sm"
          />
        </a>
        <q-btn
          size="xs"
          outline
          color="secondary"
          icon="link_off"
          no-caps
          class="q-px-sm"
          v-else
        />
      </q-td>
    </template>
    <template v-slot:body-cell-copy="props">
      <q-td :props="props">
        <q-btn
          dense
          flat
          size="sm"
          color="primary"
          icon="copy_all"
          label="Copy"
          @click="copyCommand(installCmd(props.row.name))"
          no-caps
        />
      </q-td>
    </template>
    <template v-slot:no-data="{ icon, message, filter }">
      <div class="full-width row flex-center text-secondary q-gutter-sm">
        <q-icon size="2em" name="sentiment_dissatisfied" />
        <span> Well this is sad... {{ message }} </span>
        <q-icon size="2em" :name="filter ? 'filter_b_and_w' : icon" />
      </div>
    </template>
  </q-table>
</template>

<style lang="scss" scoped>
::v-deep(.table-header) th {
  font-weight: bold;
}
</style>
