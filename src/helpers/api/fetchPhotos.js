import fetchToken from './fetchToken';
import getData from '../localStorage/getData';
import { tokenName } from '../localStorage/constants';

export default async function fetchPhotos(page = 1) {
  let errorCount = 0;
  const UNAUTORIZED = "Unauthorized";

  const response = await fetch(`http://interview.agileengine.com/images?page=${page}`, {
    method: 'GET',
    mode: 'cors',
    cache: 'default',
    headers: {
      'Authorization': `Bearer ${getData(tokenName)}`
    }
  });

  let photos = {};
  try {
    photos = await response.json();
    if (photos.status === UNAUTORIZED) {
      throw new Error(UNAUTORIZED);
    }
  } catch (e) {
    if (e === UNAUTORIZED) {
      await fetchToken();
      if (errorCount === 0) {
        fetchPhotos(page);
      }
      errorCount += 1;
    }
  }

  return photos;
}