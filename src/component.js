export default (text = "Hello FiLLIKa") => {
  const element = document.createElement("div");

  element.innerHTML = text;

  return element;
};
