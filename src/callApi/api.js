import axios from "axios";

const api = async (method = "get", url = "/todos", body = {}) => {
  const option = {
    method: method,
    url: url
  };
  if (method === "post" || method === "patch") {
    option.body = body;
  }
  return await axios(option);
};

export default api;
