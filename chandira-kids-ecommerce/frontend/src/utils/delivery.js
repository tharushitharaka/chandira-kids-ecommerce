export function getEstimatedDeliveryDate() {
  const date = new Date();
  let daysToAdd = 3;
  while (daysToAdd > 0) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0) daysToAdd -= 1;
  }
  return date.toLocaleDateString('en-LK', { weekday: 'short', month: 'short', day: 'numeric' });
}
