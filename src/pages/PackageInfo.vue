<script setup lang="ts">
import { useMeta } from 'quasar';
import { PkgDetails } from 'src/@types/application';
import { npmApi, npmDownloadsCountApi } from 'src/boot/axios';
import { timeAgo } from 'src/utils/date-time';

// props
interface Props {
  name: string;
}
const props = defineProps<Props>();
const { data } = await npmApi.get(`/${props.name}`);
const downloadsPerWeek = await npmDownloadsCountApi.get(
  `/last-week/${props.name}`
);

const route = useRoute();
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
    name: data.author?.name,
    url: data.author?.url,
  },
  scope: data.scope,
  time: {
    published: timeAgo(data.time.created),
    modified: timeAgo(data.time[data['dist-tags'].latest]),
  },
  version: data['dist-tags'].latest,
  weeklyDownloads: downloadsPerWeek.data.downloads,
  license: data.license,
};

pkg.value = tempRes;

// meta data
useMeta({
  title: pkg.value.name + ' - VueNpm',
  meta: {
    description: {
      name: 'description',
      content: pkg.value.description,
    },
  },
});

const backToLabel = computed(() => {
  return `Back to ${route.query.from}`;
});
const backToLink = computed(() => {
  return route.query.from === 'home'
    ? '/'
    : `/${route.query.from}/${route.query.was}?q=${route.query.was}`;
});
</script>

<template>
  <q-page class="pkginfo-page">
    <SSearch />
    <q-btn
      flat
      color="secondary"
      :label="backToLabel"
      :to="backToLink"
      no-caps
      size="sm"
      class="q-mb-md"
      icon="arrow_back"
    />
    <PiInfoCard :pkg="pkg" />
  </q-page>
  <q-separator />
</template>

<style scoped>
.pkginfo-page {
  padding-top: 2%;
  margin-left: 20%;
  margin-right: 20%;
}
</style>
