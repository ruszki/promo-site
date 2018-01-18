import * as React from "react";
import * as express from "express";
import * as fs from "fs";
import createMemoryHistory from "history/createMemoryHistory";
import {renderToString} from "react-dom/server";
import {applyMiddleware, createStore, Store} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware, {SagaMiddleware} from "redux-saga";
import Loadable from "react-loadable";
import {getBundles} from "react-loadable/webpack";
import {ConnectedRouter as Router, routerMiddleware} from "react-router-redux";
import RootReducer from "@app/reducers";
import App from "@app/index.tsx";
import serialize from "./serialize";

const server = express();

server.use(express.json({limit: "50mb"}));
server.use('/assets', express.static('build/client'));

const template = fs.readFileSync("build/server/index.html", "utf8");
const stats = JSON.parse(fs.readFileSync("build/server/react-loadable.json", "utf8"));

server.get((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const context = {};

    let modules: Array<any> = [];

    const location: string = req.path;

    const history = createMemoryHistory({
        initialEntries: [location]
    });

    const sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware();

    const reduxStore: Store<RootState> = createStore(RootReducer, applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
    ));

    const LoadableCapture = (Loadable as any).Capture;

    const markup = renderToString(
        <Provider store={reduxStore}>
            <Router history={history}>
                <App/>
            </Router>
        </Provider>
    );

    let bundles: Array<any> = getBundles(stats, modules);
    bundles = bundles.filter((bundle: any) => !(/\.map$/.test(bundle.file)));

    const bundlesString = bundles.length > 0 ?
        bundles.map((bundle: any) => {
            return `<script src="/resources/generated/${bundle.file}" defer></script>`;
        }).join("\n")
        : "";

    if (!(context as any).url) {
        res.type("html");
        res.charset = "utf-8";
        res.send(template
            .replace("SERVER_RENDERED_HTML", markup)
            .replace("SERVER_RENDERED_STATE", serialize(reduxStore.getState()))
            .replace("SERVER_RENDERED_SCRIPTS", bundlesString)
    }

    next();
});

console.log("Starting server...");

(Loadable as any).preloadAll().then(() => {
    server.listen(8080, () => console.log("Server started on port 8080"));
});
