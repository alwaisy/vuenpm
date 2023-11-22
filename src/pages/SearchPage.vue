<script setup lang="ts">
import { PackageList, Package } from 'src/@types/application';
import { npmApi } from 'src/boot/axios';

// props
interface Props {
  query: string;
}
const props = defineProps<Props>();

const { data } = await npmApi.get(`/-/v1/search?text=vue ${props.query}`);

const packages = ref<PackageList>([]);
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
</script>

<template>
  <div class="search-page">
    <SSearch />
    <!-- Searching for {{ query }}. found {{ packages.length }} packages -->
    <h4>Search results: {{ query }}</h4>

    <div class="package-list">
      <SCard v-for="pkg in packages" :key="pkg.name" :pkg="pkg" />
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
