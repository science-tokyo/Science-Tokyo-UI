import beautify from 'js-beautify';
import renderComponent from './EventInformation.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/グループ Group/イベント情報 Event information',
  argTypes: {}
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
