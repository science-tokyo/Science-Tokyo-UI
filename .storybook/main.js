/** @type { import('@storybook/html-webpack5').StorybookConfig } */
import { name } from 'eleventy-sass';
import path from 'path';
const config = {
  stories: [
    '../src/_storyDocs/**/*.mdx',
    '../src/components/**/*.mdx',
    '../src/components/primitive/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/components/semantic/**/*.stories.@(js|jsx|mjs|ts|tsx)',
    '../src/scss/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    {
      name: '@storybook/addon-essentials',
      options: {
        actions: false,
        controls: false
      }
    },
    // "@storybook/addon-interactions",
    '@whitespace/storybook-addon-html',
    '@storybook/addon-a11y'
  ],
  framework: {
    name: '@storybook/html-webpack5',
    options: {
      builder: {
        useSWC: true
      }
    }
  },
  docs: {
    autodocs: true
  },
  staticDirs: ['../public'],
  webpackFinal: async (config) => {
    config.module.rules.push(
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: require.resolve('ts-loader'),
            options: {
              transpileOnly: true
            }
          }
        ]
      },
      {
        test: /\.njk$/,
        use: [
          {
            loader: 'simple-nunjucks-loader',
            options: {
              searchPaths: path.resolve(__dirname, '../') // Storybookで扱うnjkのルートディレクトリを指定
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: {
                auto: true // *.module.scssファイル全てを対象
              },
              url: false // cssのbackgroundで設定した画像へのパスがプロジェクトルートからの絶対パスになるように設定
            }
          },
          'sass-loader'
        ],
        include: path.resolve(__dirname, '../src/')
      }
    );
    // Return the altered config
    return config;
  }
};
export default config;
