import beautify from 'js-beautify';
import renderComponent from './Breadcrumb.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/グループ Group/パンくずリスト Breadcrumb',
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    items: {
      description: 'パンくずリストの項目を指定します。（フロントエンド実装用）',
      defaultValue: [
        {
          label: 'トップページ',
          href: '/'
        },
        {
          label: '上位階層',
          href: '/page1'
        },
        {
          label: '上位階層',
          href: '/page1'
        },
        {
          label: '上位階層',
          href: '/page1'
        },
        {
          label: '現在のページ'
        }
      ],
      control: {
        type: 'array'
      }
    },
    addClass: {
      description:
        '追加のクラスを指定します。複数指定する場合はスペースで区切ります。',
      control: 'text'
    }
  }
};

/**
 * @param {Object} args
 */
const Template = (args = {}) => {
  return beautify.html(
    renderComponent({
      storybookArgs: args
    }),
    { indent_size: 2, preserve_newlines: false }
  );
};
export const Default = Template.bind({});
Default.storyName = 'デフォルト';
Default.args = {
  items: [
    {
      label: 'トップページ',
      href: '/'
    },
    {
      label: '上位階層',
      href: '/page1'
    },
    {
      label: '上位階層',
      href: '/page1'
    },
    {
      label: '上位階層',
      href: '/page1'
    },
    {
      label: '現在のページ'
    }
  ]
};
