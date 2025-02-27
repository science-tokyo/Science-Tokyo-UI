import beautify from 'js-beautify';
import renderComponent from './OrderList.njk';

export default {
  title:
    'プリミティブコンポーネント Primitive/データセット Dataset/順序付きリスト Order list',
  argTypes: {
    items: {
      description: 'リストの項目を指定します。',
      control: 'array',
      table: {
        disable: true
      }
    },
    size: {
      description: '文字のサイズを指定します。',
      options: ['L', 'M', 'S'],
      control: 'select',
      table: {
        defaultValue: { summary: 'M' },
        type: { summary: '"L"|"M"|"S"' }
      }
    },
    isNotes: {
      description: '注釈スタイルを指定します。',
      control: 'boolean'
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
 * @param {Array} args.items
 */
const Template = (args, { globals }) => {
  const { locale } = globals;

  // 言語ごとのラベルを定義
  const labels = {
    ja: 'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
    en: 'List. Curabitur tempor quis eros tempus lacinia. Nam bibendum pellentesque quam a convallis. Sed ut vulputate nisi. Integer in felis sed leo vestibulum venenatis.'
  };

  const updatedArgs = {
    ...args,
    localeLabel: labels[locale] || labels.ja
  };

  return beautify.html(
    renderComponent({
      storybookArgs: updatedArgs
    }),
    { indent_size: 2, preserve_newlines: false }
  );
};
export const Default = Template.bind({});
Default.args = {
  items: [
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。'
  ],
  size: '',
  isNotes: false
};
Default.storyName = 'デフォルト';
export const Notes = Template.bind({});
Notes.args = {
  items: [
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
    {
      listItem:
        'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
      child: [
        'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
        'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。'
      ]
    },
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。'
  ],
  isNotes: true
};
Notes.storyName = '順序付き注釈';
export const Nested = Template.bind({});
Nested.args = {
  items: [
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
    {
      listItem:
        'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
      child: [
        'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
        'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。'
      ]
    },
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
    'リスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。'
  ]
};
Nested.storyName = 'リストの階層化';
