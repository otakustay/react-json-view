import {createContext, ReactNode, useContext, useMemo} from 'react';
import {JsonValue} from '../utils/type.js';

export interface FieldDescription {
    name: string;
    path: string[];
    value: JsonValue;
}

export interface RenderContext {
    field: FieldDescription;
    renderDefault: () => ReactNode;
}

export interface JsonViewConfig {
    indentSize?: number;
    defaultCollapsed?: (field: FieldDescription) => boolean;
    renderCollapsedPlaceholder?: (field: FieldDescription) => ReactNode;
    renderValueContent?: (context: RenderContext) => ReactNode;
}

const DEFAULT_CONFIG: Required<JsonViewConfig> = {
    indentSize: 2,
    defaultCollapsed: () => false,
    renderCollapsedPlaceholder: () => '...',
    renderValueContent: ({renderDefault}) => renderDefault(),
};

const Context = createContext(DEFAULT_CONFIG);
Context.displayName = 'JsonViewConfigProvider';

interface Props extends Partial<JsonViewConfig> {
    children: ReactNode;
}

export default function ConfigProvider(props: Props) {
    const {indentSize, defaultCollapsed, renderCollapsedPlaceholder, renderValueContent, children} = props;
    const value = useMemo(
        () => {
            return {
                indentSize: indentSize ?? DEFAULT_CONFIG.indentSize,
                defaultCollapsed: defaultCollapsed ?? DEFAULT_CONFIG.defaultCollapsed,
                renderCollapsedPlaceholder: renderCollapsedPlaceholder ?? DEFAULT_CONFIG.renderCollapsedPlaceholder,
                renderValueContent: renderValueContent ?? DEFAULT_CONFIG.renderValueContent,
            };
        },
        [defaultCollapsed, indentSize, renderCollapsedPlaceholder, renderValueContent]
    );

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    );
}

export const useConfig = () => useContext(Context);
