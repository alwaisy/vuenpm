<script setup lang="ts">
import { PackageList, Package } from 'src/@types/application';
import { npmApi } from 'src/boot/axios';

// vars & refs
const query = ref('');
const packages = ref<PackageList>([]);
const router = useRouter();

// props
interface Props {
  page: number;
  pageSize: number;
}
const props = defineProps<Props>();

// methods
async function onSearch() {
  const { data } = await npmApi.get(
    `/-/v1/search?text=vue ${query.value}&size=${props.pageSize}&from=${
      (props.page - 1) * props.pageSize
    }`
  );
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

async function onSearchEnter() {
  // console.log(query.value, 'onSearch');
  if (!query.value) return;
  router.push(
    `/search/${encodeURIComponent(query.value)}&size=${props.pageSize}&from=${
      (props.page - 1) * props.pageSize
    }`
  );
}

// computed
</script>

<template>
  <div class="s-search">
    <RouterLink class="s-search__logo" to="/">VueNpm</RouterLink>

    <div class="s-search__input">
      <q-input
        v-model="query"
        square
        class="search-input"
        placeholder="Search vue packages"
        input-class="text-secondary"
        @update:model-value="onSearch"
        @keydown.enter="onSearchEnter"
      />
      <q-btn
        icon="search"
        unelevated
        color="secondary"
        no-caps
        class="search-btn"
        @click="onSearchEnter"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.s-search {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 100%;
  column-gap: 1rem;
  margin-bottom: 5%;

  &__logo {
    // width: 8%;
    font-size: 2rem;
    text-align: center;
    font-weight: 900;
    text-decoration: none;
    color: $secondary;
  }
  &__input {
    width: 89%;
    display: flex;
  }
}

.search-input {
  width: 100%;
  /*box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 0 0.5rem 0 rgba(0, 0, 0, 0.01),
    0.25rem 0.5rem 1rem 0 rgba(0, 48, 111, 0.08); */
  color: $secondary;
}
.search-btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
