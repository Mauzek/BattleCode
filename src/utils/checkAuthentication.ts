export const checkAuthentication = (): boolean => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return false;
  }

  try {
    const payloadBase64 = token.split('.')[1];
    if (!payloadBase64) {
      return false;
    }
    const payloadJson = atob(payloadBase64.replace(/-/g, '+').replace(/_/g, '/'));
    const payload = JSON.parse(payloadJson);

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp > currentTime;
  } catch {
    return false;
  }
};