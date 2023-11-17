<template>
  <div class="search">
    <q-input
      v-model="query"
      filled
      class="search-input"
      placeholder="Search vue packages"
      input-class="text-secondary"
      @update:model-value="onSearch"
    />
  </div>
  <div>
    {{ query }}
    <q-list class="q-mt-md" style="max-width: 40rem">
      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label lines="1" class="q-mb-sm">
            Brunch this weekend?
          </q-item-label>
          <q-item-label caption lines="2">
            I'll be in your neighborhood doing errands this weekend. Do you want
            to grab brunch?
          </q-item-label>
        </q-item-section>

        <q-item-section side top> 1 min ago </q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label lines="1" class="q-mb-sm">Linear Project</q-item-label>
          <q-item-label caption lines="1">
            Can we schedule a call for tomorrow?
          </q-item-label>
        </q-item-section>

        <q-item-section side top> 1 min ago </q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label lines="1" class="q-mb-sm">
            Brunch this weekend?
          </q-item-label>
          <q-item-label caption lines="2">
            I'll be in your neighborhood doing errands this weekend. Do you want
            to grab brunch?
          </q-item-label>
        </q-item-section>

        <q-item-section side top> 1 min ago </q-item-section>
      </q-item>

      <q-separator />

      <q-item clickable v-ripple>
        <q-item-section>
          <q-item-label lines="1" class="q-mb-sm">Linear Project</q-item-label>
          <q-item-label caption lines="1">
            Can we schedule a call for tomorrow?
          </q-item-label>
        </q-item-section>

        <q-item-section side top> 1 min ago </q-item-section>
      </q-item>
    </q-list>

    <q-separator class="q-my-md" />

    <center>
      <q-btn
        flat
        no-caps
        class="text-secondary text-weight-regular text-caption"
      >
        View all
      </q-btn>
    </center>
  </div>
</template>

<script setup lang="ts">
const query = ref('');

// methods
function onSearch() {
  console.log(query.value);
}
</script>

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
</style>
