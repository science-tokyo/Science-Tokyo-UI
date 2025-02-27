import beautify from 'js-beautify';
import renderComponent from './PickupContents.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/グループ Group/ピックアップコンテンツ Pickup contents',
  argTypes: {
    type: {
      description: 'コンテンツの種類を指定します。',
      options: ['', 'media', 'related', 'contents'],
      control: {
        type: 'select',
        labels: {
          '': 'default'
        }
      }
    },
    linkType: {
      description: 'リンクの種類を指定します。',
      options: ['area', 'button', 'none'],
      control: 'select'
    },
    title: {
      description: 'タイトルを指定します。',
      control: 'text'
    },
    titleTag: {
      description: 'タイトルのHTMLタグを指定します。',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'],
      control: 'select'
    },
    shoulder: {
      description: 'ショルダーコピーを指定します。',
      control: 'text'
    },
    description: {
      description: '説明文を指定します。',
      control: 'text'
    },
    mediaDate: {
      if: { arg: 'type', eq: 'media' },
      description: 'メディア情報の日付を指定します。',
      control: 'text'
    },
    mediaLabels: {
      if: { arg: 'type', eq: 'media' },
      description: 'メディア情報のラベル情報を配列で指定します。',
      control: 'array'
    },
    contentsCopy: {
      if: { arg: 'type', eq: 'contents' },
      description: 'コンテンツのコピーを指定します。',
      control: 'text'
    },
    imageSrc: {
      description: '画像のパスを指定します。',
      control: 'text'
    },
    imageWidth: {
      description: '画像の幅を指定します。',
      control: 'number'
    },
    imageHeight: {
      description: '画像の高さを指定します。',
      control: 'number'
    },
    imageAlt: {
      description: '画像のaltを指定します。',
      control: 'text'
    },
    imageCaption: {
      description: 'キャプション表示を指定します。',
      control: 'boolean'
    },
    responsiveImage: {
      description: '画面サイズごとに画像を切り替える場合は選択します。',
      control: 'boolean'
    },
    srcsetSmall: {
      if: { arg: 'responsiveImage', eq: true },
      description: 'スモール画面用の画像のパスを指定します。',
      control: 'text'
    },
    widthSmall: {
      if: { arg: 'responsiveImage', eq: true },
      description: 'スモール画面用の画像の幅を指定します。',
      control: 'number'
    },
    heightSmall: {
      if: { arg: 'responsiveImage', eq: true },
      description: 'スモール画面用の画像の高さを指定します。',
      control: 'number'
    },
    srcsetMedium: {
      if: { arg: 'responsiveImage', eq: true },
      description: 'ミディアム画面用の画像のパスを指定します。',
      control: 'text'
    },
    widthMedium: {
      if: { arg: 'responsiveImage', eq: true },
      description: 'ミディアム画面用の画像の幅を指定します。',
      control: 'number'
    },
    heightMedium: {
      if: { arg: 'responsiveImage', eq: true },
      description: 'ミディアム画面用の画像の高さを指定します。',
      control: 'number'
    },
    imagePosRight: {
      description: '画像の位置を右にします。',
      control: 'boolean'
    },
    buttonLabel: {
      description: 'ボタンのラベルを指定します。',
      control: 'text'
    },
    href: {
      description: 'ボタンのリンク先URLを指定します。',
      control: 'text'
    },
    external: {
      description: '外部リンクの場合は選択します。',
      control: 'boolean'
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
 * @param {string} args.title
 * @param {string} args.titleTag
 * @param {string} args.shoulder
 * @param {string} args.description
 * @param {string} args.imageSrc
 * @param {number} args.imageWidth
 * @param {number} args.imageHeight
 * @param {string} args.imageAlt
 * @param {string} args.buttonLabel
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
  type: '',
  title: 'キャッチコピー',
  titleTag: 'p',
  shoulder: 'ショルダーコピー',
  description:
    '本文テキスト 「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
  imageSrc: '/assets/img/img-campus.webp',
  imageWidth: 800,
  imageHeight: 450,
  imageAlt: '©Gazou N Caption',
  imageCaption: true,
  responsiveImage: false,
  buttonLabel: 'ボタン',
  href: '#'
};
export const imagePositionRight = Template.bind({});
imagePositionRight.storyName = '画像右配置';
imagePositionRight.args = {
  ...Default.args,
  imagePosRight: true
};
export const Related = Template.bind({});
Related.storyName = '関連リンク';
Related.args = {
  ...Default.args,
  type: 'related',
  description:
    '本文テキスト 「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。'
};
export const Media = Template.bind({});
Media.storyName = 'メディア';
Media.args = {
  type: 'media',
  linkType: 'area',
  title:
    'メディア情報タイトル「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や',
  titleTag: 'p',
  description:
    '本文テキスト 「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
  mediaDate: '2025年01月01日',
  imageSrc: '/assets/img/img-campus.webp',
  imageWidth: 800,
  imageHeight: 450,
  imageAlt: '画像のalt',
  responsiveImage: false,
  href: '#',
  mediaLabels: [
    {
      text: 'タグテキスト'
    },
    {
      text: 'タグテキスト'
    },
    {
      text: 'タグテキスト'
    }
  ]
};
export const Contents = Template.bind({});
Contents.storyName = 'コンテンツ訴求';
Contents.args = {
  type: 'contents',
  shoulder: 'ショルダーコピー',
  title:
    '見出しテキスト h2 「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
  contentsCopy:
    'キャッチコピー「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
  description:
    '本文テキスト 「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。「自然界はどのようにしてできているのだろう?」という',
  imageSrc: '/assets/img/img-campus.webp',
  imageWidth: 800,
  imageHeight: 450,
  imageAlt: '画像のalt',
  responsiveImage: false,
  linkType: 'none',
  imageAlt: '©Gazou N Caption',
  imageCaption: true
};
