import beautify from 'js-beautify';
import renderComponent from './Input.njk';

export default {
  title:
    'プリミティブコンポーネント Primitive/フォーム Form/インプット（入力フォーム） Input',
  argTypes: {
    required: {
      description: '入力必須項目を指定します。',
      control: 'boolean',
      table: {
        category: 'Status'
      }
    },
    disabled: {
      description: '無効状態を指定します。',
      control: 'boolean',
      table: {
        category: 'Status'
      }
    },
    error: {
      description: 'エラー状態を指定します。',
      control: 'boolean',
      table: {
        category: 'Status'
      }
    },
    errorText: {
      if: { arg: 'error', eq: true },
      description: 'エラーメッセージを指定します。',
      control: 'text',
      table: {
        category: 'Status'
      }
    },
    label: {
      description: 'フォームのラベルを指定します。',
      control: 'text',
      table: {
        category: 'Content'
      }
    },
    description: {
      description: 'フォームの説明文を指定します。',
      control: 'text',
      table: {
        category: 'Content'
      }
    },
    placeholder: {
      description: 'フォームのプレースホルダーを指定します。',
      control: 'text',
      table: {
        category: 'Content'
      }
    },
    rightIcon: {
      description: '右側に表示するアイコンを指定します。',
      options: ['', 'search', 'arrow_down', 'arrow_up', 'calendar', 'check'],
      control: {
        type: 'select',
        labels: {
          '': 'None'
        }
      },
      table: {
        category: 'Icon',
        type: {
          summary: '"search"|"arrow_down"|"arrow_up"|"calendar"|"check"'
        }
      }
    },
    closeIcon: {
      description: 'closeアイコンを表示します。',
      control: 'boolean',
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
  label: 'ラベル',
  description: '入力項目の説明文が入ります。',
  placeholder: '入力してください',
  required: false,
  disabled: false,
  error: false,
  errorText: 'エラーメッセージが入ります。',
  rightIcon: '',
  closeIcon: false
};
Default.storyName = 'デフォルト';
export const Required = Template.bind({});
Required.args = {
  ...Default.args,
  required: true
};
Required.storyName = '入力必須項目';
export const Disabled = Template.bind({});
Disabled.args = {
  ...Default.args,
  disabled: true
};
export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  error: true,
  errorText: 'エラーメッセージが入ります。'
};
