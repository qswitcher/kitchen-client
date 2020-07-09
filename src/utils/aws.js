import { Storage } from 'aws-amplify';
import config from '../config';

export async function s3Upload(file) {
  const filename = `${Date.now()}-${file.name}`;

  const stored = await Storage.put(filename, file, {
    contentType: file.type,
  });

  return stored.key;
}

export async function remove(key) {
  return await Storage.remove(key);
}

export function imageUrl(key) {
  return `https://${config.s3.BUCKET}.s3.amazonaws.com/public/${key}`;
}

export function thumbnailUrl(key) {
  return `https://${config.s3.BUCKET}.s3.amazonaws.com/thumbnails/414x233/${key}`;
}
