import React, { useRef } from 'react';

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

  const intervalRef = useRef<NodeJS.Timer | null>(null);

  React.useEffect(() => {
    if (isStart && !intervalRef.current) {
      intervalRef.current = setInterval(function () {
        setValueCountdown((prev) => {
          if (Number(prev) === 1 && intervalRef.current) {
            setIsStart(false);

            clearInterval(intervalRef.current);
            intervalRef.current = null;

            return Number(prev) - 1;
          }

          return Number(prev) - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
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
