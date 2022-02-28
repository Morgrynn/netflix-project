import { useEffect } from 'react';
import Router from 'next/router';
import useRequest from '../../hooks/useRequest';

export default () => {
  const { doRequest } = useRequest({
    url: '/api/users/logout',
    method: 'get',
    onSuccess: () => Router.push('/auth/login'),
  });

  useEffect(() => {
    doRequest();
  }, []);
  
  return <div>Logging you out... </div>;
};
