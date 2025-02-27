import beautify from 'js-beautify';
import renderComponent from './UtilityLink.njk';
import iconOption from '/src/util/iconOption'; // iconの選択肢を定義したファイル

export default {
  title:
    'プリミティブコンポーネント Primitive/アクション Action/ユーティリティリンク Utility link',
  argTypes: {
    multiple: {
      description: '複数のリンクを表示します。',
      control: 'boolean',
      table: {
        disable: true
      }
    },
    layout: {
      if: { arg: 'multiple', eq: true },
      description: '複数表示時のレイアウトを指定します。',
      options: ['', 'vertical', 'horizontal'],
      control: {
        type: 'select',
        labels: {
          '': 'default(horizontal)'
        }
      },
      table: {
        disable: true
      }
    },
    justify: {
      if: { arg: 'layout', eq: 'horizontal' },
      description: '複数表示時の配置を指定します。',
      options: ['', 'Start', 'Center', 'End'],
      control: {
        type: 'select',
        labels: {
          '': 'default(start)'
        }
      },
      table: {
        disable: true
      }
    },
    items: {
      if: { arg: 'multiple', eq: true },
      description: '複数のリンクの情報を指定します。',
      control: 'array',
      table: {
        disable: true
      }
    },
    href: {
      if: { arg: 'multiple', eq: false },
      description: 'リンク先のURLを指定します。',
      control: 'text',
      table: {
        category: 'Link'
      }
    },
    external: {
      if: { arg: 'multiple', eq: false },
      description: 'リンク先が外部ページの場合に有効にします。',
      control: 'boolean',
      table: {
        category: 'Link'
      }
    },
    current: {
      if: { arg: 'multiple', eq: false },
      description: 'リンク先が現在のページの場合に有効にします。',
      control: 'boolean',
      table: {
        category: 'Link'
      }
    },
    label: {
      if: { arg: 'multiple', eq: false },
      description: 'リンクのラベルを指定します。',
      control: 'text',
      table: {
        category: 'Label'
      }
    },
    leftIcon: {
      if: { arg: 'external', eq: false },
      description: 'リンクの左側に表示するアイコンを指定します。',
      options: ['', ...iconOption],
      control: {
        type: 'select',
        labels: {
          '': 'None'
        }
      },
      table: {
        category: 'Icon',
        type: { summary: 'select' }
      }
    },
    rightIcon: {
      if: { arg: 'external', eq: false },
      description: 'リンクの右側に表示するアイコンを指定します。',
      options: ['', ...iconOption],
      control: {
        type: 'select',
        labels: {
          '': 'None'
        }
      },
      table: {
        category: 'Icon',
        type: { summary: 'select' }
      }
    },
    size: {
      if: { arg: 'multiple', eq: false },
      description: 'リンクのサイズを指定します。',
      options: ['LL', 'L', '', 'S', 'SS'],
      control: {
        type: 'select',
        labels: {
          '': 'M'
        }
      },
      table: {
        category: 'Size',
        defaultValue: { summary: 'M' },
        type: { summary: '"LL"|"L"|"M"|"S"|"SS"' }
      }
    },
    fixed: {
      if: { arg: 'multiple', eq: false },
      description: 'リンクを幅いっぱいにするかどうかを指定します。',
      control: 'boolean',
      table: {
        category: 'Size'
      }
    },
    align: {
      if: { arg: 'fixed', eq: true },
      description:
        'リンクのテキストを左寄せ、中央寄せ、右寄せのいずれかに指定します。',
      options: ['Left', 'Center', 'Right'],
      control: 'select',
      table: {
        category: 'Size',
        defaultValue: { summary: 'Left' },
        type: { summary: '"Left"|"Center"|"Right"' }
      }
    },
    fontWeight: {
      if: { arg: 'multiple', eq: false },
      description: 'リンクのフォントウェイトを指定します。',
      options: ['', 'Bold'],
      control: {
        type: 'select',
        labels: {
          '': 'Normal'
        }
      },
      table: {
        category: 'Label',
        defaultValue: { summary: 'Normal' },
        type: { summary: '"Normal"|"Bold"' }
      }
    },
    rounded: {
      if: { arg: 'multiple', eq: false },
      description: 'リンクの角を丸くするかどうかを指定します。',
      control: 'boolean',
      table: {
        category: 'Style'
      }
    },
    bordered: {
      if: { arg: 'multiple', eq: false },
      description: 'リンクにボーダーをつけるかどうかを指定します。',
      control: 'boolean',
      table: {
        category: 'Style'
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
 * @param {string} args.href
 * @param {boolean} args.external
 * @param {string} args.label
 * @param {string} args.leftIcon
 * @param {string} args.rightIcon
 * @param {string} args.size
 * @param {string} args.weight
 * @param {boolean} args.rounded
 * @param {boolean} args.bordered
 * @param {boolean} args.fixed
 * @param {string} args.align
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
  bordered: false,
  rounded: false,
  size: '',
  fixed: false,
  label: 'リンクテキスト',
  fontWeight: '',
  href: '#',
  external: false,
  current: false,
  leftIcon: '',
  rightIcon: 'chevron_right'
};
Default.storyName = 'デフォルト';
export const Basic = Template.bind({});
Basic.args = {
  multiple: true,
  layout: 'horizontal',
  items: [
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      size: 'LL'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      size: 'L'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      size: 'M'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      size: 'S'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      size: 'SS'
    }
  ]
};
1;
Basic.storyName = 'Default';
export const Bordered = Template.bind({});
Bordered.args = {
  multiple: true,
  layout: 'horizontal',
  items: [
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      bordered: true,
      current: true,
      size: 'LL'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      bordered: true,
      size: 'LL'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      bordered: true,
      size: 'L'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      bordered: true,
      size: 'M'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      bordered: true,
      size: 'S'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      bordered: true,
      size: 'SS'
    }
  ]
};
Bordered.storyName = 'Bordered';
export const Rounded = Template.bind({});
Rounded.args = {
  multiple: true,
  layout: 'horizontal',
  items: [
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      bordered: true,
      rounded: true,
      current: true,
      size: 'LL'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      bordered: true,
      rounded: true,
      size: 'LL'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      bordered: true,
      rounded: true,
      size: 'L'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      bordered: true,
      rounded: true,
      size: 'M'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      bordered: true,
      rounded: true,
      size: 'S'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      bordered: true,
      rounded: true,
      size: 'SS'
    }
  ]
};
Rounded.storyName = 'Rounded';
export const Rounded_noBorder = Template.bind({});
Rounded_noBorder.args = {
  multiple: true,
  layout: 'horizontal',
  items: [
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      rounded: true,
      current: true,
      size: 'LL'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      rounded: true,
      size: 'LL'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      rounded: true,
      size: 'L'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      rounded: true,
      size: 'M'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      rounded: true,
      size: 'S'
    },
    {
      href: '#',
      label: 'リンクテキスト',
      rightIcon: 'chevron_right',
      rounded: true,
      size: 'SS'
    }
  ]
};
Rounded_noBorder.storyName = 'Rounded - noBorder';
export const Fixed = Template.bind({});
Fixed.args = {
  ...Default.args,
  bordered: true,
  fixed: true,
  align: 'Center'
};
Fixed.storyName = '幅100%';
export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
  items: [
    {
      href: '#',
      external: true,
      label: 'リンクテキスト1'
    },
    {
      href: '#',
      external: true,
      fontWeight: 'Bold',
      label: 'リンクテキスト2'
    }
  ]
};
Multiple.storyName = '複数配置';
