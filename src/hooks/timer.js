import {useState, useEffect} from 'react';

function useCountDownTimer(initialCountdownTime, count) {
  const [countDownTime, setCountDownTime] = useState(initialCountdownTime);
  const [timeLeft, setTimeLeft] = useState(initialCountdownTime);

  useEffect(() => {
    if (countDownTime <= 0) {
      return;
    }

    let timeToCount = countDownTime;
    setTimeLeft(timeToCount); // setTimeLeft > 0 to get the timerStarted state immediately
    let lastTime = Date.now();
    let id = setInterval(() => {
      timeToCount = timeToCount - (Date.now() - lastTime) / 1000;
      if (timeToCount > 0) {
        setTimeLeft(Math.ceil(timeToCount));
        lastTime = Date.now();
        return;
      }

      setTimeLeft(0);
      clearInterval(id);
      id = null;
    }, 1000);

    return () => {
      if (id) {
        clearInterval(id);
      }
    };
  }, [countDownTime, count]);

  return [timeLeft, setCountDownTime];
}

export default useCountDownTimer;
