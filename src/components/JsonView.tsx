import {CSSProperties} from 'react';
import {JsonValue} from '../utils/type.js';
import Property from './Property.js';

const ROOT_PARENT: string[] = [];

interface Props {
    className?: string;
    style?: CSSProperties;
    source: JsonValue;
}

export default function JsonView({source, className, style}: Props) {
    return (
        <div className={className ? `json-view ${className}` : 'json-view'} style={style}>
            <Property parent={ROOT_PARENT} name="" value={source} />
        </div>
    );
}
