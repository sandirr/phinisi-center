import React from 'react';
import Elements from '../../Elements';
import Fragments from '../../Fragments';

export default function Component() {
  return (
    <>
      <Elements.Header />
      <Fragments.Hero />
      <Fragments.SejarahFilosofi />
      <Fragments.PopularArticle />
      <Fragments.PembuatanPhinisi />
      <Elements.Footer />
    </>
  );
}
