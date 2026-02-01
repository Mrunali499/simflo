module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
            'nativewind/babel',
        ],
        plugins: [
            'react-native-reanimated/plugin',
            [
                'module-resolver',
                {
                    alias: {
                        'simflo-backend': '../simflo-backend',
                        'syncflo': '../syncflo/syncflo',
                        '@features': '../simflo-backend/features',
                        '@app/client': '../simflo-backend/client',
                        '@app/server': '../simflo-backend/server',
                        '@syncflo/client': '../syncflo/syncflo/client',
                        '@syncflo/server': '../syncflo/syncflo/server',
                        '@syncflo/shared': '../syncflo/syncflo/shared',
                    },
                },
            ],
        ],
    };
};
