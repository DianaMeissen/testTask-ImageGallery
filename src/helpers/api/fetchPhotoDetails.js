import fetchToken from './fetchToken';
import getData from '../localStorage/getData';
import { tokenName } from '../localStorage/constants';

export default async function fetchPhotoDetails(id) {
  let errorCount = 0;
  const UNAUTORIZED = "Unauthorized";

  const response = await fetch(`http://interview.agileengine.com/images/${id}`, {
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
        fetchPhotoDetails(id);
      }
      errorCount += 1;
    }
  }

  return photos;
}