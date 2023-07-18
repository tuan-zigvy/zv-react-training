import countryService from './country_server';
import jokeService from './joke_server';

interface IName {
  common: string;
  official: string;
}
export interface IDataCountry {
  name: IName;
  region: string;
}

export function fetchCountry(value = '') {
  if (!value) return countryService.get<IDataCountry[]>('/all');
  return countryService.get<IDataCountry[]>(`/name/${value}`);
}

interface IDataJoke {
  type: string;
  setup: string;
  punchline: string;
}

export function fetchJoker() {
  return jokeService.get<IDataJoke>('/random');
}
