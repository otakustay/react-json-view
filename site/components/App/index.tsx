import {ChangeEvent, useCallback, useState} from 'react';
import styled from '@emotion/styled';
import {JsonValue, JsonView, FieldDescription, RenderContext, Secondary, ActionBar} from '@otakustay/react-json-view';
// For users this should be `@otakustay/react-json-view/style`;
import '@otakustay/react-json-view/styles/index.css';
import {Input, Typography} from 'antd';
import Configuration from '../Configuration/index.js';
import '../../styles/index.js';

const DEFAULT_JSON = {
    level: 20,
    time: 1669746715936,
    hostname: 'venue-proxy-68bdd96ffc-f8hgh',
    action: 'httpRequestStart',
    type: 'user',
    traceId: '661129ba-675c-4ea8-8177-18e5fdddfd34',
    uid: '661129ba-675c-4ea8-8177-18e5fdddfd34',
    host: 'example.com',
    clientIp: '127.0.0.1',
    url: 'https://example.com/api/users/123',
    method: 'GET',
    requestHeaders: {
        host: 'example.com',
        'transfer-encoding': 'chunked',
        'content-type': 'application/x-www-form-urlencoded',
        'x-forwarded-for': '127.0.0.1',
    },
    pathname: '/api/users/123',
    search: '',
};

const renderValueContent = ({field, renderDefault}: RenderContext) => {
    const content = renderDefault();
    const actionBar = (
        <ActionBar>
            <ActionBar.Action>
                <Typography.Text copyable={{text: `${field.value}`}} />
            </ActionBar.Action>
        </ActionBar>
    );
    if (typeof field.value === 'string' && /^https?:\/\//.test(field.value)) {
        return (
            <a target="_blank" rel="noopener noreferrer" href={field.value}>
                {content}
                {actionBar}
            </a>
        );
    }
    if (typeof field.value === 'number' && (field.name === 'time' || field.name.endsWith('Time'))) {
        return (
            <>
                {content}
                <Secondary>
                    {new Date(field.value).toLocaleString()}
                    {actionBar}
                </Secondary>
            </>
        );
    }
    return (
        <>
            {content}
            {actionBar}
        </>
    );
};

const renderCollapsedPlaceholder = ({value}: FieldDescription) => {
    if (Array.isArray(value)) {
        return `...(${value.length} items)`;
    }

    return '...';
};

interface InputState {
    source: string;
    parsed: JsonValue;
}

const DEFAULT_STATE: InputState = {
    source: JSON.stringify(DEFAULT_JSON, null, 2),
    parsed: DEFAULT_JSON,
};

// @ts-expect-error https://github.com/emotion-js/emotion/pull/2819
const Title = styled.h1`
    text-align: center;
`;

// @ts-expect-error https://github.com/emotion-js/emotion/pull/2819
const Layout = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-content: space-between;
    gap: 20px;
`;

export default function App() {
    const [config, setConfig] = useState({indentSize: 2});
    const [input, setInput] = useState(DEFAULT_STATE);
    const updateSource = useCallback(
        (e: ChangeEvent<HTMLTextAreaElement>) => {
            const source = e.target.value;
            try {
                const parsed = e.target.value;
                setInput({source, parsed});
            }
            catch {
                setInput(v => ({source, parsed: v.parsed}));
            }
        },
        []
    );

    return (
        <>
            <Title>JSON View</Title>
            <Configuration style={{marginBottom: 20}} value={config} onChange={setConfig} />
            <Layout>
                <Input.TextArea
                    style={{resize: 'none', fontFamily: 'monospace'}}
                    rows={8}
                    value={input.source}
                    onChange={updateSource}
                />
                <JsonView
                    {...config}
                    renderCollapsedPlaceholder={renderCollapsedPlaceholder}
                    renderValueContent={renderValueContent}
                    source={input.parsed}
                />
            </Layout>
        </>
    );
}
