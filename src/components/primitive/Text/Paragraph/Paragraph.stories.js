import beautify from 'js-beautify';
import renderComponent from './Paragraph.njk';

export default {
  title: 'プリミティブコンポーネント Primitive/テキスト Text/段落 Paragraph',
  argTypes: {
    text: {
      description: '段落のテキストを指定します。',
      control: 'text'
    },
    isCopy: {
      description: 'キャッチコピー段落か否かを指定します。',
      control: 'boolean'
    },
    size: {
      if: { arg: 'isCopy', eq: false },
      description: '基本文字のサイズを指定します。',
      control: 'select',
      options: ['LL', 'L', 'M', 'S', 'SS', 'SSS'],
      table: {
        defaultValue: { summary: 'M' },
        type: { summary: '"LL"|"L"|"M"|"S"|"SS"|"SSS"' }
      }
    },
    copySize: {
      if: { arg: 'isCopy', eq: true },
      description: 'キャッチコピーのサイズを指定します。',
      control: 'select',
      options: ['LL', 'L', 'M'],
      table: {
        defaultValue: { summary: 'M' },
        type: { summary: '"LL"|"L"|"M"' }
      }
    },
    textAlign: {
      description: '段落のテキスト寄せを指定します。',
      control: 'select',
      options: ['Left', 'Center', 'Right'],
      table: {
        defaultValue: { summary: 'Left' },
        type: { summary: '"Left"|"Center"|"Right"' }
      }
    },
    fontWeight: {
      description: '段落のフォントウェイトを指定します。',
      control: 'select',
      options: ['Light', 'Regular', 'Medium', 'Bold'],
      table: {
        type: { summary: '"Light"|"Regular"|"Medium"|"Bold"' }
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
Default.storyName = '基本文字スタイル';
Default.args = {
  text: '本文テキスト 「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。「自然界はどのようにしてできているのだろう?」',
  isCopy: false,
  copySize: 'M'
};
export const catchCopy = Template.bind({});
catchCopy.storyName = 'キャッチコピースタイル';
catchCopy.args = {
  ...Default.args,
  isCopy: true
};
