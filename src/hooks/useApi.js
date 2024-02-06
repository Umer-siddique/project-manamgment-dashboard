import { useState } from "react";
import api from "../services/api";

const useApi = () => {
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiCall = async (url, method = "get", data = null) => {
    setLoading(true);
    try {
      const token = JSON.parse(localStorage.getItem("token"));

      console.log(token);

      const headers = {};
      if (token) {
        headers.Authorization = `Bearer ${token}`;
      }

      const response = await api({
        method,
        url,
        data,
        headers,
      });

      setLoading(false);
      return response.data;
    } catch (error) {
      setLoading(false);
      setError(error.response ? error?.response?.data : "Something went wrong");
      throw error;
    }
  };

  const clearError = () => {
    setError(null);
  };

  return { isLoading, error, apiCall, clearError };
};

export default useApi;
