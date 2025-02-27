import beautify from 'js-beautify';
import renderComponent from './List.njk';

export default {
  title:
    'プリミティブコンポーネント Primitive/データセット Dataset/箇条書きリスト List',
  argTypes: {
    items: {
      description: 'リストの項目を指定します。',
      control: 'array',
      table: {
        disable: true
      }
    },
    size: {
      description: '文字のサイズを指定します。',
      options: ['L', 'M', 'S'],
      control: 'select',
      table: {
        defaultValue: { summary: 'M' },
        type: { summary: '"L"|"M"|"S"' }
      }
    },
    isNotes: {
      description: '注釈スタイルを指定します。',
      control: 'boolean'
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
 * @param {Array} args.items
 * @param {Boolean} args.isNotes
 */
const Template = (args, { globals }) => {
  const { locale } = globals;

  // 言語ごとのラベルを定義
  const labels = {
    ja: '情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。',
    en: 'List. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis.'
  };

  const updatedArgs = {
    ...args,
    localeLabel: labels[locale] || labels.ja
  };

  return beautify.html(
    renderComponent({
      storybookArgs: updatedArgs
    }),
    { indent_size: 2, preserve_newlines: false }
  );
};
export const Default = Template.bind({});
Default.args = {
  items: [
    '情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。',
    '情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。',
    '情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。'
  ],
  size: '',
  isNotes: false
};
Default.storyName = 'デフォルト';
export const Notes = Template.bind({});
Notes.args = {
  ...Default.args,
  isNotes: true
};
Notes.storyName = '注釈';
export const Nested = Template.bind({});
Nested.args = {
  items: [
    '情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。',
    {
      listItem:
        '情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。',
      child: [
        '情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。',
        '情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。'
      ]
    },
    {
      listItem:
        '情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。',
      child: [
        {
          listItem:
            '情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。',
          child: [
            '情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。',
            '情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。'
          ]
        },
        '情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。'
      ]
    }
  ],
  isNotes: false
};
Nested.storyName = 'リストの階層化';
