import { useCallback } from 'react';
import { useQuery } from '@tanstack/react-query';
import { throttle } from '../utils/utils';
import { fetchJoker } from '../app/api';

function Title() {
  const query = useQuery({ queryKey: ['joker'], queryFn: () => fetchJoker() });

  const handleRandom = () => {
    query.refetch();
  };

  const tDebounce = useCallback(throttle(handleRandom, 1000), []);

  // const tDebounceRef = throttle(handleRandom, 800);

  if (query.isLoading) return <div>Loading ...</div>;

  if (query.isError) return <div>Server disconnect</div>;

  return (
    <div>
      <p>{JSON.stringify(query.data?.data)}</p>
      <button onClick={tDebounce}>random</button>
    </div>
  );
}

export default Title;
