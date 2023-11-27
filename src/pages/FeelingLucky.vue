<script setup>
import { npmApi } from 'src/boot/axios';
import { db } from 'src/config';

// data
const rows = ref([
  {
    name: '',
    description: '',
    repo: '',
  },
]);

// method
async function getData() {
  const tempRes = [];

  // Assuming dbData is reactive and you're fetching it in onMounted or elsewhere
  const dbData = await db.listDocuments(
    import.meta.env.VN_APPWRITE_DB_ID,
    import.meta.env.VN_APPWRITE_PKG_COLL
  );

  // Use map to return an array of promises
  const promises = dbData.documents.map(async (item) => {
    const { data: tempData } = await npmApi.get(`/${item.name}`);
    tempRes.push({
      index: tempRes.length + 1,
      name: tempData?.name,
      description: tempData?.description,
      repo: tempData?.repository?.url.replace('git+', ''),
    });
  });

  // Wait for all promises to complete
  await Promise.all(promises);

  // Now set the value of rows
  rows.value = tempRes;
}

// call the method
await getData();
</script>

<template>
  <q-page class="vue3-packages">
    <RouterLink to="/" class="logo">
      <h4 class="text-h4 text-weight-bold text-secondary text-center">
        VueNpm
      </h4>
    </RouterLink>
    <PackagesTable :rows="rows" />
  </q-page>
</template>

<style scoped>
.logo {
  text-decoration: none;
}
.vue3-packages {
  /* min-height: 90vh !important; */
  padding-top: 2%;
  margin-left: 20%;
  margin-right: 20%;
}
</style>
