import { HTTP_METHODS } from "~/utils/constants";

const useHttpRequest = async (url, method = HTTP_METHODS.GET, body) => {
  const config = useRuntimeConfig();
  const accessToken = useCookie("accessToken");

  // Check if accessToken is available
  const token = accessToken?.value;
  console.log("Token:", token); // Verify token value

  return useFetch(url, {
    baseURL: config.public.API_URL,
    method: method,
    body: body,
    headers: {
      Accept: "application/json, text/plain, */*",
      Authorization: token ? `Bearer ${token}` : "", 
    },
  });
};

export default useHttpRequest;
