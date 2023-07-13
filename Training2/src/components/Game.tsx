import React from 'react';

function Game() {
  const [valueCountdown, setValueCountdown] = React.useState<number>(0);
  const [isStart, setIsStart] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const textBtn = isStart ? 'stop' : 'start';

  const handelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!Number.isNaN(value) && value > 0) {
      setErrorMessage('');
      setValueCountdown(value);
    }
    if (value <= 0) setErrorMessage('Number must be great than');
  };

  const handelButton = () => {
    if (valueCountdown > 0) return setIsStart(!isStart);
    if (valueCountdown === 0) return setIsStart(false);
  };

  React.useEffect(() => {
    let timeOut: NodeJS.Timer | null = null;
    if (valueCountdown < 0) return;

    if (isStart && !timeOut) {
      timeOut = setInterval(() => {
        if (valueCountdown === 1 && timeOut) {
          setIsStart(false);
          clearInterval(timeOut);
          setValueCountdown(valueCountdown - 1);
        } else {
          setValueCountdown(valueCountdown - 1);
        }
      }, 1000);
    }

    return () => {
      if (timeOut) clearTimeout(timeOut);
    };
  }, [isStart, valueCountdown]);

  return (
    <div>
      <input
        type='number'
        value={valueCountdown === 0 ? '' : valueCountdown}
        onChange={handelInput}
      />
      <button onClick={handelButton}>{textBtn}</button>
      <p>{valueCountdown}</p>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Game;
