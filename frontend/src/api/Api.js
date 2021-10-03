import axios from "axios";

export const serviceProviderForPublicGetRequest = async (url, payload = {}) => {
  const URL = url;
  return await axios
    .get(URL, {
      params: payload
    })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};

export const serviceProviderForPostRequest = async (
  url,
  payload = {},
  params = {}
) => {
  const URL = url;
  return await axios(URL, {
    method: "POST",
    data: payload,
    params: params
  })
    .then(response => response)
    .catch(error => {
      throw error;
    });
};
