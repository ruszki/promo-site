/// <reference types="react" />

declare module "inject-loader!*" {
    interface InjectLoaderFunctionArgument {
        [Key: string]: any;
    }

    interface InjectLoaderFunctionReturn {
        [Key: string]: React.ComponentType<any>;
    }

    interface InjectLoaderFunction {
        (injects: InjectLoaderFunctionArgument): InjectLoaderFunctionReturn;
    }

    const injectLoaderFunction: InjectLoaderFunction;

    export = injectLoaderFunction;
}
