<script setup lang="ts">
import { PackageList, Package } from 'src/@types/application';
import { npmApi } from 'src/boot/axios';

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
function setPackageList(data: any) {
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
}
</script>

<template>
  <div class="search-page">
    <SSearch :page="page" :page-size="pageSize" />
    <!-- Searching for {{ query }}. found {{ packages.length }} packages -->
    <h4 class="q-mb-lg">Search results: {{ query }}</h4>

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
  </div>
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
