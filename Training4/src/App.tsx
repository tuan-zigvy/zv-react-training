import React from 'react';
import Title from './components/Title';
import Country from './components/Country';
import { debounce } from './utils/utils';

function App() {
  const [value, setValue] = React.useState<string>('');

  function handelChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }

  const tDebounce = debounce(handelChange, 200);
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', rowGap: 12 }}>
        <Title />
        <input type='text' onChange={tDebounce} placeholder='Search name country' />
        <Country value={value} />
      </div>
    </>
  );
}

export default App;
