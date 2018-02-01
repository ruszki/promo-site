import * as React from "react";
import * as ReactDOM from "react-dom";
import {applyMiddleware, createStore, Store} from "redux";
import {default as createSagaMiddleware, SagaMiddleware, SagaIterator} from "redux-saga";
import {Provider} from "react-redux";
import {ConnectedRouter as Router, routerMiddleware} from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import * as Loadable from "react-loadable";
import {hydrate} from "emotion";
import {AppContainer} from "react-hot-loader";
import RootReducer from "@app/reducers";
import App from "@app";

window.addEventListener("load", async function() {
    const sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware();

    const history = createHistory();

    const reduxStore: Store<{}> = createStore(RootReducer, window.__PRELOADED_STATE__, applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
    ));

    if (window.__PRELOADED_STYLESHEETS__ !== undefined) {
        hydrate(window.__PRELOADED_STYLESHEETS__);
    }

    sagaMiddleware.run(function* (): SagaIterator {});

    const app: HTMLElement | null = document.getElementById("app");

    if (app !== null) {
        const appReact = (AppComponent: React.ComponentType<any>) => <AppContainer>
            <Provider store={reduxStore}>
                <Router history={history}>
                    <AppComponent />
                </Router>
            </Provider>
        </AppContainer>;

        if (window.__PRELOADED_STATE__ !== undefined) {
            await (Loadable as any).preloadReady();
            ReactDOM.hydrate(
                appReact(App),
                app
            );
        } else {
            const render = (AppComponent: React.ComponentType<any>) => ReactDOM.render(
                appReact(AppComponent),
                app
            );

            render(App);

            if (module.hot) {
                module.hot.accept("@app", () => {
                    render(App);
                });
            }
        }
    }
});
