interface Props {
    collapsed: boolean;
    onChange: (collapsed: boolean) => void;
}

export default function Toggle({collapsed, onChange}: Props) {
    return (
        <i
            className={`json-view-toggle json-view-${collapsed ? 'collapsed' : 'expanded'}`}
            onClick={() => onChange(!collapsed)}
        >
            <svg style={{width: '1ch', height: '1ch'}} viewBox="0 0 15 15" fill="currentColor">
                <path d={collapsed ? 'M0 14l6-6-6-6z' : 'M0 5l6 6 6-6z'} />
            </svg>
        </i>
    );
}
