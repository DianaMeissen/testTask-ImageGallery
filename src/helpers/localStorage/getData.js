export default function getData(name) {
  if (localStorage.getItem(name)) {
    return localStorage.getItem(name)
  } else {
    return null
  }
}