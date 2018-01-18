import * as React from "react";
import * as ReactDOM from "react-dom";
import {applyMiddleware, createStore, Store} from "redux";
import {default as createSagaMiddleware, SagaMiddleware} from "redux-saga";
import {Provider} from "react-redux";
import {ConnectedRouter as Router, routerMiddleware} from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import * as Loadable from "react-loadable";
import RootReducer from "@app/reducers";
import App from "@app";

window.addEventListener("load", async function () {
    const sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware();

    const history = createHistory();

    const reduxStore: Store<RootState> = createStore(RootReducer, window.__PRELOADED_STATE__, applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
    ));

    sagaMiddleware.run(function*());

    const app: HTMLElement | null = document.getElementById("app");

    if (app !== null) {
        const appReact = <Provider store={reduxStore}>
            <Router history={history}>
                <App/>
            </Router>
        </Provider>;

        if (window.__PRELOADED_STATE__ !== undefined) {
            await (Loadable as any).preloadReady();
            ReactDOM.hydrate(
                appReact,
                app
            );
        } else {
            ReactDOM.render(
                appReact,
                app
            );
        }
    }
});
