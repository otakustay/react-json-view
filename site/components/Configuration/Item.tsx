import styled from '@emotion/styled';
import {ReactNode} from 'react';

// @ts-expect-error https://github.com/emotion-js/emotion/pull/2819
const Layout = styled.label`
    display: flex;
    flex-direction: column;
    gap: 4px;
    width: 120px;
    padding: 20px;
    font-size: .8rem;
`;

interface Props {
    label: string;
    children: ReactNode;
}

export default function Item({label, children}: Props) {
    return (
        <Layout>
            <span>{label}</span>
            {children}
        </Layout>
    );
}
