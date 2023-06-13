export const getFileExtension = (mimeType: string): string => {
  const extensions: any  = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/gif': 'gif'
  }
  return extensions[mimeType];
}