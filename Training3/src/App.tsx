import { useState, useEffect } from 'react';
import Modal from './components/Modal';
import KeyLogger from './components/KeyLogger';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string[]>([]);
  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button
          style={{ width: 100, height: 100, fontSize: 15, marginTop: 100 }}
          onClick={() => setIsOpen(true)}
        >
          Open
        </button>
        <Modal isOpen={isOpen} setOpen={setIsOpen}>
          <KeyLogger setValue={setValue} />
        </Modal>
      </div>
    </>
  );
}

export default App;
