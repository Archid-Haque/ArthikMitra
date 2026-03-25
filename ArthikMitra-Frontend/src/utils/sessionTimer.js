export const startSession = () => {
  localStorage.setItem("startTime", Date.now());
};

export const stopSession = () => {
  const startTime = localStorage.getItem("startTime");

  if (!startTime) return 0;

  const duration = Math.floor((Date.now() - startTime) / 1000);

  const previous = parseInt(localStorage.getItem("totalTime")) || 0;
  const total = previous + duration;

  localStorage.setItem("totalTime", total);

  localStorage.removeItem("startTime");

  return total;
};

export const getTotalTime = () => {
  const stored = parseInt(localStorage.getItem("totalTime")) || 0;
  const startTime = localStorage.getItem("startTime");

  if (startTime) {
    const current = Math.floor((Date.now() - startTime) / 1000);
    return stored + current;
  }

  return stored;
};