import {ReactNode} from 'react';

export type JsonPrimitive = string | number | boolean;

export type JsonValue = JsonPrimitive | JsonObject | JsonArray | null;

export interface JsonObject {
    [name: string]: JsonValue;
}

export type JsonArray = JsonValue[];

export type JsonType = 'null' | 'array' | 'object' | 'string' | 'number' | 'boolean';

interface RenderBranch {
    null?: (value: null | undefined) => ReactNode;
    array?: (value: JsonValue[]) => ReactNode;
    object?: (value: JsonObject) => ReactNode;
    primitive?: (value: string | number | boolean) => ReactNode;
    string?: (value: string) => ReactNode;
    number?: (value: number) => ReactNode;
    boolean?: (value: boolean) => ReactNode;
    default?: (value: JsonValue) => ReactNode;
}

// eslint-disable-next-line complexity
export const renderByType = (value: JsonValue, branches: RenderBranch): ReactNode => {
    const renderDefault = branches.default ?? (() => null);

    switch (typeof value) {
        case 'string':
            return (branches.string ?? branches.primitive ?? renderDefault)(value);
        case 'number':
            return (branches.number ?? branches.primitive ?? renderDefault)(value);
        case 'boolean':
            return (branches.boolean ?? branches.primitive ?? renderDefault)(value);
        case 'object':
            return value === null
                ? (branches.null ?? renderDefault)(value)
                : Array.isArray(value)
                    ? (branches.array ?? renderDefault)(value)
                    : (branches.object ?? renderDefault)(value);
        default:
            throw new Error(`Unexpected value type ${value} in json`);
    }
};
