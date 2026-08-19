import { useSearchParams } from 'react-router-dom';
import Clients from './Clients';
import ClientDetail from './ClientDetail';

const ClientRoute = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const customerId = searchParams.get('customer');

  if (customerId) {
    return <ClientDetail customerId={customerId} onBack={() => setSearchParams({})} />;
  }

  return <Clients />;
};

export default ClientRoute;
