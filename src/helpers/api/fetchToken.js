import storeData from '../localStorage/storeData';
import { tokenName } from '../localStorage/constants';

export default async function fetchToken() {
  const response = await fetch('http://interview.agileengine.com/auth', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ "apiKey": "23567b218376f79d9415" })
  });

  try {
    const resData = await response.json();
    if (resData.token) {
      storeData(tokenName, resData.token);
    } else {
      throw new Error('Absent or invalid token');
    }

  } catch (e) {
    // cry token is broken
    console.error(e);
  }
}