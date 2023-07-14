import React from 'react';

/**
 *
 * @input user must input value if not input value still press start to see message
 * @run value countdown and button convert to stop
 * @pressButton convert to start and number to stop
 * @zero input value show and button convert to start
 */

function Game() {
  const [valueCountdown, setValueCountdown] = React.useState<number>(0);
  const [isStart, setIsStart] = React.useState<boolean>(false);

  const textBtn = isStart ? 'stop' : 'start';

  const handelInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!Number.isNaN(value) && value > 0) setValueCountdown(value);
  };

  const handelButton = () => {
    if (valueCountdown > 0) return setIsStart(!isStart);
    if (valueCountdown === 0) return setIsStart(false);
  };

  React.useEffect(() => {
    let timeOut: NodeJS.Timer | null = null;

    if (isStart && !timeOut && valueCountdown > 0) {
      timeOut = setTimeout(() => {
        if (valueCountdown === 1) {
          setIsStart(false);
          setValueCountdown(valueCountdown - 1);
        } else {
          setValueCountdown(valueCountdown - 1);
        }
      }, 1000);
    }
    if (!isStart && valueCountdown > 0 && timeOut) {
      clearTimeout(timeOut);
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
      {valueCountdown === 0 && <p>Input natural number</p>}
    </div>
  );
}

export default Game;
