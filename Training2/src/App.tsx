import { useState } from 'react';
import Modal from './components/Modal';
import Game from './components/Game';

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
          <Game />
        </Modal>
      </div>
    </>
  );
}

export default App;
