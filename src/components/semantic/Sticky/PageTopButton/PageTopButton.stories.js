import beautify from 'js-beautify';
import renderComponent from './PageTopButton.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/スティッキー Sticky/ページトップボタン Page top button',
  argTypes: {
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
Default.args = {};
