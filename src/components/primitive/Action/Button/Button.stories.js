import beautify from 'js-beautify';
import renderComponent from './Button.njk';

export default {
  title: 'プリミティブコンポーネント Primitive/アクション Action/ボタン Button',
  argTypes: {
    type: {
      if: { arg: 'multiple', eq: false },
      description: 'HTMLタイプを指定します。',
      options: ['link', 'button'],
      control: 'radio',
      table: {
        defaultValue: { summary: 'link' },
        type: { summary: '"link"|"button"' }
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
      if: { arg: 'multiple', eq: false },
      description: 'ボタンのスタイルを指定します。',
      options: ['primary', 'secondary', 'tertiary'],
      control: 'select',
      table: {
        category: 'Style',
        defaultValue: { summary: 'secondary' },
        type: { summary: '"primary"|"secondary"|"tertiary"' }
      }
    },
    size: {
      if: { arg: 'multiple', eq: false },
      description: 'ボタンの幅を指定します。',
      options: ['L', 'M', 'S', 'XS', 'XXS'],
      control: 'select',
      table: {
        category: 'Size',
        defaultValue: { summary: 'L' },
        type: { summary: '"L"|"M"|"S"|"XS"|"XXS"' }
      }
    },
    fixed: {
      if: { arg: 'multiple', eq: false },
      description: 'ボタンの幅を100%にします。',
      control: 'boolean',
      table: {
        category: 'Size'
      }
    },
    scale: {
      if: { arg: 'multiple', eq: false },
      description: 'ボタンの大きさを指定します。',
      options: ['L', 'M', 'S', 'XS', 'XXS'],
      control: 'select',
      table: {
        category: 'Size',
        defaultValue: { summary: 'M' },
        type: { summary: '"L"|"M"|"S"|"XS"|"XXS"' }
      }
    },
    label: {
      if: { arg: 'multiple', eq: false },
      description: 'ボタンのラベルを指定します。',
      control: 'text',
      table: {
        category: 'Label'
      }
    },
    weight: {
      if: { arg: 'multiple', eq: false },
      description: '文字のフォントウェイトを指定します。',
      options: ['Normal', ''],
      control: {
        type: 'select',
        labels: {
          '': 'Bold'
        }
      },
      table: {
        category: 'Label',
        defaultValue: { summary: 'Bold' },
        type: { summary: '"Normal"|"Bold"' }
      }
    },
    leftIcon: {
      if: { arg: 'external', eq: false },
      description: 'ボタンの左側に表示するアイコンを指定します。',
      options: ['', 'arrow_left'],
      control: {
        type: 'select',
        labels: {
          '': 'None'
        }
      },
      table: {
        category: 'Icon',
        type: { summary: '"arrow_left"' }
      }
    },
    rightIcon: {
      if: { arg: 'external', eq: false },
      description: 'ボタンの右側に表示するアイコンを指定します。',
      options: [
        '',
        'chevron_right',
        'arrow_right',
        'arrow_down',
        'arrow_up',
        'pdf'
      ],
      control: {
        type: 'select',
        labels: {
          '': 'None'
        }
      },
      table: {
        category: 'Icon',
        type: {
          summary: '"chevron_right"|"arrow_right"|"arrow_down"|"arrow_up"|"pdf"'
        }
      }
    },
    disabled: {
      if: { arg: 'multiple', eq: false },
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
      // if: { arg: 'multiple', eq: true },
      description: '複数のボタンのラベルを指定します。',
      control: 'array',
      table: {
        disable: true
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
  style: '',
  disabled: false,
  size: '',
  fixed: false,
  scale: '',
  label: 'ボタンラベル',
  href: '#',
  external: false,
  rightIcon: 'chevron_right'
};
Default.storyName = 'デフォルト';
export const style = Template.bind({});
style.args = {
  multiple: true,
  multipleLayout: '',
  items: [
    {
      label: 'ボタンラベル',
      size: 'S',
      style: 'primary'
    },
    {
      label: 'ボタンラベル',
      size: 'S',
      style: 'secondary'
    },
    {
      label: 'ボタンラベル',
      size: 'S',
      style: 'tertiary'
    }
  ]
};
style.storyName = 'スタイル';
export const scale = Template.bind({});
scale.args = {
  multiple: true,
  multipleLayout: '',
  items: [
    {
      label: 'ボタンラベル',
      size: 'S',
      scale: 'L'
    },
    {
      label: 'ボタンラベル',
      size: 'S',
      scale: 'M'
    },
    {
      label: 'ボタンラベル',
      size: 'S',
      scale: 'S'
    },
    {
      label: 'ボタンラベル',
      size: 'S',
      scale: 'XS'
    },
    {
      label: 'ボタンラベル',
      size: 'S',
      scale: 'XXS'
    }
  ]
};
scale.storyName = '大きさ';
export const size = Template.bind({});
size.args = {
  multiple: true,
  multipleLayout: '',
  items: [
    {
      label: 'ボタンラベル',
      fixed: true
    },
    {
      label: 'ボタンラベル',
      size: 'L'
    },
    {
      label: 'ボタンラベル',
      size: 'M'
    },
    {
      label: 'ボタンラベル',
      size: 'S'
    },
    {
      label: 'ボタンラベル',
      size: 'XS'
    },
    {
      label: 'ボタンラベル',
      size: 'XXS'
    }
  ]
};
size.storyName = '幅';
export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
  items: [
    { label: 'ボタン1', size: 'S' },
    { label: 'ボタン2', size: 'S' },
    { label: 'ボタン3', size: 'S' }
  ]
};
Multiple.storyName = '複数配置';
