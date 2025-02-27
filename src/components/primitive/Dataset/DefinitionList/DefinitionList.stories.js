import beautify from 'js-beautify';
import renderComponent from './DefinitionList.njk';

export default {
  title:
    'プリミティブコンポーネント Primitive/データセット Dataset/定義リスト Definition list',
  argTypes: {
    items: {
      description: '定義リストの項目を指定します。',
      control: 'object',
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
    cols: {
      description: '列数を指定します。',
      options: ['', '2', '3'],
      control: {
        type: 'select',
        labels: {
          '': '指定なし',
          2: '2列',
          3: '3列'
        }
      },
      table: {
        type: { summary: '"2列"|"3列"' }
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
  items: [
    {
      term: '説明用語',
      description:
        '詳細説明「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。'
    },
    {
      term: '説明用語',
      description:
        '詳細説明「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。'
    },
    {
      term: '説明用語',
      description:
        '詳細説明「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。'
    }
  ]
};
Default.storyName = 'デフォルト';
