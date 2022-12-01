import {ReactNode} from 'react';

export type JsonPrimitive = string | number | boolean;

export type JsonValue = JsonPrimitive | JsonObject | JsonArray | null;

export interface JsonObject {
    [name: string]: JsonValue;
}

export type JsonArray = JsonValue[];

export type JsonType = 'null' | 'array' | 'object' | 'string' | 'number' | 'boolean';

interface RenderBranch<T> {
    null?: (value: null | undefined) => T;
    array?: (value: JsonValue[]) => T;
    object?: (value: JsonObject) => T;
    primitive?: (value: string | number | boolean) => T;
    string?: (value: string) => T;
    number?: (value: number) => T;
    boolean?: (value: boolean) => T;
    default?: (value: JsonValue) => T;
}

// eslint-disable-next-line complexity
const checkType = <T>(value: JsonValue, branches: RenderBranch<T>, defaultValue: T): T => {
    const renderDefault = branches.default ?? (() => defaultValue);

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

export const renderByType = (value: JsonValue, branches: RenderBranch<ReactNode>) => checkType(value, branches, null);

export const checkValueRenderType = (value: JsonValue) => checkType<JsonType>(
    value,
    {
        null: () => 'null',
        array: () => 'array',
        object: () => 'object',
        string: () => 'string',
        number: () => 'number',
        boolean: () => 'boolean',
    },
    'object'
);
