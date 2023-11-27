<script setup lang="ts">
import { PackageList, Package } from 'src/@types/application';
import { npmApi } from 'src/boot/axios';

// vars & refs
const query = ref('');
const packages = ref<PackageList>([]);
const router = useRouter();

// props

// methods
async function onSearch() {
  const { data } = await npmApi.get(`/-/v1/search?text=vue ${query.value}`);
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

const onSearchEnter = async () => {
  console.log(query.value, 'onSearch');
  if (!query.value) return;
  router.push(`/search/${encodeURIComponent(query.value)}?q=${query.value}`);
};

// computed
const isQueryExist = computed(() => {
  return packages.value
    ?.filter(
      (item) =>
        item.name?.includes(query.value) || item.keywords?.includes(query.value)
    )
    .slice(0, 4);
});

const searchBtnLabel = computed(() => {
  return query.value
    ? `View all results for ${query.value}`
    : 'Curated Vue3 packages';
});

const searchBtnTo = computed(() => {
  return query.value
    ? `search/${encodeURIComponent(query.value)}?q=${query.value}`
    : 'vue3-packages';
});
</script>

<template>
  <div class="search">
    <q-input
      v-model="query"
      filled
      class="search-input"
      placeholder="Search vue packages"
      input-class="text-secondary"
      @update:model-value="onSearch"
      @keydown.enter="onSearchEnter"
    />
  </div>
  <div>
    <q-list class="q-mt-md" style="max-width: 40rem">
      <template v-if="query && isQueryExist">
        <q-item
          clickable
          v-ripple
          :to="`package/${encodeURIComponent(search.name)}?from=home`"
          v-for="(search, i) in isQueryExist"
          :key="search.name"
          :class="[{ 'list-item': i !== isQueryExist.length - 1 }]"
        >
          <q-item-section>
            <q-item-label lines="1" class="q-mb-sm">
              {{ search.name }}
            </q-item-label>
            <q-item-label caption lines="2">
              {{ search.description }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top> 1 min ago </q-item-section>
        </q-item>
      </template>

      <template v-if="query && !isQueryExist?.length">
        <q-item>
          <q-item-section>
            <q-item-label>...</q-item-label>
          </q-item-section>
        </q-item>
      </template>
    </q-list>

    <q-separator class="q-my-md" v-if="query" />

    <div class="text-center">
      <q-btn
        flat
        no-caps
        class="text-secondary text-weight-regular text-caption"
        :to="searchBtnTo"
        :label="searchBtnLabel"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.search {
  max-width: 40rem;

  &-input {
    width: 40rem;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 0 0.5rem 0 rgba(0, 0, 0, 0.01),
      0.25rem 0.5rem 1rem 0 rgba(0, 48, 111, 0.08);
    color: $secondary;
  }
}

.list-item {
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
}
</style>
