import {useMemo, useState} from 'react';
import {renderByType, JsonValue, checkValueRenderType} from '../utils/type.js';
import {useConfig} from './ConfigProvider.js';
import Toggle from './Toggle.js';

interface PropertyTailProps {
    type: string;
    indent: number;
    content: string;
}

function PropertyTail({type, indent, content}: PropertyTailProps) {
    const {indentSize} = useConfig();

    return (
        <div className="json-view-line">
            <span className="json-view-indent">
                {' '.repeat(indent * indentSize)}
            </span>
            <div className={`json-view-value json-view-value-${type}`}>{content}</div>
        </div>
    );
}

interface Props {
    root?: boolean;
    parent: string[];
    name: string;
    value: JsonValue;
}

export default function Property({root = false, parent, name, value}: Props) {
    const {
        indentSize,
        quoteOnStringValue,
        defaultCollapsed,
        renderCollapsedPlaceholder,
        renderValueContent,
    } = useConfig();
    const field = useMemo(
        () => ({path: root ? parent : [...parent, name], name, value}),
        [name, parent, root, value]
    );
    const [collapsed, setCollapsed] = useState(() => defaultCollapsed(field));
    const renderChildProperty = (name: string, value: JsonValue) => (
        <Property
            key={`${field.path.join('.')}.${name}`}
            parent={field.path}
            name={name}
            value={value}
        />
    );
    const renderChildProperties = (source: JsonValue) => renderByType(
        source,
        {
            array: value => value.map((value, index) => renderChildProperty(index.toString(), value)),
            object: value => Object.entries(value).map(([name, value]) => renderChildProperty(name, value)),
        }
    );
    const renderValue = () => renderByType(
        value,
        {
            null: () => 'null',
            array: () => '[',
            object: () => '{',
            string: value => (quoteOnStringValue ? `"${value}"` : value),
            primitive: value => value.toString(),
        }
    );

    return (
        <>
            <div className="json-view-line">
                <span className="json-view-indent">
                    {' '.repeat(field.path.length * indentSize)}
                </span>
                {
                    renderByType(
                        value,
                        {
                            object: () => <Toggle collapsed={collapsed} onChange={setCollapsed} />,
                            array: () => <Toggle collapsed={collapsed} onChange={setCollapsed} />,
                        }
                    )
                }
                {!!field.path.length && <span className="json-view-name">{name}</span>}
                <div className={`json-view-value json-view-value-${checkValueRenderType(value)}`}>
                    {renderValueContent({field, renderDefault: renderValue})}
                    {
                        collapsed && renderByType(
                            value,
                            {
                                array: () => <>{renderCollapsedPlaceholder(field)}{']'}</>,
                                object: () => <>{renderCollapsedPlaceholder(field)}{'}'}</>,
                            }
                        )
                    }
                </div>
            </div>
            {
                !collapsed && [
                    renderChildProperties(value),
                    renderByType(
                        value,
                        {
                            array: () => <PropertyTail type="array" indent={field.path.length} content="]" />,
                            object: () => <PropertyTail type="object" indent={field.path.length} content="}" />,
                        }
                    ),
                ]
            }
        </>
    );
}
