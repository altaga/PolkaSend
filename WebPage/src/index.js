import 'bootstrap/dist/css/bootstrap.min.css';
import './assets/css/styles.css';
import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ContextProvider } from "./utils/contextModule";
import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>,
  rootElement
);
