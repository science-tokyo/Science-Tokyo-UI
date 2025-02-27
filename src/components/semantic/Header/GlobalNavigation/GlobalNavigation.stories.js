import beautify from 'js-beautify';
import renderComponent from '../Header.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/ヘッダー Header/グローバルヘッダーナビゲーション Global header navigation',
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {}
};

/**
 * @param {Object} args
 */
const Template = (args, { globals }) => {
  const { locale } = globals;

  // スクリプト適用
  setTimeout(() => {
    const header = document.querySelector('[data-js-header]');
    if (header) {
      const menuBtn = header.querySelector('[data-js-menubtn]');
      const newevent = new Event('click');
      menuBtn.dispatchEvent(newevent);
    }
  }, 0);

  const updatedArgs = {
    ...args,
    locale: locale
  };
  return beautify.html(
    renderComponent({
      storybookArgs: updatedArgs
    }),
    { indent_size: 2, preserve_newlines: false }
  );
};
export const Default = Template.bind({});
Default.storyName = 'デフォルト';
Default.args = {};
