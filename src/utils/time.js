export function convertToDaysHoursMinutesSeconds(seconds) {
  // 天数
  const days = Math.floor(seconds / (24 * 60 * 60));
  // 计算剩余秒数
  const remainingSeconds = seconds % (24 * 60 * 60);
  // 小时数
  const hours = Math.floor(remainingSeconds / (60 * 60));
  // 计算剩余秒数
  const remainingSecondsAfterHours = remainingSeconds % (60 * 60);
  // 分钟数
  const minutes = Math.floor(remainingSecondsAfterHours / 60);
  // 剩余的秒数
  const secondsLeft = remainingSecondsAfterHours % 60;

  let result = '';
  if (days > 0) {
    result += `${days}天`;
  }
  if (hours > 0) {
    result += `${hours}时`;
  }
  if (minutes > 0) {
    result += `${minutes}分`;
  }
  if (secondsLeft > 0 || (days === 0 && hours === 0 && minutes === 0)) {
    result += `${secondsLeft}秒`;
  }

  return result;
}