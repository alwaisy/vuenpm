<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <RouterView v-slot="{ Component }">
        <template v-if="Component">
          <Suspense>
            <!-- main content -->
            <component :is="Component" :key="$route.fullPath"></component>

            <!-- loading state -->
            <template #fallback>
              <div v-if="error">Please keep calm, we are fixing servers</div>
              <div v-else>Loading...</div>
            </template>
          </Suspense>
        </template>
      </RouterView>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { useQuasar } from 'quasar';

const error = ref<boolean>(false);
const $q = useQuasar();

onErrorCaptured((e, instance, info) => {
  console.log(e, instance, info);

  error.value = true;

  $q.notify({
    color: 'negative',
    message: `Error: ${e.message} in ${info}`,
    icon: 'report_problem',
  });
});
</script>
