import {createContext, ReactNode, useContext, useMemo} from 'react';

export interface JsonViewConfig {
    indentSize?: number;
}

const DEFAULT_CONFIG: Required<JsonViewConfig> = {
    indentSize: 2,
};

const Context = createContext(DEFAULT_CONFIG);
Context.displayName = 'JsonViewConfigProvider';

interface Props extends Partial<JsonViewConfig> {
    children: ReactNode;
}

export default function ConfigProvider({indentSize, children}: Props) {
    const value = useMemo(
        () => {
            return {
                indentSize: indentSize ?? DEFAULT_CONFIG.indentSize,
            };
        },
        [indentSize]
    );

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export const useConfig = () => useContext(Context);
