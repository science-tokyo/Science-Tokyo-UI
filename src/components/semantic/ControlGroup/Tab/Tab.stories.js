import beautify from 'js-beautify';
import renderComponent from './Tab.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/コントロールグループ Control group/タブ Tab',
  argTypes: {
    tabs: {
      description: 'タブの項目を指定します。',
      control: 'object'
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
Default.args = {
  tabs: [
    {
      tabId: 'tab-1',
      contentName: 'tab_content01',
      label: 'タブラベル1',
      content:
        'タブコンテンツ1:コンテンツが入ります。コンテンツが入ります。コンテンツが入ります。コンテンツが入ります。コンテンツが入ります。コンテンツが入ります。コンテンツが入ります。コンテンツが入ります。',
      isActive: true
    },
    {
      tabId: 'tab-2',
      contentName: 'tab_content02',
      label: 'タブラベル2',
      content:
        'タブコンテンツ2:コンテンツが入ります。コンテンツが入ります。コンテンツが入ります。コンテンツが入ります。コンテンツが入ります。コンテンツが入ります。コンテンツが入ります。コンテンツが入ります。',
      isActive: false
    }
  ]
};
Default.storyName = 'デフォルト';
