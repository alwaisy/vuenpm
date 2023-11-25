<script setup>
const columns = [
  {
    name: 'name',
    required: true,
    label: 'Package Name',
    align: 'left',
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: false,
  },
  {
    name: 'description',
    align: 'left',
    label: 'Description',
    field: 'description',
    sortable: false,
  },
  {
    name: 'repo',
    align: 'center',
    label: 'Repo',
    field: 'repo',
    sortable: false,
    type: 'link',
  },
  {
    name: 'copy',
    label: 'Copy Command',
    field: 'copy',
  },
];

const rows = [
  /* {
    name: 'Frozen Yogurt',
    description: 159,
    repo: 6.0,
  },
  {
    name: 'Ice cream sandwich',
    description: 237,
    repo: 9.0,
  },
  {
    name: 'Eclair',
    description: 262,
    repo: 16.0,
  },
  {
    name: 'Cupcake',
    description: 305,
    repo: 3.7,
  },
  {
    name: 'Gingerbread',
    description: 356,
    repo: 16.0,
  },
  {
    name: 'Jelly bean',
    description: 375,
    repo: 0.0,
  },
  {
    name: 'Lollipop',
    description: 392,
    repo: 0.2,
  },
  {
    name: 'Honeycomb',
    description: 408,
    repo: 3.2,
  },
  {
    name: 'Donut',
    description: 452,
    repo: 25.0,
  },
  {
    name: 'KitKat',
    description: 518,
    repo: 26.0,
  }, */
];
</script>

<template>
  <q-page class="vue3-packages">
    <RouterLink to="/" class="logo">
      <h4 class="text-h4 text-weight-bold text-secondary text-center">
        VueNpm
      </h4>
    </RouterLink>
    <q-table
      title="Curated Vue 3 packages"
      :rows="rows"
      :columns="columns"
      flat
      bordered
      row-key="name"
      no-data-label="I didn't find anything for you"
      class="q-mt-lg"
    >
      <template v-slot:body-cell-repo="props">
        <q-td :props="props">
          <a href="https://github.com/vuejs/vue-next" target="_blank">
            <q-btn
              size="sm"
              flat
              color="secondary"
              label="Visit"
              icon="link"
              no-caps
              class="q-px-sm"
            />
          </a>
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
  </q-page>
</template>

<style scoped>
.logo {
  text-decoration: none;
}
.vue3-packages {
  /* min-height: 90vh !important; */
  padding-top: 2%;
  margin-left: 20%;
  margin-right: 20%;
}
</style>
