import React from 'react';

const styleModal: React.CSSProperties = {
  display: 'flex',
  position: 'fixed',
  WebkitBoxAlign: 'center',
  alignItems: 'center',
  WebkitBoxPack: 'center',
  justifyContent: 'center',
  inset: '0px',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  WebkitTapHighlightColor: 'transparent',
  zIndex: 1,
};

const styleContainer: React.CSSProperties = {
  position: 'absolute',
  marginLeft: 'auto',
  boxSizing: 'border-box',
  marginRight: 'auto',
  display: 'block',
  borderRadius: '10px',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  backgroundColor: 'rgba(199, 119, 119, 0.5)',
  border: '2px solid transparent',
  padding: '32px',
  outline: 'transparent solid 0px',
  zIndex: 10,
};

function Modal({
  isOpen,
  setOpen,
  children,
  isHaveButton = false,
  sx,
  ...other
}: {
  isOpen: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode | React.ReactNode[];
  sx?: React.CSSProperties;
  isHaveButton?: boolean;
  other?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;
}) {
  if (!isOpen) return undefined;
  function handleClose() {
    setOpen(false);
  }
  return (
    <div>
      <div style={{ ...styleModal }} {...other} className='1' onClick={handleClose}></div>
      <div style={{ ...styleContainer, ...sx }} className='2'>
        {children}
        <button onClick={handleClose} hidden={isHaveButton}>
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;
