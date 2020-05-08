import { Storage } from 'aws-amplify';
import config from '../config';

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}

export function imageUrl(key) {
  return `https://${config.s3.BUCKET}.s3.amazonaws.com/public/${key}`;
}