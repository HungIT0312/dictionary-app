export const capitalizeFirstLetter = (str) => {
  if (str == null) {
    return "";
  }
  return str.replace(/(^\w|\s\w)/g, (match) => match.toUpperCase());
};
const changeTitle = (path) => {
  const arrPath = path.split("/").filter(Boolean);
  document.title = arrPath[arrPath.length - 1]
    ? decodeURI(capitalizeFirstLetter(arrPath[arrPath.length - 1])) +
      " - Dictionary App"
    : "Dictionary app";
};
export default changeTitle;
