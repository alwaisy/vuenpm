<!-- eslint-disable vue/multi-word-component-names -->
<script setup lang="ts">
import { PkgDetails, PmList } from 'src/@types/application';
import VueMarkdown from 'vue-markdown-render';
import { copyToClipboard, useQuasar } from 'quasar';
import { pkgManagers } from 'src/data';

interface Props {
  pkg?: PkgDetails;
}
const props = defineProps<Props>();
const $q = useQuasar();

const preferredPm = ref<PmList>();
function onPmChange(pkgManager: PmList) {
  preferredPm.value = pkgManager;
}

// computed
const installCmd = computed(() => {
  if (preferredPm.value) {
    return `${preferredPm.value} ${pkgManagers[preferredPm.value].cmd} ${
      props.pkg?.name
    }`;
  }
  return `npm i ${props.pkg?.name}`;
});

// methods
function copyCommand(cmd: string) {
  copyToClipboard(cmd)
    .then(() => {
      // success!
      $q.notify({
        type: 'positive',
        message: 'Copied to clipboard',
        position: 'top',
      });
    })
    .catch(() => {
      // fail
      $q.notify({
        type: 'negative',
        message: 'Failed to copy to clipboard',
        position: 'top',
      });
    });
}
</script>

<template>
  <q-card class="card">
    <q-card-section class="q-mb-md">
      <div class="row justify-between no-wrap">
        <div class="basic-info">
          <h4 class="text-h4">{{ pkg?.name }}</h4>
          <p class="text-caption text-lightShadeOne text-weight-regular">
            {{ pkg?.version }} - Last published {{ pkg?.time?.modified }}
          </p>
          <p class="text-subtitle">{{ pkg?.description }}</p>
        </div>
        <div class="">
          <p class="text-subtitle2">
            You can choose your preferred package manager
          </p>
          <pic-radio-group @pm-change="onPmChange" note />
        </div>
      </div>
    </q-card-section>

    <q-separator />
    <q-card-section class="row justify-between">
      <div>
        <p class="text-subtitle text-lightShadeOne">Weekly downloads</p>
        <code>{{ pkg?.weeklyDownloads }}</code>
      </div>
      <div>
        <p class="text-subtitle text-lightShadeOne">License</p>
        <code>{{ pkg?.license }}</code>
      </div>
      <div>
        <p class="text-subtitle text-lightShadeOne">Repository</p>
        <a
          :href="`${String(pkg?.links.repository)}?src=vuenpm`"
          class="repo-url"
          target="_blank"
          >Go</a
        >
      </div>
      <div>
        <p class="text-subtitle text-lightShadeOne q-mb-sm">Install</p>
        <div class="install-cmd__wrapper">
          <code class="install-cmd">{{ installCmd }}</code>
          <q-btn
            unelevated
            round
            size="xs"
            color="primary"
            icon="copy_all"
            @click="copyCommand(installCmd)"
          />
        </div>
      </div>
    </q-card-section>
    <q-separator />
    <q-card-section>
      <article>
        <VueMarkdown :source="pkg?.readme" />
      </article>
    </q-card-section>

    <!-- <q-separator /> -->

    <!--  <q-card-actions>
        <q-btn flat>Action 1</q-btn>
        <q-btn flat>Action 2</q-btn>
      </q-card-actions> -->
  </q-card>
</template>

<style scoped lang="scss">
.card {
  padding: 2rem;
  margin-bottom: 6rem;
}
.basic-info {
  & > * + * {
    margin-top: 0.5rem;
  }
}

article {
  line-height: unset;
  & ::v-deep(h1) {
    font-size: 2rem;
  }
  & ::v-deep(h2) {
    font-size: 1.5rem;
  }
  & ::v-deep(h3) {
    font-size: 1rem;
  }
}

.repo-url {
  // text-decoration: none;
  color: black;
}

.install-cmd {
  &__wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  background-color: $lightShadeTwo;
  // color: $primary;
  padding: 0.5rem;
}
</style>
