import axios from "axios";
import { BACKEND_URL } from "../utils/constants";

const useAxios = () => {
  const Token = localStorage.getItem("token");

  const instance = axios.create({
    baseURL: BACKEND_URL,
    headers: {
      Authorization: `Bearer ${Token}`,
    },
  });

  return instance;
};

export default useAxios;
