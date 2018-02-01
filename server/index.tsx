import * as React from "react";
import * as express from "express";
import * as fs from "fs";
import createMemoryHistory from "history/createMemoryHistory";
import {renderToString} from "react-dom/server";
import {applyMiddleware, createStore, Store} from "redux";
import {Provider} from "react-redux";
import createSagaMiddleware, {SagaMiddleware} from "redux-saga";
import * as Loadable from "react-loadable";
import {getBundles, Bundle} from "react-loadable/webpack";
import {ConnectedRouter as Router, routerMiddleware} from "react-router-redux";
import {extractCritical} from "emotion-server";
import RootReducer from "@app/reducers";
import App from "@app";
import serialize from "./serialize";

const server = express();

server.use(express.json({limit: "50mb"}));
server.use("/assets", express.static("build/client", {
    maxAge: 31536000000
}));

const template = fs.readFileSync("build/server/index.html", "utf8");
const stats = JSON.parse(fs.readFileSync("build/server/react-loadable.json", "utf8"));

server.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const context = {};

    let modules: Array<string> = [];

    const location: string = req.path;

    const history = createMemoryHistory({
        initialEntries: [location]
    });

    const sagaMiddleware: SagaMiddleware<any> = createSagaMiddleware();

    const reduxStore: Store<any> = createStore(RootReducer, applyMiddleware(
        sagaMiddleware,
        routerMiddleware(history)
    ));

    const markup = renderToString(
        <Loadable.Capture report={moduleName => modules.push(moduleName)}>
            <Provider store={reduxStore}>
                <Router history={history}>
                    <App />
                </Router>
            </Provider>
        </Loadable.Capture>
    );

    const {html, ids, css} = extractCritical(markup);

    let bundles: Array<Bundle> = getBundles(stats, modules);
    bundles = bundles.filter((bundle: any) => !(/\.map$/.test(bundle.file)));

    const bundlesString = bundles.length > 0 ?
        bundles.map((bundle: any) => {
            return `<script src="/resources/generated/${bundle.file}" defer></script>`;
        }).join("")
        : "";

    if (!(context as any).url) {
        res.type("html");
        res.charset = "utf-8";
        res.send(template
            .replace("SERVER_RENDERED_HTML", html)
            .replace("SERVER_RENDERED_STATE", serialize(reduxStore.getState()))
            .replace("SERVER_RENDERED_SCRIPTS", bundlesString)
            .replace("SERVER_RENDERED_STYLESHEETS", JSON.stringify(ids))
            .replace("SERVER_RENDERED_STYLES", css));
    }

    next();
});

console.log("Starting server...");

Loadable.preloadAll().then(() => {
    server.listen(8080, () => console.log("Server started on port 8080"));
});
