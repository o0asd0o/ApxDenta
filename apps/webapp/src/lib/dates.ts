export const getTimeIntervalItems = () => {
  return Array.from({ length: 28 }, (_, index) => {
    const hour = Math.floor(index / 2) + 6;
    const min = (index % 2) * 30;
    const time = new Date();
    time.setHours(hour, min, 0, 0);
    const label = time.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    return { value: hour * 100 + min, label: label.toLowerCase() };
  });
};
