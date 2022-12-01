import {ReactNode} from 'react';

interface Props {
    children: ReactNode;
}

export default function Secondary({children}: Props) {
    return <span className="json-view-secondary">{children}</span>;
}
