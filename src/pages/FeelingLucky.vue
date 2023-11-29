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
  <q-page class="feeling-lucky">
    <RouterLink to="/" class="logo">
      <h4 class="text-h4 text-weight-bold text-secondary text-center">
        VueNpm
      </h4>
    </RouterLink>
    <PackagesTable :rows="rows" />
  </q-page>

  <!-- don't need separator -->
  <!-- <q-separator /> -->
</template>

<style scoped>
.logo {
  text-decoration: none;
}
.feeling-lucky {
  padding-top: 2%;
  margin-left: 20%;
  margin-right: 20%;
}
</style>
