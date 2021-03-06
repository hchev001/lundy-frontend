import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import configureStore from "./store";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { IndexRoutes } from "./routes";

const store = configureStore();
ReactDOM.render(
  <React.StrictMode>
    {/* 
    //@ts-ignore */}
    <Provider store={store}>
      <Router>
        <Switch>
          {IndexRoutes.map((prop, key) => {
            return (
              <Route path={prop.path} key={key} component={prop.component} />
            );
          })}
        </Switch>
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
