import { Client } from 'node-appwrite';

export const client = new Client()
  .setEndpoint(import.meta.env.APPWRITE_ENDPOINT) // Your API Endpoint
  .setProject(import.meta.env.APPWRITE_PROJECT)
  .setKey(import.meta.env.APPWRITE_API_SECRET)
  .setSelfSigned(import.meta.env.DEV);
