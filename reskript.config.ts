import {configure} from '@reskript/settings';

export default configure(
    'vite',
    {
        build: {
            appTitle: 'JSON View',
            uses: ['emotion'],
        },
        devServer: {
            port: 8732,
        },
    }
);
