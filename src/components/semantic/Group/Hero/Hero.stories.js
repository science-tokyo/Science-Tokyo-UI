import { responsiveImage } from '../../../primitive/Media/Image/Image.stories';
import beautify from 'js-beautify';
import renderComponent from './Hero.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/グループ Group/ヒーロー画像 Hero',
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    title: {
      description: 'タイトルを指定します。',
      control: 'text'
    },
    titleTag: {
      description: 'タイトルのHTMLタグを指定します。',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: 'select'
    },
    shoulder: {
      if: { arg: 'contentsType', neq: 'media' },
      description: 'ショルダーコピーを指定します。',
      control: 'text'
    },
    subTitle: {
      if: { arg: 'contentsType', eq: 'person' },
      description: 'サブタイトルを指定します。',
      control: 'text'
    },
    description: {
      if: { arg: 'contentsType', neq: 'media' },
      description: '説明文を指定します。',
      control: 'text'
    },
    date: {
      if: { arg: 'contentsType', eq: 'media' },
      description: '日付を指定します。',
      control: 'text',
      type: {
        name: 'string'
      }
    },
    tags: {
      if: { arg: 'contentsType', eq: 'media' },
      description: 'タグを指定します。',
      control: 'array',
      type: {
        name: 'array'
      }
    },
    imageSrc: {
      description: '画像のパスを指定します。',
      control: 'text',
      table: {
        category: 'Image'
      }
    },
    imageWidth: {
      description: '画像の幅を指定します。',
      control: 'number',
      table: {
        category: 'Image'
      }
    },
    imageHeight: {
      description: '画像の高さを指定します。',
      control: 'number',
      table: {
        category: 'Image'
      }
    },
    imageAlt: {
      description: '画像のaltを指定します。',
      control: 'text',
      table: {
        category: 'Image'
      }
    },
    srcsetSmall: {
      if: { arg: 'responsiveImage', eq: true },
      description: 'スモール画面用の画像のパスを指定します。',
      control: 'text',
      table: {
        category: 'Image'
      }
    },
    widthSmall: {
      if: { arg: 'responsiveImage', eq: true },
      description: 'スモール画面用の画像の幅を指定します。',
      control: 'number',
      table: {
        category: 'Image'
      }
    },
    heightSmall: {
      if: { arg: 'responsiveImage', eq: true },
      description: 'スモール画面用の画像の高さを指定します。',
      control: 'number',
      table: {
        category: 'Image'
      }
    },
    srcsetMedium: {
      if: { arg: 'responsiveImage', eq: true },
      description: 'ミディアム画面用の画像のパスを指定します。',
      control: 'text',
      table: {
        category: 'Image'
      }
    },
    widthMedium: {
      if: { arg: 'responsiveImage', eq: true },
      description: 'ミディアム画面用の画像の幅を指定します。',
      control: 'number',
      table: {
        category: 'Image'
      }
    },
    heightMedium: {
      if: { arg: 'responsiveImage', eq: true },
      description: 'ミディアム画面用の画像の高さを指定します。',
      control: 'number',
      table: {
        category: 'Image'
      }
    },
    url: {
      description: 'リンク先のURLを指定します。',
      control: 'text'
    },
    responsiveImage: {
      description: '画面サイズごとに画像を切り替える場合は選択します。',
      control: 'boolean',
      table: {
        category: 'Option'
      }
    },
    contentsType: {
      description: 'コンテンツのタイプを指定します。（フロントエンド実装用）',
      options: ['', 'media', 'person'],
      control: {
        type: 'select',
        labels: {
          '': 'default'
        }
      },
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
Default.storyName = 'デフォルト';
Default.args = {
  title: 'タイトル',
  titleTag: 'h1',
  shoulder: 'ショルダーコピー',
  description:
    '情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。',
  url: '#',
  imageSrc: '/assets/img/img-campus.webp',
  imageWidth: 1600,
  imageHeight: 900,
  imageAlt: '画像のalt',
  contentsType: '',
  responsiveImage: false,
  addClass: ''
};

export const Hero_person = Template.bind({});
Hero_person.storyName = '人物';
Hero_person.args = {
  ...Default.args,
  title: '苗字 名前',
  subTitle: 'Name Name',
  shoulder: '大学名　学部名',
  description: '准教授',
  contentsType: 'person',
  responsiveImage: true,
  imageSrc: '//placehold.jp/1600x900.png'
};
