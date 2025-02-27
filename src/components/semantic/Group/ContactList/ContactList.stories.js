import beautify from 'js-beautify';
import renderComponent from './ContactList.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/グループ Group/お問い合わせリスト Contact list',
  argTypes: {
    columnsNumber: {
      description: 'カラム数を指定します。',
      options: [1, 2, 3],
      control: {
        type: 'select',
        labels: {
          1: '1列',
          2: '2列',
          3: '3列',
          4: '4列'
        }
      }
    },
    columnsNumberMedium: {
      description: 'ミディアムウインド時のカラム数を指定します。',
      options: [1, 2],
      control: {
        type: 'select',
        labels: {
          1: '1列',
          2: '2列',
          3: '3列'
        }
      }
    },
    columnsNumberSmall: {
      description: 'スモールウインド時のカラム数を指定します。',
      options: [1, 2],
      control: {
        type: 'select',
        labels: {
          1: '1列',
          2: '2列',
          3: '3列'
        }
      }
    },
    items: {
      description: 'コンタクト情報を指定します。',
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
export const col1 = Template.bind({});
col1.storyName = '1カラム';
col1.args = {
  columnsNumber: '1',
  items: [
    {
      tag: 'h3',
      headingLevel: 3,
      department: '担当部署',
      name: '担当者名',
      address: '東京都目黒区大岡山2丁目12-1',
      tel: '03-XXXX-XXXX',
      fax: '03-XXXX-XXXX',
      email: 'info-XXXX@isct.ac.jp'
    },
    {
      tag: 'h3',
      headingLevel: 3,
      department: '担当部署',
      name: '担当者名',
      address: '東京都目黒区大岡山2丁目12-1',
      tel: '03-XXXX-XXXX',
      fax: '03-XXXX-XXXX',
      email: 'info-XXXX@isct.ac.jp'
    }
  ]
};
export const col2 = Template.bind({});
col2.storyName = '2カラム';
col2.args = {
  ...col1.args,
  columnsNumber: '2'
};
