import beautify from 'js-beautify';
import renderComponent from './LinkList.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/グループ Group/リンクリスト Link list',
  argTypes: {
    type: {
      description: 'リンクリストのタイプを指定します。',
      options: ['', 'button', 'related'],
      control: {
        type: 'select',
        labels: {
          '': 'default'
        }
      }
    },
    layout: {
      if: { arg: 'type', eq: '' },
      description: 'リンクリストのレイアウトを指定します。',
      options: ['', 'horizontal'],
      control: {
        type: 'select',
        labels: {
          '': '縦積み',
          horizontal: '横並び'
        }
      }
    },
    isSection: {
      description: 'セクションを指定します。',
      control: 'boolean'
    },
    sectionTitle: {
      if: { arg: 'isSection', eq: true },
      description: 'セクションタイトルを指定します。',
      control: 'text'
    },
    links: {
      description: 'リンクを指定します。',
      control: 'array'
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
  type: '',
  links: [
    {
      href: '#',
      text: 'サイト内リンク'
    },
    {
      href: '#',
      text: '外部リンク',
      external: true
    },
    {
      href: '#',
      text: 'ファイルリンク',
      rightIcon: 'pdf'
    }
  ]
};
export const horizontal = Template.bind({});
horizontal.storyName = '横並び';
horizontal.args = {
  ...Default.args,
  layout: 'horizontal'
};
export const Button = Template.bind({});
Button.storyName = 'ボタン';
Button.args = {
  ...Default.args,
  type: 'button',
  links: [
    {
      href: '#',
      text: 'リンクテキスト',
      rightIcon: 'chevron_right'
    },
    {
      href: '#',
      text: 'リンクテキスト',
      external: true
    },
    {
      href: '#',
      text: 'リンクテキスト',
      rightIcon: 'pdf'
    }
  ]
};
export const Related = Template.bind({});
Related.storyName = '関連リンク';
Related.args = {
  ...Default.args,
  type: 'related',
  links: [
    {
      href: '#',
      text: 'リンクテキスト「自然界はどのようにしてできているのだろう?」',
      rightIcon: 'chevron_right'
    },
    {
      href: '#',
      text: 'リンクテキスト「自然界はどのようにしてできているのだろう?」',
      external: true
    },
    {
      href: '#',
      text: 'リンクテキスト「自然界はどのようにしてできているのだろう?」',
      rightIcon: 'pdf'
    }
  ]
};
