
import React from 'react';
import { useParams, Navigate } from 'react-router-dom';
import Layout from '../components/Layout';
import CityHomepage from '../components/CityHomepage';
import { getCityBySlug } from '@/data/cities';

const CityPages = () => {
  const { citySlug } = useParams<{ citySlug: string }>();
  
  if (!citySlug) {
    return <Navigate to="/" replace />;
  }

  const cityData = getCityBySlug(citySlug);
  
  if (!cityData) {
    return <Navigate to="/" replace />;
  }

  return (
    <Layout
      title={`${cityData.name} Pressure Washing & Window Cleaning | BC Pressure Washing`}
      description={`BC Pressure Washing offers top-rated pressure washing & window cleaning in ${cityData.name}, BC. Call (778) 555-1234 for a free quote!`}
      image="/lovable-uploads/5608bf56-7f0e-4f7f-9bb0-5ba81b9d267e.png"
      canonicalUrl={`/${cityData.slug}`}
    >
      <CityHomepage cityData={cityData} />
    </Layout>
  );
};

export default CityPages;
