import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Login from '../features/Login';
import styles from '../styles/Home.module.css';
import Dashboard from './Dashboard';

const Home: NextPage = () => {
  const [code, setCode] = useState<string | null>();

  useEffect(() => {
    setCode(new URLSearchParams(window.location.search).get('code'));
  }, []);

  return code ? <Dashboard code={code} /> : <Login />;
};

export default Home;
