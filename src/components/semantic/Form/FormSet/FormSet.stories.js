import beautify from 'js-beautify';
import renderComponent from './FormSet.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/フォーム Form/フォームセット Form set',
  argTypes: {
    formGroups: {
      description: 'フォームセットのグループを配列で指定します。',
      control: {
        type: 'array'
      }
    },
    buttonCancel: {
      description: 'キャンセルボタンの設定を指定します。',
      control: {
        type: 'object'
      }
    },
    buttonSubmit: {
      description: '送信ボタンの設定を指定します。',
      control: {
        type: 'object'
      }
    },
    addClass: {
      description:
        '追加のクラスを指定します。複数指定する場合はスペースで区切ります。',
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
Default.args = {
  formGroups: [
    {
      title: 'フォームセットタイトル',
      titleTag: 'h2',
      headingLevel: 2,
      forms: [
        {
          columnSpan: 6,
          columnSpanMedium: 6,
          columnSpanSmall: 8,
          component: 'Input',
          label: 'ラベル',
          placeholder: 'プレイスホルダー',
          required: true
        },
        {
          columnSpan: 6,
          columnSpanMedium: 6,
          columnSpanSmall: 8,
          component: 'Input',
          label: 'ラベル',
          placeholder: 'プレイスホルダー',
          required: true
        },
        {
          columnSpan: 12,
          component: 'Input',
          label: 'ラベル',
          placeholder: 'プレイスホルダー',
          required: true
        },
        {
          columnSpan: 12,
          component: 'Select',
          label: 'ラベル',
          defaultText: 'デフォルトテキスト',
          required: true
        },
        {
          columnSpan: 12,
          component: 'Checkbox',
          label: 'ラベル',
          required: true,
          checkboxItems: [
            {
              id: 'checkbox1',
              name: 'checkbox_sample',
              value: '',
              label: '選択肢1'
            },
            {
              id: 'checkbox2',
              name: 'checkbox_sample',
              value: '',
              label: '選択肢2'
            },
            {
              id: 'checkbox3',
              name: 'checkbox_sample',
              value: '',
              label: '選択肢3'
            }
          ]
        },
        {
          columnSpan: 12,
          component: 'Radiobutton',
          label: 'ラベル',
          required: true,
          radioItems: [
            { id: 'radio1', name: 'radio_sample', value: '', label: '選択肢1' },
            { id: 'radio2', name: 'radio_sample', value: '', label: '選択肢2' },
            { id: 'radio3', name: 'radio_sample', value: '', label: '選択肢3' }
          ]
        },
        {
          columnSpan: 12,
          component: 'Textarea',
          label: 'ラベル',
          defaultText: 'デフォルトテキスト',
          required: true
        }
      ]
    }
  ],
  buttonCancel: {
    type: 'button',
    label: 'キャンセル',
    style: 'secondary'
  },
  buttonSubmit: {
    type: 'button',
    label: '送信',
    style: 'primary'
  }
};
Default.storyName = 'デフォルト';
