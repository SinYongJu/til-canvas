import App from "./js/App";
import "./assets/css/reset.css";
import "./assets/css/canvas.css";

let app = null;
function main() {
  if (!!!app) {
    app = new App();
  }
}

window.onload = function () {
  main();
};

main();
