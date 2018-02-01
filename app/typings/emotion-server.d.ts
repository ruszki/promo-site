declare module "emotion-server" {
    interface ExtractionResult {
        html: string;
        ids: Array<string>;
        css: string;
    }

    export function extractCritical(markup: string): ExtractionResult;
}
