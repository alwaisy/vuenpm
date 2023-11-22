<script setup lang="ts">
import { PkgDetails } from 'src/@types/application';
import { npmApi } from 'src/boot/axios';
import { timeAgo } from 'src/utils/date-time';

// props
interface Props {
  name: string;
}
const props = defineProps<Props>();
const { data } = await npmApi.get(`/${props.name}`);

const pkg = ref<PkgDetails>();
const tempRes: PkgDetails = {
  name: data.name,
  description: data.description,
  readme: data.readme,
  keywords: data.keywords,
  currentVersion: data.version,
  links: {
    homepage: data?.homepage?.url,
    repository: data?.repository?.url.replace('git+', ''),
  },
  maintainers: data.maintainers,
  author: {
    name: data.author.name,
    url: data.author.url,
  },
  scope: data.scope,
  time: {
    published: timeAgo(data.time.created),
    modified: timeAgo(data.time[data['dist-tags'].latest]),
  },
  version: data['dist-tags'].latest,
};

pkg.value = tempRes;

console.log(pkg.value);

console.log(data);
</script>

<template>
  <div class="pkginfo-page">
    <SSearch />
    <!-- Searching for {{ query }}. found {{ packages.length }} packages -->
    <!-- <h4>Search results: {{ query }}</h4> -->

    <!--  <div class="package-list">
      <SCard v-for="pkg in packages" :key="pkg.name" :pkg="pkg" />
    </div> -->
    <PiInfoCard :pkg="pkg" />
  </div>
</template>

<style scoped>
.pkginfo-page {
  padding-top: 2%;
  margin-left: 20%;
  margin-right: 20%;
}

/* .package-list {
  & > * + * {
    margin-top: 1rem;
  }
} */
</style>
