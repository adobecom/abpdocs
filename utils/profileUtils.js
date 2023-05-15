import { getSessionStorage, setSessionStorage } from './sessionStorageUtils.js';

const PROFILE_URL = '/services/profile';

const loadProfileDetails = async () => {
  let profileData = getSessionStorage('profile');
  if (!profileData) {
    try {
      const response = await fetch(PROFILE_URL, { headers: { 'Content-Type': 'application/json' } });
      profileData = await response.json();
      setSessionStorage('profile', profileData?.details);
    } catch (e) {
      console.log('error in fetching the user data', e);
    }
  }
};

export default loadProfileDetails;
