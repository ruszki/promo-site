/// <reference types="react" />

declare namespace Loadable {
    interface CaptureProperties {
        report: (moduleName: string) => void;
    }

    export const Capture: React.ComponentType<CaptureProperties>;
}

declare module "react-loadable/webpack" {
    interface WebpackStats { }

    export interface Bundle {
        file: string;
    }

    export function getBundles(stats: WebpackStats, modules: Array<string>): Array<Bundle>;
}
