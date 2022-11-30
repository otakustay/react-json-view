import {configure} from '@reskript/settings';

export default configure(
    'vite',
    {
        build: {
            appTitle: 'JSON View',
            uses: ['emotion'],
            style: {
                modules: () => false,
            },
        },
        devServer: {
            port: 8732,
        },
    }
);
