import beautify from 'js-beautify';
import renderComponent from './ImportantNotice.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/グループ Group/重要なお知らせ Important notice',
  argTypes: {
    title: {
      description: 'タイトルを指定します。',
      control: 'text'
    },
    items: {
      description: '更新履歴を指定します。',
      control: 'array'
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
Default.storyName = 'デフォルト';
Default.args = {
  title: '重要なお知らせ',
  items: [
    {
      date: '2024年12月31日',
      title:
        'リンクテキスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
      url: '#'
    },
    {
      date: '2024年12月31日',
      title:
        'リンクテキスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
      url: '#'
    },
    {
      date: '2024年12月31日',
      title:
        'リンクテキスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
      url: '#'
    }
  ]
};
