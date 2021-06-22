export function componentDidMount(){
  const script = document.createElement("script");

  script.src = "https://kit.fontawesome.com/64d58efce2.js";
  script.async = true;
  document.body.appendChild(script);
};