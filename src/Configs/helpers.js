export function requestPermission() {
  return Notification.requestPermission()
    .then((permission) => {
      if (permission === 'granted') {
        return true;
      }
      return false;
    });
}
