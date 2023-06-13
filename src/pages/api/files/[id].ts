import type { APIRoute } from 'astro';
import { Client, Account, Storage, ID, InputFile, Databases, Models } from 'node-appwrite';
import { client } from '../../../providers/appwrite';

export const get: APIRoute = async ({ params, request }) => {

  try {

    // const documentId = params.id as string;

    // Step 1: Get Document
    // const databases = new Databases(client);
    // const document = await databases.getDocument('main', 'files', documentId);

    
    // Step 2: Get File
    const storage = new Storage(client);
    const fileId = params.id as string;
    const file = await storage.getFile('uploads', fileId);

    return {
      body: JSON.stringify(file)
    }
  } catch (error: any) {
    return {
      body: JSON.stringify(error.response)
    }
  }

};