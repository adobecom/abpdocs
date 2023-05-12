import { getSessionStorage, setSessionStorage } from './sessionStorageUtils.js';

const PROFILE_URL = '/services/profile';

const loadProfileDetails = async () => {
  let profileData = getSessionStorage('profile');
  if (!profileData) {
    try {
      const response = await fetch(PROFILE_URL, { headers: { 'Content-Type': 'application/json' } });
      profileData = await response.json();
    } catch (e) {
      console.log('error in fetching the user data', e);
    }
  }
  setSessionStorage('profile', profileData?.details);
};

export default loadProfileDetails;
