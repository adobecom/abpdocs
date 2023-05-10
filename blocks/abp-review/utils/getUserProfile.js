const getUserProfile = async (profileUrl) => {
  const response = await fetch(profileUrl, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
  });
  const jsonData = await response.json();
  return jsonData;
};

export default getUserProfile;
