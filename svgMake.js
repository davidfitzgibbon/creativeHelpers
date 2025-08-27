export default SvgMake = (name, options = {}) => {
  const el = document.createElementNS("http://www.w3.org/2000/svg", name);

  for (const [key, value] of Object.entries(options)) {
    el.setAttribute(key, value);
  }

  return el;
};