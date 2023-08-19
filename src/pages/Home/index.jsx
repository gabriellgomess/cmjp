import React, { useContext } from 'react';

import UserContext from '../../components/Context';

import Cards from '../../components/Cards'


export function Home() {
  const { user } = useContext(UserContext);

  return (
    <>
      <Cards />
    </>

  );
}
