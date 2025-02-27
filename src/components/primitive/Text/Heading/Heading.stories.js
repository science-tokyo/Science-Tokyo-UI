import beautify from 'js-beautify';
import renderComponent from './Heading.njk';

export default {
  title: 'プリミティブコンポーネント Primitive/テキスト Text/見出し Heading',
  argTypes: {
    type: {
      description: '見出しタイプを指定します。',
      options: ['normal', 'mediaHeading'],
      control: 'radio',
      table: {
        type: { summary: '"normal"|"mediaHeading"' }
      }
    },
    tag: {
      if: { arg: 'type', eq: 'normal' },
      description: 'HTML タグを指定します。',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
      control: 'select',
      table: {
        disable: true,
        type: { summary: '"h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"p"' }
      }
    },
    headingLevel: {
      if: { arg: 'type', eq: 'normal' },
      description: '見出しレベルを指定します。',
      options: ['1', '2', '3', '4', '5', '6'],
      control: {
        type: 'select',
        labels: {
          1: '1',
          2: '2',
          3: '3',
          4: '4',
          5: '5',
          6: '6'
        }
      }
    },
    gradation: {
      if: { arg: 'type', eq: 'normal' },
      description:
        '見出しタイプが normal で headingLevel が1の場合のみ、グラデーションスタイルを選択できます。',
      control: 'boolean'
    },
    text: {
      description: 'タイトルテキストを指定します。',
      control: 'text'
    },
    lead: {
      if: { arg: 'type', eq: 'normal' },
      description: 'リード文を指定します。',
      control: 'text'
    },
    shoulder: {
      description: '見出しのショルダーテキストを指定します。',
      control: 'text'
    },
    copyText: {
      if: { arg: 'type', eq: 'mediaHeading' },
      description: 'コピーテキストを指定します。',
      control: 'text'
    },
    publishDate: {
      if: { arg: 'type', eq: 'mediaHeading' },
      description: '公開日を指定します。',
      control: 'text'
    },
    updateDate: {
      if: { arg: 'type', eq: 'mediaHeading' },
      description: '更新日を指定します。',
      control: 'text'
    },
    multipleLabels: {
      if: { arg: 'type', eq: 'mediaHeading' },
      description: '複数のラベルを指定します。',
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
 * @param {string} args.tag
 * @param {string} args.headingLevel
 * @param {string} args.text
 */
const Template = (args = {}) => {
  return beautify.html(
    renderComponent({
      storybookArgs: args
    }),
    { indent_size: 2, preserve_newlines: false }
  );
};
export const h1 = Template.bind({});
h1.storyName = 'h1';
h1.args = {
  type: 'normal',
  tag: '',
  headingLevel: '1',
  gradation: false,
  text: 'h1 タイトル文字列',
  shoulder: 'ショルダーテキスト',
  lead: 'リードテキストテキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。',
  copyText:
    'コピーテキストが入ります。コピーテキストが入ります。コピーテキストが入ります。',
  publishDate: '2024年12月31日',
  updateDate: '2025年01月01日',
  multipleLabels: [
    {
      text: 'メディア種別',
      href: '#'
    },
    {
      text: 'タグ分類',
      href: '#'
    },
    {
      text: 'タグ分類',
      href: '#'
    }
  ]
};
export const h2 = Template.bind({});
h2.storyName = 'h2';
h2.args = {
  ...h1.args,
  headingLevel: '2',
  text: 'h2 タイトル文字列'
};
export const h3 = Template.bind({});
h3.storyName = 'h3';
h3.args = {
  ...h1.args,
  headingLevel: '3',
  text: 'h3 タイトル文字列'
};
export const h4 = Template.bind({});
h4.storyName = 'h4';
h4.args = {
  ...h1.args,
  headingLevel: '4',
  text: 'h4 タイトル文字列'
};
export const h5 = Template.bind({});
h5.storyName = 'h5';
h5.args = {
  ...h1.args,
  headingLevel: '5',
  text: 'h5 タイトル文字列'
};
export const h6 = Template.bind({});
h6.storyName = 'h6';
h6.args = {
  ...h1.args,
  headingLevel: '6',
  text: 'h6 タイトル文字列'
};
export const pageHeader = Template.bind({});
pageHeader.storyName = 'ページヘッダー';
pageHeader.args = {
  ...h1.args,
  gradation: true
};
export const mediaHeading = Template.bind({});
mediaHeading.storyName = '記事用ページヘッダー';
mediaHeading.args = {
  ...h1.args,
  type: 'mediaHeading',
  headingLevel: '',
  text: 'タイトルテキストタイトルテキストタイトルテキスト1',
  shoulder: 'シリーズ名が入ります。シリーズ名が入ります。vol.〇〇と入ります。'
};
