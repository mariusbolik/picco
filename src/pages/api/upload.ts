import type { APIRoute } from 'astro';
import { Storage,  InputFile } from 'node-appwrite';
import { getFileExtension } from '../../utils/utils';
import { client } from '../../providers/appwrite';
import { nanoid } from 'nanoid';

export const post: APIRoute = async ({ params, request }) => {

  const formData = await request.formData();

  const blob = formData.get('file') as Blob;

  const fileId = nanoid(10);
  const fileExt = getFileExtension(blob.type)
  const fileName = `${fileId}.${fileExt}`;

  const file: InputFile = await InputFile.fromBlob(blob, fileName);

  try {
    // Step 1: Upload File
    const storage = new Storage(client);
    const upload = await storage.createFile('uploads', fileId, file);

    // Step 2: Assign file to document to be able to add meta data to a file
    // const databases = new Databases(client);
    // await databases.createDocument('main', 'files', ID.unique(), {
    //   title: 'this is the title',
    //   description: 'this is the description',
    //   fileId: upload.$id,
    //   type: upload.mimeType,
    //   size: upload
    // });
    return {
      body: JSON.stringify(upload)
    }
  } catch (error: any) {
    return {
      body: JSON.stringify(error.response)
    }
  }

};

export const get: APIRoute = ({ params, request }) => {
  return {
    body: JSON.stringify({
      error: {
        code: 400,
        message: 'Method not allowed'
      }
    })
  }
};

interface FileUploadBody {

}