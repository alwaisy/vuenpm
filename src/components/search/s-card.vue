<script setup lang="ts">
import { Package } from 'src/@types/application';

interface Props {
  pkg: Package;
}

defineProps<Props>();
</script>

<template>
  <q-card flat bordered>
    <RouterLink :to="`/package/${encodeURIComponent(pkg.name)}`">
      <q-card-section>
        <div class="row items-center no-wrap">
          <div class="col">
            <div class="text-h6">{{ pkg.name }}</div>
            <!-- <div class="text-subtitle2">by John Doe</div> -->
          </div>
        </div>
      </q-card-section>

      <q-card-section>
        {{ pkg.description }}
      </q-card-section>

      <!-- <q-separator /> -->

      <!--  <q-card-actions>
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions> -->
    </RouterLink>
  </q-card>
</template>

<style scoped>
a {
  all: unset;
  cursor: pointer;
}
</style>
