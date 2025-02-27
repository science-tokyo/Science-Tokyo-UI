import beautify from 'js-beautify';
import renderComponent from './AnchorLink.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/グループ Group/アンカーリンク Anchor link',
  argTypes: {
    multiple: {
      description: '複数のリンクを表示します。',
      control: 'boolean'
    },
    items: {
      if: { arg: 'multiple', eq: true },
      description: '複数のリンクの情報を指定します。',
      control: 'array'
    },
    href: {
      if: { arg: 'multiple', neq: true },
      description: 'リンク先のURLを指定します。',
      control: 'text'
    },
    label: {
      if: { arg: 'multiple', neq: true },
      description: 'リンクのラベルを指定します。',
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
export const Default = Template.bind({});
Default.storyName = 'デフォルト';
Default.args = {
  multiple: true,
  items: [
    {
      href: '#',
      label: 'アンカーリンク',
      rightIcon: 'arrow_down'
    },
    {
      href: '#',
      label: 'アンカーリンク',
      rightIcon: 'arrow_down'
    },
    {
      href: '#',
      label: 'アンカーリンク',
      rightIcon: 'arrow_down'
    },
    {
      href: '#',
      label: 'アンカーリンク',
      rightIcon: 'arrow_down'
    },
    {
      href: '#',
      label: 'アンカーリンク',
      rightIcon: 'arrow_down'
    }
  ]
};
