import {useState} from 'react';
import axios from 'axios';
import {getStoredData} from '../common/credintials';

function useHttp() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequests = async (requestConfig, applyData) => {
    setIsLoading(true);
    setError(null);

    const headers = requestConfig.headers ? requestConfig.headers : {};

    // Gets token from localStorage
    if (requestConfig.url.isAuthRequired) {
      let auth_token = await getStoredData('auth_tk');
      if (auth_token && Object.keys(auth_token)?.length > 0) {
        auth_token = `Bearer ${auth_token.access}`;
      }
      headers['Authorization'] = auth_token;
    }

    await axios({
      url: requestConfig.url.url,
      method: requestConfig.method ? requestConfig.method : 'GET',
      headers: {
        Accept: 'application/json',
        ...headers,
      },
      data: JSON.stringify(requestConfig.data) ? requestConfig.data : null,
      params: requestConfig.params ? requestConfig.params : {},
    })
      .then(res => res.data)
      .then(data => {
        setIsLoading(false);
        applyData(data);
      })
      .catch(err => {
        if (err && err.response && err.response.status === 500) {
          setError({
            general: ['Something went wrong. Please try again later.'],
          });
        } else if (err && err.response && err.response.data) {
          setError(err.response.data);
        } else {
          setError({
            general: ['Something went wrong. Please try again later.'],
          });
        }
        setIsLoading(false);
      });
  };

  return {
    isLoading,
    error,
    sendRequests,
  };
}

export default useHttp;
