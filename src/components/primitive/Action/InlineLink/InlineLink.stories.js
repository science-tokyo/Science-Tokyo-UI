import beautify from 'js-beautify';
import renderComponent from './InlineLink.njk';

export default {
  title:
    'プリミティブコンポーネント Primitive/アクション Action/インラインリンク Inline link',
  argTypes: {
    href: {
      description: 'リンク先のURLを指定します。',
      control: 'text',
      table: {
        category: 'Link'
      }
    },
    external: {
      if: { arg: 'document', eq: false },
      description: 'リンク先が外部ページの場合に有効にします。',
      control: 'boolean',
      table: {
        category: 'Icon'
      }
    },
    document: {
      if: { arg: 'external', eq: false },
      description: 'リンク先がドキュメントがドキュメントの場合に有効にします。',
      control: 'boolean',
      table: {
        category: 'Icon'
      }
    },
    label: {
      description: 'リンクのラベルを指定します。',
      control: 'text',
      table: {
        category: 'Label'
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
Default.storyName = 'デフォルト';
Default.args = {
  label: 'リンクテキスト',
  href: '#',
  external: false,
  document: false
};
