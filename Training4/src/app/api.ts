import countryService from './country_server';

interface IDataCountry {
  type: string;
  setup: string;
  punchline: string;
}

export function fetchCountry(value = '') {
  if (!value) return countryService.get<IDataCountry>('/all');
  return countryService.get<IDataCountry[]>(`/name/${value}`);
}
