import axios from 'axios';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

export default function useAuth(code: string): string {
  const [accessToken, setAccessToken] = useState('');
  const [refreshToken, setRefreshToken] = useState('');
  const [expiresIn, setExpiresIn] = useState();

  const router = useRouter();

  useEffect(() => {
    axios
      .post('http://localhost:3000/api/login', { code })
      .then((res) => {
        router.replace('/');
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
      })
      .catch(() => {
        router.push('/');
      });
  }, [code]);

  useEffect(() => {
    if (!refreshToken || !expiresIn) return;

    const interval = setInterval(() => {
      axios
        .post('http://localhost:3000/api/refresh', { refreshToken })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
        })
        .catch((err) => {
          console.log(err);
        });
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return accessToken;
}
