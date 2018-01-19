interface Window {
    __PRELOADED_STATE__: any | undefined;
    __PRELOADED_STYLESHEETS__: any | undefined;
}

interface Module {
    hot: any | undefined;
}

declare var module: Module;
