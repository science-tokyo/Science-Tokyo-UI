import beautify from 'js-beautify';
import renderComponent from './IconButton.njk';
import iconOption from '/src/util/iconOption'; // iconの選択肢を定義したファイル

export default {
  title:
    'プリミティブコンポーネント Primitive/アクション Action/アイコンボタン Icon button',
  argTypes: {
    type: {
      if: { arg: 'multiple', neq: true },
      description: 'HTMLタイプを指定します。',
      options: ['link', 'button'],
      control: 'radio',
      table: {
        defaultValue: {
          summary: 'link',
          type: { summary: '"link"|"button"' }
        }
      }
    },
    label: {
      if: { arg: 'multiple', neq: true },
      description: 'ボタンのラベルを指定します。',
      control: 'text',
      table: {
        category: 'Label'
      }
    },
    icon: {
      if: { arg: 'label', eq: '' },
      description: 'ボタンに表示するアイコンを指定します。',
      options: ['', ...iconOption],
      control: {
        type: 'select',
        labels: {
          '': 'None'
        }
      },
      type: {
        name: 'select'
      },
      table: {
        category: 'Label'
      }
    },
    href: {
      description: 'リンク先のURLを指定します。',
      if: { arg: 'type', eq: 'link' },
      control: 'text',
      table: {
        category: 'Link'
      }
    },
    external: {
      description: 'リンク先が外部ページの場合に有効にします。',
      if: { arg: 'type', eq: 'link' },
      control: 'boolean',
      table: {
        category: 'Link'
      }
    },
    style: {
      if: { arg: 'multiple', neq: true },
      description: 'ボタンのスタイルを指定します。',
      options: ['circle', 'square'],
      control: 'select',
      table: {
        category: 'Style',
        defaultValue: { summary: 'circle' },
        type: { summary: '"circle"|"square"' }
      }
    },
    noBorder: {
      if: { arg: 'multiple', neq: true },
      description: 'ボタンの枠線を非表示にします。',
      control: 'boolean',
      table: {
        category: 'Style'
      }
    },
    size: {
      if: { arg: 'multiple', neq: true },
      description: 'ボタンのサイズを指定します。',
      options: ['L', 'M', 'S'],
      control: 'select',
      table: {
        category: 'Size',
        defaultValue: { summary: 'L' },
        type: { summary: '"L"|"M"|"S"' }
      }
    },
    disabled: {
      if: { arg: 'multiple', neq: true },
      description: 'ボタンを無効状態にします。',
      control: 'boolean',
      table: {
        category: 'Style'
      }
    },
    multiple: {
      description: '複数のボタンを表示します。',
      control: 'boolean',
      table: {
        disable: true
      }
    },
    multipleLayout: {
      if: { arg: 'multiple', eq: true },
      description: '複数のボタンの表示レイアウトを指定します。',
      options: ['', 'horizontal'],
      control: {
        type: 'radio',
        labels: {
          '': '縦積み',
          horizontal: '横並び'
        }
      },
      table: {
        disable: true
      }
    },
    items: {
      if: { arg: 'multiple', eq: true },
      description: '複数のボタンのラベルを指定します。',
      control: 'array'
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
 * @param {string} args.type
 * @param {string} args.href
 * @param {boolean} args.external
 * @param {string} args.style
 * @param {string} args.label
 * @param {string} [args.size]
 * @param {string} [args.leftIcon]
 * @param {string} [args.rightIcon]
 * @param {boolean} [args.disabled]
 * @param {boolean} [args.fixed]
 */
const Template = (args) => {
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
  type: 'link',
  label: '',
  noBorder: false,
  disabled: false,
  size: '',
  icon: 'arrow_up',
  style: '',
  href: '#',
  external: false
};
Default.storyName = 'デフォルト';
export const Circle = Template.bind({});
Circle.args = {
  multiple: true,
  items: [
    { style: 'circle', icon: 'arrow_up' },
    { style: 'circle', noBorder: true, icon: 'arrow_up', disabled: true },
    { style: 'circle', noBorder: true, icon: 'arrow_up' }
  ]
};
Circle.storyName = 'Circle';
export const Square = Template.bind({});
Square.args = {
  multiple: true,
  items: [
    { style: 'square', icon: 'arrow_up' },
    { style: 'square', noBorder: true, icon: 'arrow_up', disabled: true },
    { style: 'square', noBorder: true, icon: 'arrow_up' }
  ]
};
Square.storyName = 'Square';
export const Size = Template.bind({});
Size.args = {
  multiple: true,
  items: [
    { style: 'circle', size: 'L', icon: 'arrow_up' },
    { style: 'circle', size: 'M', icon: 'arrow_up' },
    { style: 'circle', size: 'S', icon: 'arrow_up' }
  ]
};
Size.storyName = 'サイズ';
export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
  items: [
    { style: 'square', icon: 'arrow_down', size: 'M' },
    { style: 'square', icon: 'arrow_up', size: 'M' }
  ]
};
Multiple.storyName = '複数配置';
