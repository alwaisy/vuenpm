<script setup lang="ts">
// vars & refs
const route = useRoute();
const query = ref(route.query.q as string);
const router = useRouter();

// props

// methods

async function onSearchEnter() {
  // console.log(query.value, 'onSearch');
  if (!query.value) return;
  router.push(`/search/${encodeURIComponent(query.value)}?q=${query.value}`);
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
        @keydown.enter="onSearchEnter"
      />
      <q-btn
        icon="search"
        unelevated
        color="secondary"
        no-caps
        class="search-btn"
        @click="onSearchEnter"
        :disable="!query"
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
