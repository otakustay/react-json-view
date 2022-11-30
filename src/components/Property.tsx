import {renderByType, JsonValue} from '../utils/type.js';
import {useConfig} from './ConfigProvider.js';

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
    parent: string[];
    name: string;
    value: JsonValue;
}

export default function Property({parent, name, value}: Props) {
    const {indentSize} = useConfig();
    const path = [...parent, name];
    const renderChildProperty = (name: string, value: JsonValue) => (
        <Property key={`${path.join('.')}.${name}`} parent={path} name={name} value={value} />
    );
    const renderChildProperties = (source: JsonValue) => renderByType(
        source,
        {
            array: value => value.map((value, index) => renderChildProperty(index.toString(), value)),
            object: value => Object.entries(value).map(([name, value]) => renderChildProperty(name, value)),
        }
    );
    const type = renderByType(
        value,
        {
            null: () => 'null',
            array: () => 'array',
            object: () => 'object',
            primitive: () => 'primitive',
            string: () => 'string',
            number: () => 'number',
            boolean: () => 'boolean',
        }
    );

    return (
        <>
            <div className="json-view-line">
                <span className="json-view-indent">
                    {' '.repeat(parent.length * indentSize)}
                </span>
                {!!parent.length && <span className="json-view-name">{name}</span>}
                <div className={`json-view-value json-view-value-${type}`}>
                    {
                        renderByType(
                            value,
                            {
                                null: () => 'null',
                                array: () => '[',
                                object: () => '{',
                                primitive: value => value.toString(),
                            }
                        )
                    }
                </div>
            </div>
            {renderChildProperties(value)}
            {
                renderByType(
                    value,
                    {
                        array: () => <PropertyTail type="array" indent={parent.length} content="]" />,
                        object: () => <PropertyTail type="object" indent={parent.length} content="}" />,
                    }
                )
            }
        </>
    );
}