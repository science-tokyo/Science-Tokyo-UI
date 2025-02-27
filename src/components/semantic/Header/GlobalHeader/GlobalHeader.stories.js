import beautify from 'js-beautify';
import renderComponent from '../Header.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/ヘッダー Header/グローバルヘッダー Global header',
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
