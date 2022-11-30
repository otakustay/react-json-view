import {CSSProperties} from 'react';
import {JsonValue} from '../utils/type.js';
import Property from './Property.js';
import ConfigProvider, {JsonViewConfig} from './ConfigProvider.js';

const ROOT_PARENT: string[] = [];

interface Props extends JsonViewConfig {
    className?: string;
    style?: CSSProperties;
    source: JsonValue;
}

export default function JsonView({className, style, source, ...config}: Props) {
    return (
        <ConfigProvider {...config}>
            <div className={className ? `json-view ${className}` : 'json-view'} style={style}>
                <Property parent={ROOT_PARENT} name="" value={source} />
            </div>
        </ConfigProvider>
    );
}
