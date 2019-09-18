import { useState, useEffect } from "react";
import axios from "axios";
const useFetch = (url: string) => {
  const [apiData, setApiData] = useState({ loading: true, data: [] });
  async function fetchUrl() {
    try {
      const response = await axios.get(url);
      const data = await response.data;
      setApiData({ loading: false, data });
    } catch (e) {
      setApiData({ ...apiData, loading: false });
    }
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  let { loading, data } = apiData;
  return [data, loading];
};
export { useFetch };
