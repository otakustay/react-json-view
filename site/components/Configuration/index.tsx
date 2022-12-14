import {CSSProperties} from 'react';
import {Checkbox, Select} from 'antd';
import {JsonViewConfig} from '@otakustay/react-json-view';
import styled from '@emotion/styled';
import Item from './Item.js';

const INDENT_SIZE_OPTIONS = [
    {value: 2, label: '2'},
    {value: 4, label: '4'},
    {value: 8, label: '8'},
];

// @ts-expect-error https://github.com/emotion-js/emotion/pull/2819
const Row = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

// @ts-expect-error https://github.com/emotion-js/emotion/pull/2819
const Layout = styled.div`
    background-color: #f7f7f7;
    border-radius: 8px;
`;

type Configurable = Required<Pick<JsonViewConfig, 'indentSize' | 'quoteOnStringValue'>>;

interface Props {
    style?: CSSProperties;
    value: Configurable;
    onChange: (update: (value: Configurable) => Configurable) => void;
}

export default function Configuration({style, value, onChange}: Props) {
    return (
        <Layout style={style}>
            <Row>
                <Item label="Indent Size">
                    <Select
                        options={INDENT_SIZE_OPTIONS}
                        value={value.indentSize}
                        onChange={indentSize => onChange(v => ({...v, indentSize}))}
                    />
                </Item>
                <Item label="String Quote">
                    <Checkbox
                        checked={value.quoteOnStringValue}
                        onChange={e => onChange(v => ({...v, quoteOnStringValue: e.target.checked}))}
                    >
                        Quote
                    </Checkbox>
                </Item>
            </Row>
        </Layout>
    );
}
