import React from 'react';
import jokeService from '../app/joke_server';
import { useQuery } from '@tanstack/react-query';
import { throttle } from '../utils/utils';

interface IDataJoke {
  type: string;
  setup: string;
  punchline: string;
}

function fetchJoker() {
  return jokeService.get<IDataJoke>('/random');
}

function Title() {
  const query = useQuery({ queryKey: ['joker'], queryFn: () => fetchJoker() });

  const handelRandom = () => {
    query.refetch();
  };

  const tDebounceRef = React.useRef(throttle(handelRandom, 800));

  if (query.isLoading) return <div>Loading ...</div>;

  if (query.isLoading) return <div>Server disconnect</div>;

  return (
    <div>
      <p>{JSON.stringify(query.data?.data)}</p>
      <button onClick={tDebounceRef.current}>random</button>
    </div>
  );
}

export default Title;
