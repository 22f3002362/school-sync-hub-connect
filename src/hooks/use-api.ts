
import { useState, useCallback } from 'react';

type ApiResponse<T> = {
  data: T | null;
  loading: boolean;
  error: Error | null;
  execute: (...args: any[]) => Promise<T>;
};

export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<Response>
): ApiResponse<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: any[]): Promise<T> => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await apiFunction(...args);
        
        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }
        
        const responseData = await response.json();
        setData(responseData);
        return responseData;
      } catch (err) {
        const error = err instanceof Error ? err : new Error(String(err));
        setError(error);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [apiFunction]
  );

  return { data, loading, error, execute };
}
