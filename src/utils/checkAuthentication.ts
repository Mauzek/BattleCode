export const checkAuthentication = (): boolean => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  return true;  
  // try {
  //   const payload = JSON.parse(atob(token.split(".")[1]));
  //   return payload.exp > Date.now() / 1000;
  // } catch {
  //   return false;
  // }
};