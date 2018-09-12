import axios from "axios";

const api = async (method = "get", data = {}, url = "/todos") => {
  const option = {
    method: method,
    url: url
  };
  if (method === "post" || method === "patch") {
    option.data = data;
  }
  return await axios(option);
};

export default api;
