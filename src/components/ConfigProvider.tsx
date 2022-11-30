import {createContext, ReactNode, useContext, useMemo} from 'react';
import {JsonValue} from '../utils/type.js';

export interface FieldDescription {
    name: string;
    path: string[];
    value: JsonValue;
}

export interface JsonViewConfig {
    indentSize?: number;
    defaultCollapsed?: (field: FieldDescription) => boolean;
    renderCollapsedPlaceholder?: (field: FieldDescription) => ReactNode;
}

const DEFAULT_CONFIG: Required<JsonViewConfig> = {
    indentSize: 2,
    defaultCollapsed: () => false,
    renderCollapsedPlaceholder: () => '...',
};

const Context = createContext(DEFAULT_CONFIG);
Context.displayName = 'JsonViewConfigProvider';

interface Props extends Partial<JsonViewConfig> {
    children: ReactNode;
}

export default function ConfigProvider({indentSize, defaultCollapsed, renderCollapsedPlaceholder, children}: Props) {
    const value = useMemo(
        () => {
            return {
                indentSize: indentSize ?? DEFAULT_CONFIG.indentSize,
                defaultCollapsed: defaultCollapsed ?? DEFAULT_CONFIG.defaultCollapsed,
                renderCollapsedPlaceholder: renderCollapsedPlaceholder ?? DEFAULT_CONFIG.renderCollapsedPlaceholder,
            };
        },
        [defaultCollapsed, indentSize, renderCollapsedPlaceholder]
    );

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export const useConfig = () => useContext(Context);
