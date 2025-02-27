import beautify from 'js-beautify';
import renderComponent from './SearchTool.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/フォーム Form/検索ツール Search tool',
  argTypes: {
    type: {
      description: '検索ツールのタイプ',
      options: ['input', 'tagGroup'],
      control: {
        type: 'select'
      }
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
export const searchInput = Template.bind({});
searchInput.storyName = '検索フィールド';
searchInput.args = {
  type: 'input'
};
export const tagGroup = Template.bind({});
tagGroup.storyName = '絞り込みタググループ';
tagGroup.args = {
  type: 'tagGroup'
};
