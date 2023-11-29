<script setup lang="ts">
import { useMeta } from 'quasar';
import { PackageList, Package } from 'src/@types/application';
import { npmApi } from 'src/boot/axios';
import { getDom, scrollToElement } from 'src/utils';

// props
interface Props {
  query: string;
}
const props = defineProps<Props>();

// vars
const packages = ref<PackageList>([]);
const page = ref<number>(1);
const pageSize = ref<number>(20);

// data
async function getPackages() {
  const { data } = await npmApi.get(
    `/-/v1/search?text=vue ${props.query}&size=${pageSize.value}&from=${page.value}`
  );

  return data;
}

const data = await getPackages();

// methods
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setPackageList(data: { objects: any }) {
  const result = data.objects;
  const tempRes: PackageList = [];

  result.forEach((item: { package: Package }) => {
    tempRes.push({
      name: item.package.name,
      description: item.package.description,
      keywords: item.package.keywords,
    });
  });
  packages.value = tempRes;
}

setPackageList(data);

async function onPageChange(value: number) {
  page.value = value;
  const data = await getPackages();

  setPackageList(data);

  const searchResults = getDom('#searchResults');
  scrollToElement(searchResults, 300);
}

// meta data
useMeta({
  title: `Search results: ${props.query}`,
  meta: {
    description: {
      name: 'description',
      content: `Search results for ${props.query}`,
    },
  },
});
</script>

<template>
  <q-page class="search-page">
    <SSearch />
    <!-- Searching for {{ query }}. found {{ packages.length }} packages -->
    <h4 class="q-mb-lg" id="searchResults">Search results: {{ query }}</h4>

    <div class="package-list">
      <SCard v-for="pkg in packages" :key="pkg.name" :pkg="pkg" />
    </div>
    <div class="q-pa-lg q-my-lg flex flex-center">
      <q-pagination
        v-model="page"
        :max="Math.ceil(data.total / pageSize)"
        :max-pages="6"
        boundary-numbers
        @update:model-value="onPageChange"
      />
    </div>
  </q-page>
  <q-separator />
</template>

<style scoped>
.search-page {
  padding-top: 2%;
  margin-left: 20%;
  margin-right: 20%;
}

.package-list {
  & > * + * {
    margin-top: 1rem;
  }
}
</style>
