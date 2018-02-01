import * as serializeJavascript from "serialize-javascript";

function serializeElement(element: any): string {
    if (element instanceof Map) {
        return "new Map(" + JSON.stringify(Array.from((element as Map<any, any>).entries())) + ")";
    } else if (element instanceof Array) {
        return serializeJavascript(element);
    } else if (element instanceof Set) {
        return serializeJavascript(element);
    } else if (element === null) {
        return serializeJavascript(element);
    } else if (typeof element === "object") {
        return serialize(element);
    } else {
        return serializeJavascript(element);
    }
}

export default function serialize(state: any): string {
    let serializedState: string = "{";

    Object.keys(state).forEach((key: string, index: number) => {
        if (index > 0) {
            serializedState += ",";
        }

        serializedState += "\"" + key + "\": " + serializeElement(state[key]);
    });

    return serializedState + "}";
}
