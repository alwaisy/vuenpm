<script setup lang="ts">
import { Package } from 'src/@types/application';

interface Props {
  pkg: Package;
}

defineProps<Props>();

//vars
const route = useRoute();
</script>

<template>
  <q-card flat bordered>
    <RouterLink
      :to="`/package/${encodeURIComponent(pkg.name)}?from=search&was=${
        route.query.q
      }`"
    >
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ pkg.name }}</div>
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        {{ pkg.description }}
      </q-card-section>
    </RouterLink>
  </q-card>
</template>

<style scoped>
a {
  all: unset;
  cursor: pointer;
}
</style>
