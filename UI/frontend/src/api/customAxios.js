import axios from "axios";
const baseUrl = "https://localhost:7044/api";

let CustomAxios =
axios.create({
  baseURL: baseUrl,
  timeout: 999999,
});

export default CustomAxios;