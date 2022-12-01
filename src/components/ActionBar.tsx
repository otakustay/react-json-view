import {ReactElement, ReactNode} from 'react';

interface ActionProps {
    tooltip?: string;
    children: ReactNode;
}

function Action({tooltip, children}: ActionProps) {
    return (
        <span className="json-view-action" title={tooltip}>
            {children}
        </span>
    );
}

interface Props {
    children: ReactElement<ActionProps> | Array<ReactElement<ActionProps>>;
}

function ActionBar({children}: Props) {
    return (
        <div className="json-view-action-bar">
            {children}
        </div>
    );
}

export default Object.assign(ActionBar, {Action});
