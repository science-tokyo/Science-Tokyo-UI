import beautify from 'js-beautify';
import renderComponent from './Accordion.njk';
import iconOption from '/src/util/iconOption'; // iconの選択肢を定義したファイル

export default {
  title:
    'セマンティックコンポーネント Semantic/グループ Group/アコーディオン Accordion',
  argTypes: {
    triggerLabel: {
      if: { arg: 'multiple', eq: false },
      description: 'トリガーラベルを指定します。',
      control: 'text'
    },
    triggerIcon: {
      if: { arg: 'multiple', eq: false },
      description: 'トリガーアイコンを指定します。',
      options: ['', ...iconOption],
      control: {
        type: 'select',
        labels: {
          '': 'None'
        }
      }
    },
    content: {
      if: { arg: 'multiple', eq: false },
      description: 'コンテンツを指定します。',
      control: 'text'
    },
    contentIcon: {
      if: { arg: 'multiple', eq: false },
      description: 'コンテンツアイコンを指定します。',
      options: ['', ...iconOption],
      control: {
        type: 'select',
        labels: {
          '': 'None'
        }
      }
    },
    contents: {
      if: { arg: 'multiple', eq: true },
      description: 'アコーディオンの情報を配列で指定します。',
      control: 'array'
    },
    qaStyle: {
      description: 'Q&Aのスタイルを適用します。（フロントエンド実装用）',
      control: 'boolean',
      table: {
        disable: true,
        category: 'Option'
      }
    },
    defaultOpen: {
      description: 'デフォルト表示を全開状態にします。',
      control: 'boolean',
      type: {
        name: 'boolean'
      },
      table: {
        category: 'Option'
      }
    },
    openAll: {
      description: '全てのアコーディオンを開くボタンを表示します。',
      control: 'boolean',
      table: {
        category: 'Option'
      }
    },
    multiple: {
      description: '複数のアコーディオンを表示します。',
      control: 'boolean',
      table: {
        category: 'Option'
      }
    },
    addClass: {
      description:
        '追加のクラスを指定します。複数指定する場合はスペースで区切ります。',
      control: 'text',
      table: {
        category: 'Option'
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
  multiple: true,
  openAll: false,
  defaultOpen: false,
  contents: [
    {
      triggerLabel: 'テキスト「自然界はどのようにしてできているのだろう?」',
      content:
        '<p class="c-paragraph">本文テキスト 「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。</p>'
    },
    {
      triggerLabel: 'ダミーテキストはどのような場合に使用されますか。',
      content:
        '<p class="c-paragraph">ダミーテキストは、デザインやレイアウトの作成時に使用される仮の文章です。ダミーテキストを使用すると、デザインの全体像を評価したり、テキストの配置や長さを確認したりすることができます。ダミーテキストは実際の文章ではないので、内容には意味がありません。</p>'
    }
  ]
};
Default.storyName = 'デフォルト';
export const accordion_qa = Template.bind({});
accordion_qa.storyName = 'Q＆A形式';
accordion_qa.args = {
  qaStyle: true,
  defaultOpen: false,
  openAll: false,
  multiple: true,
  contents: [
    {
      triggerMeta: 'Q1.',
      contentMeta: 'A1.',
      triggerLabel:
        '質問が入ります。質問が入ります。質問が入ります。質問が入ります。質問が入ります。',
      content: `
      <p class="c-paragraph">回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。</p>
      <p class="c-paragraph">回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。</p>
      <figure class="c-image">
        <img
          src="/assets/img/img-campus.webp"
          width="400"
          height="225"
          alt="Placeholder Image"
        />
        <figcaption class="p-image__caption">This is a caption</figcaption>
      </figure>
      <ul class="c-list">
        <li class="c-list__item">回答が入ります。回答が入ります。回答が入ります。回答が入ります。</li>
        <li class="c-list__item">回答が入ります。回答が入ります。回答が入ります。回答が入ります。</li>
        <li class="c-list__item">回答が入ります。回答が入ります。回答が入ります。回答が入ります。</li>
      </ul>
      <ul class="c-list c-list--notes">
        <li class="c-list__item">回答が入ります。回答が入ります。回答が入ります。回答が入ります。</li>
        <li class="c-list__item">回答が入ります。回答が入ります。回答が入ります。回答が入ります。</li>
        <li class="c-list__item">回答が入ります。回答が入ります。回答が入ります。回答が入ります。</li>
      </ul>
      <a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">
        リンクテキスト
        <svg
          class="c-link__icon c-link__icon--right icon"
          aria-hidden="true"
          role="img"
        >
          <use xlink:href="/assets/img/sprite.svg#arrow_right"></use>
        </svg>
      </a>
      `
    },
    {
      triggerMeta: '質問2.',
      contentMeta: '回答2.',
      triggerLabel:
        '質問が入ります。質問が入ります。質問が入ります。質問が入ります。質問が入ります。',
      content:
        '<p class="c-paragraph">回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。回答が入ります。</p>'
    }
  ]
};
