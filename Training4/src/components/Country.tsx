import { useQuery } from '@tanstack/react-query';
import { IDataCountry, fetchCountry } from '../app/api';

function Country({ value }: { value: string }) {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['country', value],
    queryFn: async () => fetchCountry(value),
    retry: 1,
  });

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Not found country</div>;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: 12 }}>
      {(data.data as IDataCountry[]).map((country) => (
        <div
          style={{ border: '1px solid black' }}
          key={country.name.official || country.name.common}
        >
          <p>Common name: {country.name.common}</p>
          <p>Official: {country.name.official}</p>
          <p>region: {country.region}</p>
        </div>
      ))}
    </div>
  );
}

export default Country;
