import { useEffect, useState } from "react";
import axios from "axios";

export function useAxios(url) {
  const [request, setRequest] = useState({
    loading: false,
    data: null,
    error: false,
  });

  useEffect(() => {
    setRequest({
      loading: true,
      data: null,
      error: false,
    });
    axios
      .get(url)
      .then((response) => {
        console.log(response)
        setRequest({
          loading: false,
          data: response.data,
          error: false,
        });
        // console.log(response.data);
      })
      .catch(() => {
        setRequest({
          loading: false,
          data: null,
          error: true,
        });
      });
  }, [url]);

  return request;
}

// export default useAxios;
