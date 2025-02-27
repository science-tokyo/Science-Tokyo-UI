import beautify from 'js-beautify';
import renderComponent from './Label.njk';
import iconOption from '/src/util/iconOption'; // iconの選択肢を定義したファイル

export default {
  title: 'プリミティブコンポーネント Primitive/テキスト Text/ラベル Label',
  argTypes: {
    multiple: {
      description: '複数のラベルを表示します。',
      control: 'boolean',
      table: {
        disable: true
      }
    },
    multipleLabels: {
      if: { arg: 'multiple', eq: true },
      description:
        '複数のラベルを表示する際のラベル情報を配列で指定します。(フロントエンド実装用)',
      control: 'array',
      table: {
        disable: true
      }
    },
    color: {
      if: { arg: 'href', eq: '' },
      description: '文字の背景色を指定します。',
      options: ['Primary', 'Secondary', 'Tertiary', 'Caution'],
      control: 'select',
      table: {
        category: 'Style',
        defaultValue: { summary: 'Primary' },
        type: { summary: '"Primary"|"Secondary"|"Tertiary"|"Caution"' }
      }
    },
    href: {
      if: { arg: 'multiple', eq: false },
      description: 'リンクの指定がある場合はURLを指定します。',
      control: 'text',
      type: { name: 'string' },
      table: {
        category: 'Link'
      }
    },
    text: {
      if: { arg: 'multiple', eq: false },
      description: '表示するテキストを指定します。',
      control: 'text',
      table: {
        category: 'Label'
      }
    },
    fontWeight: {
      if: { arg: 'multiple', eq: false },
      description: '文字のフォントウェイトを指定します。',
      options: ['Bold', 'Normal'],
      control: 'select',
      table: {
        category: 'Label',
        defaultValue: { summary: 'Normal' },
        type: { summary: '"Bold"|"Normal"' }
      }
    },
    size: {
      if: { arg: 'multiple', eq: false },
      description: '文字のサイズを指定します。',
      options: ['L', 'M', 'S'],
      control: 'select',
      table: {
        category: 'Label',
        defaultValue: { summary: 'M' },
        type: { summary: '"L"|"M"|"S"' }
      }
    },
    leftIcon: {
      if: { arg: 'multiple', eq: false },
      description: '文字の左側にアイコンを表示します。',
      options: ['', ...iconOption],
      control: {
        type: 'select',
        labels: {
          '': 'None'
        }
      },
      type: { name: 'select' },
      table: {
        category: 'Icon'
      }
    },
    rightIcon: {
      if: { arg: 'multiple', eq: false },
      description: '文字の右側にアイコンを表示します。',
      options: ['', ...iconOption],
      control: {
        type: 'select',
        labels: {
          '': 'None'
        }
      },
      type: { name: 'select' },
      table: {
        category: 'Icon'
      }
    },
    addClass: {
      description:
        '追加のクラスを指定します。複数指定する場合はスペースで区切ります。',
      control: 'text',
      table: {
        disable: true
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
export const Default = Template.bind({});
Default.args = {
  multiple: false,
  color: '',
  text: 'ラベルテキスト',
  href: ''
};
Default.storyName = 'デフォルト';
export const Link = Template.bind({});
Link.storyName = 'リンクあり';
Link.args = {
  ...Default.args,
  href: '#'
};
export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
  multipleLabels: [
    {
      text: 'ラベルテキスト1',
      href: '#'
    },
    {
      text: 'ラベルテキスト2'
    }
  ]
};
Multiple.storyName = '複数配置';
