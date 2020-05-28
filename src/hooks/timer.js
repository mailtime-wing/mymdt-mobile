import {useState, useEffect, useRef} from 'react';

function useCountDownTimer(countDownTime) {
  const [isStarted, setIsStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(countDownTime);
  const timer = useRef();

  function cleanUpTimer() {
    if (timer.current != null) {
      clearInterval(timer.current);
      setTimeLeft(countDownTime);
      timer.current = null;
      setIsStarted(false);
    }
  }

  function startTimer() {
    let timeToCount = countDownTime;
    let lastTime = Date.now();
    timer.current = setInterval(() => {
      if (timeToCount > 0) {
        timeToCount = timeToCount - (Date.now() - lastTime) / 1000;
        setTimeLeft(Math.ceil(timeToCount));
        lastTime = Date.now();
      } else {
        cleanUpTimer();
      }
    }, 1000);
    setIsStarted(true);
  }

  useEffect(() => {
    return () => {
      cleanUpTimer();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [timeLeft, isStarted, startTimer];
}

export default useCountDownTimer;
