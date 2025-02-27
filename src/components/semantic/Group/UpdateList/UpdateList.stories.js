import beautify from 'js-beautify';
import renderComponent from './UpdateList.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/グループ Group/更新履歴 Update history',
  argTypes: {
    title: {
      description: 'タイトルを指定します。',
      control: 'text'
    },
    items: {
      description: '更新履歴を指定します。',
      control: 'array'
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
  title: '更新履歴',
  items: [
    '2024年10月1日：記事更新の説明テキストが入ります。記事更新の説明テキストが入ります。記事更新の説明テキストが入ります。記事更新の説明テキストが入ります。記事更新の説明テキストが入ります。',
    '記事更新の説明テキストが入ります。記事更新の説明テキストが入ります。記事更新の説明テキストが入ります。記事更新の説明テキストが入ります。記事更新の説明テキストが入ります。'
  ]
};
