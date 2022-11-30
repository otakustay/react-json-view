import {ChangeEvent, useCallback, useState} from 'react';
import styled from '@emotion/styled';
import {JsonValue, JsonView, JsonViewConfig} from '@otakustay/react-json-view';
import '@otakustay/react-json-view/styles/index.css';
import {Input} from 'antd';
import Configuration from '../Configuration/index.js';

const DEFAULT_JSON = {
    name: '@otakustay/react-json-view',
    version: '0.8.0',
    description: 'A customizable json view component for react',
    type: 'module',
    exports: {
        '.': './dist/index.js',
    },
    scripts: {
        prepare: 'husky install',
        dev: 'skr dev --src-dir=site',
        lint: 'skr lint src site',
        'lint-staged': 'npm run lint -- --staged',
        'type-check': 'tsc --noEmit',
        build: 'tsc -p tsconfig.build.json',
        ci: 'yarn install --immutable && npm run lint && npm run type-check && npm run build',
    },
    repository: {
        type: 'git',
        url: 'git+https://github.com/otakustay/react-json-view.git',
    },
    keywords: ['react', 'json-view', 'json-viewer', 'react-json'],
    author: 'otakustay <otakustay@gmail.com>',
    license: 'MIT',
    bugs: {
        url: 'https://github.com/otakustay/react-json-view/issues',
    },
    homepage: 'https://github.com/otakustay/react-json-view#readme',
    devDependencies: {
        '@reskript/cli': '5.7.2',
        '@reskript/cli-dev': '5.7.2',
        '@reskript/cli-lint': '5.7.2',
        '@reskript/config-lint': '5.7.2',
        '@reskript/settings': '5.7.2',
        '@types/eslint': '^8',
        '@types/react': '^18',
        '@types/react-dom': '^18',
        antd: '^5.0.2',
        'core-js': '^3.26.1',
        eslint: '^8.28.0',
        husky: '^8.0.2',
        react: '^18.2.0',
        'react-dom': '^18.2.0',
        stylelint: '^14.15.0',
        typescript: '^4.9.3',
        vite: '^2.9.15',
    },
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
    const [config, setConfig] = useState<Required<JsonViewConfig>>({indentSize: 2});
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
                <JsonView {...config} source={input.parsed} />
            </Layout>
        </>
    );
}
