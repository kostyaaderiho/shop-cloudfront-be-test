import type { AWS } from '@serverless/typescript'

import getProductsList from '@functions/getProductsList'
import getProductsById from '@functions/getProductsById'

const serverlessConfiguration: AWS = {
    service: 'product-service',
    frameworkVersion: '3',
    plugins: [
        'serverless-auto-swagger',
        'serverless-offline',
        // 'serverless-esbuild'
        'serverless-webpack'
    ],
    provider: {
        name: 'aws',
        runtime: 'nodejs14.x',
        stage: 'dev',
        region: 'eu-west-1',
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000'
        }
    },
    functions: {
        getProductsList,
        getProductsById
    },
    package: { individually: true },
    custom: {
        autoswagger: {
            typefiles: ['./src/types/messages.ts', './src/types/product.ts']
        },
        webpack: {
            webpackConfig: 'webpack.config.js',
            includeModules: true,
            packager: 'npm',
            excludeFiles: 'src/**/*.test.ts'
        }
        // esbuild: {
        //     bundle: true,
        //     minify: false,
        //     sourcemap: true,
        //     exclude: ['aws-sdk'],
        //     target: 'node14',
        //     define: { 'require.resolve': undefined },
        //     platform: 'node',
        //     concurrency: 10
        // }
    }
}

module.exports = serverlessConfiguration
