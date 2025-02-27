import beautify from 'js-beautify';
import renderComponent from './Blockquote.njk';

export default {
  title: 'プリミティブコンポーネント Primitive/テキスト Text/引用 Blockquote',
  argTypes: {
    text: {
      description: '引用文を指定します。',
      control: 'text'
    },
    cite: {
      description: '引用元を指定します。',
      control: 'text'
    },
    citeURL: {
      description: '引用元のURLを指定します。',
      control: 'text',
      table: {
        category: 'Link'
      }
    },
    linkType: {
      if: { arg: 'citeURL', not: '' },
      description: 'リンク種別を選択します。',
      options: ['chevron_right', 'external', 'pdf'],
      control: {
        type: 'select',
        labels: {
          chevron_right: 'リンク',
          external: '外部リンク',
          pdf: 'ファイル'
        }
      },
      table: {
        category: 'Link'
      }
    },
    noQuotes: {
      description: '引用符を表示しないかどうかを指定します。',
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
 * @param {boolean} args.noQuotes
 * @param {string} args.text
 * @param {string} args.citeURL
 * @param {string} args.cite
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
  noQuotes: false,
  text: '情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。',
  citeURL: '',
  linkType: 'chevron_right',
  cite: '引用元: 『XXX辞書』'
};
Default.storyName = 'デフォルト';
export const link = Template.bind({});
link.args = {
  ...Default.args,
  citeURL: 'https://example.com'
};
link.storyName = '引用元リンクあり';
