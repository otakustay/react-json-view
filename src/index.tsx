interface Props {
    source: unknown;
}

export function JsonView({source}: Props) {
    return (
        <pre>{JSON.stringify(source, null, 2)}</pre>
    );
}
