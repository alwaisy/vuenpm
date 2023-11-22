import { Client, Databases } from 'appwrite';

const client = new Client();

client.headers['X-Appwrite-Project'] = import.meta.env.VN_APPWRITE_PROJECT_KEY;
client
  .setEndpoint(import.meta.env.VN_APPWRITE_PROJECT_ENDPOINT)
  .setProject(import.meta.env.VN_APPWRITE_PROJECT_ID);
// .setKey(import.meta.env.VN_APPWRITE_PROJECT_KEY);

const db = new Databases(client);

export { db };
