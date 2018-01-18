import * as React from "react";
import * as ReactDOM from "react-dom";
import {applyMiddleware, createStore, Store} from "redux";
import {default as createSagaMiddleware, SagaMiddleware} from "redux-saga";
import {Provider} from "react-redux";
import {ConnectedRouter as Router, routerMiddleware} from "react-router-redux";
import createHistory from "history/createBrowserHistory";
import * as Loadable from "react-loadable";
import RootReducer from "@app/reducers";
import App from "../app/index.tsx";
import {AppContainer} from "react-hot-loader";

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
        const appReact = (AppComponent) => <AppContainer>
            <Provider store={reduxStore}>
                <Router history={history}>
                    <AppComponent/>
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
            const render = (AppComponent) => ReactDOM.render(
                appReact(AppComponent),
                app
            );

            render(App);

            if (module.hot) {
                module.hot.accept('../app/index.tsx', () => {
                    render(App);
                })
            }
        }
    }
});
