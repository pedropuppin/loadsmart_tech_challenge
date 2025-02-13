import { useState, useEffect, useCallback } from "react";
import api from "../services/api";
import { PaginatedResponse } from "../types";

function usePaginatedData<T>(endpoint: string, page: number) {
  const [data, setData] = useState<T[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = useCallback(() => {
    api.get<PaginatedResponse<T>>(`${endpoint}?page=${page}`)
      .then((response) => {
        setData(response.data.results);
        setTotalCount(response.data.count);
      })
      .catch((error) => console.error(`Error fetching ${endpoint}:`, error));
  }, [endpoint, page]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, totalCount, refetch: fetchData };
}

export default usePaginatedData;
