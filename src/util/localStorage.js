export function getLocalStorageItem(item) {
  let data = localStorage.getItem(item);
  if (data) {
    return JSON.parse(data);
  }
  return data;
}

export function saveToLocalStorage(name, item) {
  localStorage.setItem(name, JSON.stringify(item));
}

export function removeLocalStorageItem(item) {
  localStorage.removeItem(item);
}
