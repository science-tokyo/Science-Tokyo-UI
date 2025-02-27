import beautify from 'js-beautify';
import renderComponent from './Table.njk';

export default {
  title:
    'プリミティブコンポーネント Primitive/データセット Dataset/テーブル Table',
  argTypes: {
    headerPosition: {
      description: 'ヘッダーの位置を指定します。',
      control: 'select',
      options: ['Top', 'Left', 'Top-Left'],
      control: {
        type: 'select',
        labels: {
          Top: '行',
          Left: '列',
          'Top-Left': '行列'
        }
      },
      table: {
        type: {
          summary: '"行"|"列"|"行列"'
        }
      }
    },
    caption: {
      description: 'キャプションを指定します。',
      control: 'text'
    },
    contents: {
      description: 'テーブルの内容を指定します。',
      control: 'object',
      table: {
        disable: true
      }
    },
    layoutFixed: {
      description: 'テーブルのレイアウトを均等幅にします。',
      control: 'boolean'
    },
    layout: {
      description: 'テーブルのレイアウトを指定します。',
      control: 'select',
      options: ['', 'firstQuarter', 'lastQuarter', 'firstHalf', 'lastHalf'],
      control: {
        type: 'select',
        labels: {
          '': '指定なし',
          firstQuarter: '先頭列幅25%',
          lastQuarter: '最終列幅25%',
          firstHalf: '先頭列幅50%',
          lastHalf: '最終列幅50%'
        }
      },
      table: {
        type: {
          summary: '"先頭列幅25%"|"最終列幅25%"|"先頭列幅50%"|"最終列幅50%"'
        }
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
 * @param {String} args.headerPosition
 * @param {String} args.caption
 * @param {Array} args.contents
 * @param {Boolean} args.layoutFixed
 */
const Template = (args = {}) => {
  return beautify.html(
    renderComponent({
      storybookArgs: args
    }),
    { indent_size: 2, preserve_newlines: false }
  );
};
export const TopHeader = Template.bind({});
TopHeader.args = {
  headerPosition: 'Top',
  caption: 'テーブルのキャプション',
  contents: [
    [
      'テキストが入ります。',
      'テキストが入ります。テキストが入ります。テキストが入ります。',
      'テキストが入ります。テキストが入ります。'
    ],
    [
      'テキストが入ります。',
      'テキストが入ります。テキストが入ります。テキストが入ります。',
      'テキストが入ります。テキストが入ります。'
    ],
    [
      'テキストが入ります。',
      'テキストが入ります。テキストが入ります。テキストが入ります。',
      'テキストが入ります。テキストが入ります。'
    ],
    [
      'テキストが入ります。',
      'テキストが入ります。テキストが入ります。テキストが入ります。',
      'テキストが入ります。テキストが入ります。'
    ]
  ],
  layoutFixed: false
};
TopHeader.storyName = '行ヘッダー';
export const LeftHeader = Template.bind({});
LeftHeader.args = {
  headerPosition: 'Left',
  caption: 'テーブルのキャプション',
  contents: [
    [
      'テキストが入ります。',
      'テキストが入ります。テキストが入ります。テキストが入ります。',
      'テキストが入ります。テキストが入ります。'
    ],
    [
      'テキストが入ります。',
      'テキストが入ります。テキストが入ります。テキストが入ります。',
      'テキストが入ります。テキストが入ります。'
    ],
    [
      'テキストが入ります。',
      'テキストが入ります。テキストが入ります。テキストが入ります。',
      'テキストが入ります。テキストが入ります。'
    ],
    [
      'テキストが入ります。',
      'テキストが入ります。テキストが入ります。テキストが入ります。',
      'テキストが入ります。テキストが入ります。'
    ]
  ],
  layoutFixed: false
};
LeftHeader.storyName = '列ヘッダー';
export const TopLeftHeader = Template.bind({});
TopLeftHeader.args = {
  headerPosition: 'Top-Left',
  caption: 'テーブルのキャプション',
  contents: [
    [
      'テキストが入ります。',
      'テキストが入ります。テキストが入ります。テキストが入ります。',
      'テキストが入ります。テキストが入ります。'
    ],
    [
      'テキストが入ります。',
      'テキストが入ります。テキストが入ります。テキストが入ります。',
      'テキストが入ります。テキストが入ります。'
    ],
    [
      'テキストが入ります。',
      'テキストが入ります。テキストが入ります。テキストが入ります。',
      'テキストが入ります。テキストが入ります。'
    ],
    [
      'テキストが入ります。',
      'テキストが入ります。テキストが入ります。テキストが入ります。',
      'テキストが入ります。テキストが入ります。'
    ]
  ],
  layoutFixed: false
};
TopLeftHeader.storyName = '行列ヘッダー';
