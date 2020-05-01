import { useLocation } from 'react-router-dom';

export const useQueryParams = () => {
  const location = useLocation();
  const params = {};
  for (const [key, value] of new URLSearchParams(location.search)) {
    params[key] = value;
  }
  return params;
};
