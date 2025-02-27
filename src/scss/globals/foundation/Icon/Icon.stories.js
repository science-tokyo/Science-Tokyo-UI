import renderComponent from './Icon.njk';
import iconOption from '/src/util/iconOption'; // iconの選択肢を定義したファイル

export default {
  title: 'Tokens/アイコン Icon',
  argTypes: {
    type: {
      description: 'アイコンの使用タイプを選択します。',
      type: 'select',
      options: ['svg', 'css', 'css-inverted'],
      table: {
        type: { summary: '"svg"|"css"|"css-inverted"' }
      }
    },
    icon: {
      description: 'ボタンに表示するアイコンを指定します。',
      options: [...iconOption],
      type: {
        name: 'select'
      }
    }
  }
};

/**
 * @param {Object} args
 */
const Template = (args) => {
  return renderComponent({
    storybookArgs: args
  });
};

export const Default = Template.bind({});
Default.storyName = '基本形';
Default.args = {
  type: 'svg',
  icon: 'add'
};
