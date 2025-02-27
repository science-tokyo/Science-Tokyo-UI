import beautify from 'js-beautify';
import renderComponent from './Carousel.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/グループ Group/カルーセル Carousel',
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    carouselLabel: {
      description: 'カルーセルの概要を指定します。',
      control: {
        type: 'text'
      }
    },
    carouselItems: {
      description: 'カルーセルのアイテムを指定します。',
      control: 'array'
    },
    carouselItemNum: {
      control: false,
      description:
        'カルーセルの表示数（1〜4）を指定します。（フロントエンド実装用）',
      options: ['1', '2', '3', '4'],
      type: {
        name: 'select'
      }
    },
    contentsType: {
      description: 'カルーセルの種類を指定します。（フロントエンド実装用）',
      options: ['default', 'hero', 'tile'],
      type: {
        name: 'select'
      },
      control: {
        disable: true,
        type: 'select',
        labels: {
          default: 'デフォルト',
          hero: 'ヒーロー画像',
          tile: 'タイルリンク'
        }
      }
    },
    autoplay: {
      control: false,
      description: '自動再生を有効にします。（フロントエンド実装用）',
      type: {
        name: 'boolean'
      }
    },
    loop: {
      control: false,
      description: 'ループ再生を有効にします。（フロントエンド実装用）',
      type: {
        name: 'boolean'
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
const Template = (args, { globals }) => {
  const { locale } = globals;
  // イベント用の初期データ（日本語）
  const event_initData_ja = {
    cardType: 'event',
    linkArea: 'card',
    href: '#',
    blank: false,
    title: 'イベントタイトル タイトルテキストタイトルテキストタイトルテキスト',
    titleTag: 'h2',
    text: '',
    place: '○○キャンパス（開催場所のテキスト）',
    startDate: '2024年12月31日',
    tags: ['タグテキスト1', 'タグテキスト2'],
    thumbnail: false,
    imageSrc: ''
  };
  // イベント用の初期データ（英語）
  const event_initData_en = {
    cardType: 'event',
    linkArea: 'card',
    href: '#',
    blank: false,
    title: 'Event title text title text title text title text title text',
    titleTag: 'h3',
    text: '',
    place: 'XXXX Campus (Location text)',
    startDate: '2024年12月31日',
    startDateEn: 'Mon, Dec. 31',
    tags: ['Tag text', 'Tag text'],
    thumbnail: false,
    imageSrc: ''
  };
  // メディア用の初期データ（日本語）
  const media_initData_ja = {
    cardType: 'media',
    linkArea: 'card',
    href: '#',
    blank: false,
    title:
      'メディア情報タイトルテキストタイトルテキストタイトルテキストタイトルテキスト',
    titleTag: 'h3',
    text: '',
    startDate: '2024年12月31日',
    tags: ['タグテキスト1', 'タグテキスト2'],
    imageSrc: '/assets/img/img-campus.webp',
    imageWidth: 800,
    imageHeight: 450,
    imageAlt: '画像のalt'
  };
  // メディア用の初期データ（英語）
  const media_initData_en = {
    cardType: 'media',
    linkArea: 'card',
    href: '#',
    blank: false,
    title: 'Media title text',
    titleTag: 'h3',
    text: '',
    startDate: '2024年12月31日',
    startDateEn: 'December 31',
    tags: ['Tag text', 'Tag text'],
    imageSrc: '/assets/img/img-campus.webp',
    imageWidth: 800,
    imageHeight: 450,
    imageAlt: 'alt text'
  };
  // イベント用の表示する要素数から枚数を指定
  let event_data_num = Number(card_event.args.carouselItemNum) + 1;
  // イベント用のデータ格納先
  let event_data_update = card_event.args.carouselItems;
  // メディア用の表示する要素数から枚数を指定
  let media_data_num = Number(card_media.args.carouselItemNum) + 1;
  // メディア用のデータ格納先
  let media_data_update = card_media.args.carouselItems;
  // 一旦配列をリセットする
  event_data_update.length = 0;
  media_data_update.length = 0;
  if (locale === 'en') {
    for (let i = 0; i < event_data_num; i++) {
      event_data_update.push(event_initData_en);
    }
    for (let i = 0; i < media_data_num; i++) {
      media_data_update.push(media_initData_en);
    }
  } else {
    for (let i = 0; i < event_data_num; i++) {
      event_data_update.push(event_initData_ja);
    }
    for (let i = 0; i < media_data_num; i++) {
      media_data_update.push(media_initData_ja);
    }
  }
  return beautify.html(
    renderComponent({
      storybookArgs: args,
      locale: locale || 'ja'
    }),
    { indent_size: 2, preserve_newlines: false }
  );
};
export const Default = Template.bind({});
Default.storyName = '画像';
Default.args = {
  contentsType: 'default',
  autoplay: true,
  loop: true,
  carouselItemNum: '1',
  carouselItems: [
    {
      multiple: false,
      src: '/assets/img/img-campus.webp',
      width: 1600,
      height: 900,
      alt: 'Placeholder Image',
      responsiveImage: false,
      fullWidth: true
    },
    {
      multiple: false,
      src: '/assets/img/img-campus.webp',
      width: 1600,
      height: 900,
      alt: 'Placeholder Image',
      responsiveImage: false,
      fullWidth: true
    }
  ]
};
export const hero = Template.bind({});
hero.storyName = 'ヒーロー画像';
hero.args = {
  contentsType: 'hero',
  autoplay: true,
  loop: true,
  carouselItemNum: '1',
  carouselItems: [
    {
      title: 'タイトル1文字列',
      shoulder: 'ショルダーテキスト1',
      description:
        '説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。',
      titleTag: 'p',
      url: 'https://www.google.com',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 1440,
      imageHeight: 810,
      imageAlt: '画像のalt',
      responsiveImage: false
    },
    {
      title: 'タイトル2文字列',
      shoulder: 'ショルダーテキスト2',
      description:
        '説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。',
      titleTag: 'p',
      url: 'https://www.google.com',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 1440,
      imageHeight: 810,
      imageAlt: '画像のalt',
      responsiveImage: false
    },
    {
      title: 'タイトル3文字列',
      shoulder: 'ショルダーテキスト3',
      description:
        '説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。説明文が入ります。',
      titleTag: 'p',
      url: 'https://www.google.com',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 1440,
      imageHeight: 810,
      imageAlt: '画像のalt',
      responsiveImage: false
    }
  ]
};
export const card_event = Template.bind({});
card_event.storyName = 'イベント';
card_event.args = {
  contentsType: 'tile',
  autoplay: false,
  loop: false,
  carouselItemNum: '3',
  carouselItems: []
};
export const card_media = Template.bind({});
card_media.storyName = 'メディア';
card_media.args = {
  contentsType: 'tile',
  autoplay: false,
  loop: false,
  carouselItemNum: '3',
  carouselItems: []
};
