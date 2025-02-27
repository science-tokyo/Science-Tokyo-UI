import beautify from 'js-beautify';
import renderComponent from './ArticleContents.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/グループ Group/記事コンテンツ Article contents',
  argTypes: {
    size: {
      description: 'コンテンツのサイズを指定します。',
      options: ['M', 'L'],
      control: {
        type: 'select',
        labels: {
          M: 'M',
          L: 'L'
        }
      }
    },
    copyText: {
      description: 'コピーを指定します。',
      control: 'text'
    },
    copySize: {
      description: 'コピーのサイズを指定します。',
      options: ['M', 'L', 'LL'],
      control: {
        type: 'select',
        labels: {
          M: 'M',
          L: 'L',
          LL: 'LL'
        }
      }
    },
    conversations: {
      description: '会話を指定します。',
      control: 'array'
    },
    text: {
      description: 'テキストを指定します。',
      control: 'text'
    },
    links: {
      description: 'リンクを指定します。',
      control: 'array'
    },
    isImage: {
      description: '画像を表示する場合は選択します。',
      control: 'boolean'
    },
    imagePosRight: {
      if: { arg: 'isImage', eq: true },
      description: '画像を右側に表示する場合は選択します。',
      control: 'boolean'
    },
    imageSrc: {
      if: { arg: 'isImage', eq: true },
      description: '画像のパスを指定します。',
      control: 'text'
    },
    imageWidth: {
      if: { arg: 'isImage', eq: true },
      description: '画像の幅を指定します。',
      control: 'number'
    },
    imageHeight: {
      if: { arg: 'isImage', eq: true },
      description: '画像の高さを指定します。',
      control: 'number'
    },
    imageAlt: {
      if: { arg: 'isImage', eq: true },
      description: '画像の説明文を指定します。',
      control: 'text'
    },
    imageCaption: {
      if: { arg: 'isImage', eq: true },
      description: '画像にキャプションを表示するかどうかを指定します。',
      control: 'boolean'
    },
    responsiveImage: {
      if: { arg: 'isImage', eq: true },
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
  size: 'L',
  copyText:
    'キャッチコピーが入ります。キャッチコピーが入ります。キャッチコピーが入ります。',
  copySize: 'M',
  text: 'テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。',
  links: [
    {
      label: 'リンクテキスト',
      url: '#',
      rightIcon: 'chevron_right'
    },
    {
      label: 'リンクテキスト',
      url: '#',
      rightIcon: 'chevron_right'
    }
  ],
  isImage: true,
  imagePosRight: false,
  imageSrc: '/assets/img/img-campus.webp',
  imageWidth: 800,
  imageHeight: 450,
  imageCaption: true,
  imageAlt: '©Gazou N Caption',
  responsiveImage: false
};
export const imagePositionRight = Template.bind({});
imagePositionRight.storyName = '画像右配置';
imagePositionRight.args = {
  ...Default.args,
  imagePosRight: true
};
export const sizeM = Template.bind({});
sizeM.storyName = '画像サイズM';
sizeM.args = {
  ...Default.args,
  size: 'M'
};
export const Interview = Template.bind({});
Interview.storyName = 'インタビュー';
Interview.args = {
  size: 'L',
  copyText:
    'キャッチコピーが入りますキャッチコピーが入りますキャッチコピーが入ります。 ',
  copySize: 'M',
  conversations: [
    {
      name: '佐藤',
      text: '工学は、人類を幸せにするための枠組である「文明」に貢献する学問です。工学院は、機械系、システム制御系、電気電子系、情報通信系、経営工学系の5つの系と、その先の大学院課程からなり、'
    },
    {
      name: '林',
      text: '工学は、人類を幸せにするための枠組である「文明」に貢献する学問です。工学院は、機械系、システム制御系、電気電子系、情報通信系、経営工学系の5つの系と、その先の大学院課程からなり、'
    },
    {
      name: '五十嵐',
      text: '工学は、人類を幸せにするための枠組である「文明」に貢献する学問です。工学院は、機械系、システム制御系、電気電子系、情報通信系、経営工学系の5つの系と、その先の大学院課程からなり、'
    }
  ],
  links: [
    {
      label: 'リンクテキスト',
      url: '#',
      external: true
    },
    {
      label: 'リンクテキスト',
      url: '#',
      rightIcon: 'chevron_right'
    }
  ],
  isImage: true,
  imagePosRight: false,
  imageSrc: '/assets/img/img-campus.webp',
  imageWidth: 800,
  imageHeight: 450,
  imageAlt: '©Gazou N Caption',
  imageCaption: true,
  responsiveImage: false
};
