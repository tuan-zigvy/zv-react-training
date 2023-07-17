import React from 'react';

function Game() {
  const [valueCountdown, setValueCountdown] = React.useState<number | string>(0);
  const [isStart, setIsStart] = React.useState<boolean>(false);
  const [errorMessage, setErrorMessage] = React.useState<string>('');

  const textBtn = isStart ? 'stop' : 'start';

  const handelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueCountdown(e.target.value);
  };

  const handelButton = () => {
    const value = Number(valueCountdown);

    if (!value) setErrorMessage('Invalid input. Must be a number');
    if (value <= 0) setErrorMessage('Number must be greater than 0');

    if (value > 0) {
      setErrorMessage('');
      return setIsStart(!isStart);
    }
  };

  React.useEffect(() => {
    let intervalTime: ReturnType<typeof setInterval> | null = null;

    const countdown = () => {
      setValueCountdown((prev) => {
        if (Number(prev) === 1 && intervalTime) {
          setIsStart(false);
          clearInterval(intervalTime);
          intervalTime = null;
        }
        return Number(prev) - 1;
      });
    };

    if (isStart) {
      intervalTime = setInterval(countdown, 1000);
    }

    return () => {
      if (intervalTime) {
        clearInterval(intervalTime);
      }
    };
  }, [isStart]);

  return (
    <div>
      <input value={valueCountdown === 0 ? '' : valueCountdown} onChange={handelInput} />
      <button onClick={handelButton}>{textBtn}</button>
      <p>{valueCountdown}</p>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
}

export default Game;
