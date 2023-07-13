import React from 'react';

function KeyLogger({
  setValue,
}: {
  setValue: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  React.useEffect(() => {
    const init = () => {
      const handleKeyDown = (evt: KeyboardEvent) => {
        setValue((e) => e.concat(evt.key));
      };

      window.addEventListener('keydown', handleKeyDown);

      return () => {
        window.removeEventListener('keydown', handleKeyDown);
      };
    };
    return init();
  }, []);

  return (
    <div>
      <textarea></textarea>
    </div>
  );
}

export default KeyLogger;
