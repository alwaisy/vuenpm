<template>
  <div class="footer">
    <div class="q-my-md">
      <RouterLink
        to="/"
        class="text-h6 q-mb-sm text-weight-bold text-secondary link"
        >VueNpm</RouterLink
      >
      <div class="text-subtitle">
        Nothing else, just a simple VueJs packages search engine. Also there is
        a curated list of popular Vue 3 packages.
      </div>
      <div class="q-mt-lg">
        <RouterLink to="/feeling-lucky" class="link">
          Feeling lucky
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.footer {
  font-family: 'Nunito', sans-serif;
  margin-left: 20%;
  margin-right: 20%;
}

.link {
  text-decoration: none;
  color: var(--q-secondary);
}
</style>
