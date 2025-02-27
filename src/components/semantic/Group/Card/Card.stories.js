import beautify from 'js-beautify';
import renderComponent from './Card.njk';

export default {
  title: 'セマンティックコンポーネント Semantic/グループ Group/カード Card',

  // More on argTypes: https://storybook.js.org/docs/html/api/argtypes
  argTypes: {
    /**
     * Layout
     */
    columnsNumber: {
      if: { arg: 'multiple', eq: true },
      description: '複数のカードを表示する際のカラム数を指定します。',
      control: {
        type: 'range',
        min: 1,
        max: 4
      },
      table: {
        category: 'Layout'
      }
    },
    columnsNumberMedium: {
      if: { arg: 'multiple', eq: true },
      description:
        'ミディアムウインドウ時に複数のカードを表示する際のカラム数を指定します。',
      control: {
        type: 'range',
        min: 1,
        max: 4
      },
      table: {
        category: 'Layout'
      }
    },
    columnsNumberSmall: {
      if: { arg: 'multiple', eq: true },
      description:
        'スモールウインドウ時に複数のカードを表示する際のカラム数を指定します。',
      control: {
        type: 'range',
        min: 1,
        max: 4
      },
      table: {
        category: 'Layout'
      }
    },
    /**
     * Contents
     */
    title: {
      if: { arg: 'multiple', eq: false },
      description: 'タイトルを指定します。',
      control: 'text',
      table: {
        category: 'Contents'
      }
    },
    titleEn: {
      if: { arg: 'multiple', eq: false },
      description: 'タイトルの英語表記を指定します。',
      control: 'text',
      table: {
        category: 'Contents'
      }
    },
    titleTag: {
      if: { arg: 'multiple', eq: false },
      description: 'タイトルのHTMLタグを指定します。',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
      control: 'select',
      table: {
        category: 'Contents'
      }
    },
    subTitle: {
      if: { arg: 'cardType', eq: 'person' },
      description: 'サブタイトルを指定します。',
      control: 'text',
      table: {
        category: 'Contents'
      }
    },
    text: {
      if: { arg: 'multiple', eq: false },
      description: 'テキストを指定します。',
      control: 'text',
      table: {
        category: 'Contents'
      }
    },
    startDate: {
      if: { arg: 'cardType', eq: 'event' },
      description: '開催日の情報を指定します。',
      control: 'text',
      table: {
        category: 'Contents'
      }
    },
    startDateEn: {
      if: { arg: 'cardType', eq: 'event' },
      description: '開催日の英語表記（年を除く）を指定します。',
      control: 'text',
      table: {
        category: 'Contents'
      }
    },
    place: {
      if: { arg: 'cardType', eq: 'event' },
      description: '開催場所の情報を指定します。',
      control: 'text',
      table: {
        category: 'Contents'
      }
    },
    placeEn: {
      if: { arg: 'cardType', eq: 'event' },
      description: '開催場所の英語表記を指定します。',
      control: 'text',
      table: {
        category: 'Contents'
      }
    },
    tags: {
      if: { arg: 'cardType', eq: 'event' },
      description: 'タグ情報を配列で指定します。',
      control: 'array',
      table: {
        category: 'Contents'
      }
    },
    tagsEn: {
      if: { arg: 'cardType', eq: 'event' },
      description: 'タグ情報の英語表記を配列で指定します。',
      control: 'array',
      table: {
        category: 'Contents'
      }
    },
    addContents: {
      if: { arg: 'cardType', eq: 'hierarchy' },
      description: 'ボトムコンテンツを指定します。',
      control: 'text',
      table: {
        category: 'Contents'
      }
    },
    multipleCards: {
      if: { arg: 'multiple', eq: true },
      description:
        '複数のカードを表示する際のカード情報を配列で指定します。(フロントエンド実装用)',
      control: 'array',
      table: {
        category: 'Contents'
      }
    },
    /**
     * Image
     */
    thumbnail: {
      if: { arg: 'multiple', eq: false },
      description: 'サムネイル画像を表示します。',
      control: 'boolean',
      type: {
        name: 'boolean'
      },
      table: {
        category: 'Image'
      }
    },
    imageSrc: {
      if: { arg: 'thumbnail', eq: true },
      description: '画像のパスを指定します。',
      control: 'text',
      table: {
        category: 'Image'
      }
    },
    imageWidth: {
      if: { arg: 'thumbnail', eq: true },
      description: '画像の幅を指定します。',
      control: 'number',
      table: {
        category: 'Image'
      }
    },
    imageHeight: {
      if: { arg: 'thumbnail', eq: true },
      description: '画像の高さを指定します。',
      control: 'number',
      table: {
        category: 'Image'
      }
    },
    imageAlt: {
      if: { arg: 'thumbnail', eq: true },
      description: '画像のaltを指定します。',
      control: 'text',
      table: {
        category: 'Image'
      }
    },
    /**
     * Link
     */
    linkArea: {
      if: { arg: 'multiple', eq: false },
      description: 'リンクエリアを指定します。',
      options: ['none', 'card', 'title'],
      control: 'select',
      type: {
        name: 'select'
      },
      table: {
        category: 'Link'
      }
    },
    href: {
      if: { arg: 'linkArea', neq: 'none' },
      description: 'リンク先のURLを指定します。',
      control: 'text',
      table: {
        category: 'Link'
      }
    },
    blank: {
      if: { arg: 'linkArea', neq: 'none' },
      description: 'リンクを新しいタブで開きます。',
      control: 'boolean',
      table: {
        category: 'Link'
      }
    },
    rightIcon: {
      description: '右アイコンを指定します。',
      options: ['', 'chevron_right', 'pdf'],
      control: {
        type: 'select',
        labels: {
          '': 'none'
        }
      },
      type: {
        name: 'select'
      },
      table: {
        category: 'Link'
      }
    },
    /**
     * Option
     */
    cardType: {
      description: 'カードのタイプを指定します。（フロントエンド実装用）',
      options: ['default', 'media', 'event', 'person', 'hierarchy'],
      control: 'select',
      table: {
        disable: true,
        category: 'Option'
      }
    },
    multiple: {
      description: '複数のカードを表示します。',
      control: 'boolean',
      table: {
        category: 'Option'
      }
    },
    horizontal: {
      if: { arg: 'thumbnail', eq: true },
      description: 'カードを横並びにします。',
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
        category: 'Option',
        disable: true
      }
    }
  }
};

/**
 * @param {Object} args
 * @param {string} args.horizontal
 * @param {string} args.multiple
 * @param {string} args.linkArea
 * @param {string} args.href
 * @param {string} args.blank
 * @param {string} args.title
 * @param {string} args.titleTag
 * @param {string} args.content
 * @param {string} args.addContents
 * @param {string} args.imageSrc
 * @param {number} args.imageWidth
 * @param {number} args.imageHeight
 * @param {string} args.imageAlt
 * @param {string} args.addClass
 */
const Template = (args, { globals }) => {
  const { locale } = globals;
  // メディア用のデータを取得
  let media_data_update = contentsList_media.args.multipleCards;
  // イベント用のデータを取得
  let event_data_update = contentsList_event.args.multipleCards;
  // イベントカレンダー用のデータを取得
  let calendar_data_update = contentsList_event_carousel.args.multipleCards;
  // 英語の場合はデータを更新
  if (locale === 'en') {
    // メディアのデータを更新
    for (let i = 0; i < media_data_update.length; i++) {
      media_data_update[i].titleEn =
        'Media title text title text title text title text';
      media_data_update[0].startDateEn = 'December 31';
      media_data_update[1].startDateEn = 'January 1';
      media_data_update[i].tagsEn = ['Tag text', 'Tag text'];
    }
    // イベントのデータを更新
    for (let i = 0; i < event_data_update.length; i++) {
      event_data_update[i].titleEn =
        'Event information title text title text title text title text title text';
      event_data_update[i].startDateEn = 'Mon, Dec. 31';
      event_data_update[i].endDateEn = 'Tue, Jan. 1';
      event_data_update[i].time = '10:00 - 12:00';
      event_data_update[i].placeEn =
        'XXXX Campus XXXX Building XX Floor XXXX Room';
      event_data_update[i].tagsEn = ['Tag text', 'Tag text'];
    }
    // イベントカレンダーのデータを更新
    for (let i = 0; i < calendar_data_update.length; i++) {
      calendar_data_update[i].titleEn =
        'Hagament lysogon kroligt. Emil Sandberg bon dedeskade. Triledes eng, delydade och';
      calendar_data_update[i].startDateEn = 'Tue, Jan. 1';
      calendar_data_update[i].placeEn =
        'Bekäliga pseudore intrajär benelingar or i prev geov att visäligen.';
      calendar_data_update[i].tagsEn = [
        'Senat hil',
        'Lisåsa ar at',
        'Mina mikrobevis',
        'Sov dodesamma.',
        'Teraprertad tisöment'
      ];
    }
  } else {
    // 英語のデータを削除
    for (let i = 0; i < media_data_update.length; i++) {
      delete media_data_update[i].titleEn;
      delete media_data_update[i].startDateEn;
      delete media_data_update[i].tagsEn;
    }
    for (let i = 0; i < event_data_update.length; i++) {
      delete event_data_update[i].titleEn;
      delete event_data_update[i].startDateEn;
      delete event_data_update[i].endDateEn;
      delete event_data_update[i].placeEn;
      delete event_data_update[i].tagsEn;
      event_data_update[i].time = '10:00〜12:00';
    }
    for (let i = 0; i < calendar_data_update.length; i++) {
      delete calendar_data_update[i].titleEn;
      delete calendar_data_update[i].startDateEn;
      delete calendar_data_update[i].placeEn;
      delete calendar_data_update[i].tagsEn;
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

export const contentsList_col2 = Template.bind({});
contentsList_col2.storyName = 'コンテンツリスト - 2カラム';
contentsList_col2.args = {
  cardType: 'default',
  multiple: true,
  columnsNumber: 2,
  columnsNumberSmall: 1,
  multipleCards: [
    {
      horizontal: true,
      linkArea: 'title',
      href: '#',
      blank: false,
      title: 'リンクテキスト',
      titleTag: 'h3',
      text: 'テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。',
      rightIcon: 'chevron_right',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    },
    {
      horizontal: true,
      linkArea: 'title',
      href: '#',
      blank: true,
      title: 'リンクテキスト',
      titleTag: 'h3',
      text: 'テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。',
      tags: ['タグテキスト1', 'タグテキスト2', 'タグテキスト3'],
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    }
  ]
};

export const contentsList_col3 = Template.bind({});
contentsList_col3.storyName = 'コンテンツリスト - 3カラム';
contentsList_col3.args = {
  cardType: 'default',
  multiple: true,
  columnsNumber: 3,
  columnsNumberSmall: 1,
  multipleCards: [
    {
      linkArea: 'title',
      href: '#',
      blank: false,
      title: 'リンクテキスト',
      titleTag: 'h3',
      text: 'テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。',
      rightIcon: 'chevron_right',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    },
    {
      linkArea: 'title',
      href: '#',
      blank: true,
      title: 'リンクテキスト',
      titleTag: 'h3',
      text: 'テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    },
    {
      linkArea: 'title',
      href: '#',
      blank: false,
      title: 'リンクテキスト',
      titleTag: 'h3',
      text: 'テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。テキストが入ります。',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt',
      rightIcon: 'pdf'
    }
  ]
};

export const contentsList_tile = Template.bind({});
contentsList_tile.storyName = 'コンテンツリスト - タイル';
contentsList_tile.args = {
  cardType: 'default',
  multiple: true,
  columnsNumber: 3,
  columnsNumberSmall: 1,
  linkArea: 'none',
  multipleCards: [
    {
      linkArea: 'card',
      href: '#',
      blank: false,
      title: 'リンクテキスト',
      titleTag: 'h3',
      text: '本文テキスト 「自然界はどのようにしてできているのだろう?」',
      rightIcon: 'chevron_right',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    },
    {
      linkArea: 'card',
      href: '#',
      blank: true,
      title: 'リンクテキストリンクテキスト',
      titleTag: 'h3',
      text: '本文テキスト 「自然界はどのようにしてできているのだろう?」',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    },
    {
      linkArea: 'card',
      href: '#',
      blank: false,
      title: 'リンクテキスト',
      titleTag: 'h3',
      text: '本文テキスト 「自然界はどのようにしてできているのだろう?」',
      rightIcon: 'pdf',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    },
    {
      linkArea: 'card',
      href: '#',
      blank: false,
      title: 'リンクテキスト',
      titleTag: 'h3',
      text: '本文テキスト 「自然界はどのようにしてできているのだろう?」',
      rightIcon: 'chevron_right'
    },
    {
      linkArea: 'card',
      href: '#',
      blank: true,
      title: 'リンクテキストリンクテキスト',
      titleTag: 'h3',
      text: '本文テキスト 「自然界はどのようにしてできているのだろう?」'
    },
    {
      linkArea: 'card',
      href: '#',
      blank: false,
      title: 'リンクテキスト',
      titleTag: 'h3',
      text: '本文テキスト 「自然界はどのようにしてできているのだろう?」',
      rightIcon: 'pdf'
    }
  ]
};

export const contentsList_person = Template.bind({});
contentsList_person.storyName = 'コンテンツリスト - タイル・人物';
contentsList_person.args = {
  cardType: 'person',
  multiple: true,
  columnsNumber: 3,
  columnsNumberSmall: 1,
  linkArea: 'none',
  multipleCards: [
    {
      linkArea: 'card',
      href: '#',
      blank: false,
      title: '人物名 人物名',
      titleTag: 'h3',
      subTitle: 'English name',
      rightIcon: 'chevron_right',
      text: '役職名・所属名テキスト テキストテキストテキスト テキストテキスト  テキストテキスト',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    },
    {
      linkArea: 'card',
      href: '#',
      blank: false,
      title: '人物名 人物名',
      titleTag: 'h3',
      subTitle: 'English name',
      rightIcon: 'chevron_right',
      text: '役職名・所属名テキスト テキストテキストテキスト テキストテキスト',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    },
    {
      linkArea: 'card',
      href: '#',
      blank: false,
      title: '人物名 人物名',
      titleTag: 'h3',
      subTitle: 'English name',
      rightIcon: 'chevron_right',
      text: '役職名・所属名テキスト テキスト',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt',
      rightIcon: 'pdf'
    },
    {
      linkArea: 'card',
      href: '#',
      blank: false,
      title: '人物名 人物名',
      titleTag: 'h3',
      subTitle: 'English name',
      rightIcon: 'chevron_right',
      text: '役職名・所属名テキスト テキストテキストテキスト テキストテキスト  テキストテキスト'
    },
    {
      linkArea: 'card',
      href: '#',
      blank: false,
      title: '人物名 人物名',
      titleTag: 'h3',
      subTitle: 'English name',
      text: '役職名・所属名テキスト テキストテキストテキスト テキストテキスト',
      rightIcon: 'chevron_right'
    },
    {
      linkArea: 'card',
      href: '#',
      blank: false,
      title: '人物名 人物名',
      titleTag: 'h3',
      subTitle: 'English name',
      rightIcon: 'chevron_right',
      text: '役職名・所属名テキスト テキスト',
      rightIcon: 'pdf'
    }
  ]
};

export const contentsList_media = Template.bind({});
contentsList_media.storyName = 'コンテンツリスト - メディア';
contentsList_media.args = {
  cardType: 'media',
  multiple: true,
  columnsNumber: 2,
  columnsNumberSmall: 1,
  linkArea: 'none',
  multipleCards: [
    {
      linkArea: 'card',
      href: '#',
      blank: false,
      title: 'リンクテキスト「自然界はどのようにしてできて',
      titleTag: 'h3',
      startDate: '2024年12月31日',
      tags: ['タグテキスト1', 'タグテキスト2'],
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    },
    {
      linkArea: 'card',
      href: '#',
      blank: false,
      title: 'リンクテキスト「自然界はどのようにしてできて',
      titleTag: 'h3',
      startDate: '2025年01月01日',
      tags: ['タグテキスト1', 'タグテキスト2'],
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    }
  ]
};

export const contentsList_event = Template.bind({});
contentsList_event.storyName = 'コンテンツリスト - イベント';
contentsList_event.args = {
  cardType: 'default',
  multiple: true,
  columnsNumber: 2,
  columnsNumberSmall: 1,
  linkArea: 'none',
  multipleCards: [
    {
      linkArea: 'card',
      href: '#',
      blank: false,
      title:
        'メディア情報タイトルテキストタイトルテキストタイトルテキストタイトルテキストメディア情報タイトルテキストタイトルテキストタイトルテキストタイトルテキスト',
      titleTag: 'h3',
      startDate: '2024年12月31日（月）',
      endDate: '2025年01月01日（火）',
      time: '10:00〜12:00',
      place: 'XXXXキャンパス XXXX棟 XX階 XXXX室',
      tags: ['タグテキスト', 'タグテキスト'],
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    },
    {
      linkArea: 'card',
      href: '#',
      blank: false,
      title: 'メディア情報タイトル',
      titleTag: 'h3',
      startDate: '2024年12月31日（月）',
      endDate: '2025年01月01日（火）',
      time: '10:00〜12:00',
      place: 'XXXXキャンパス XXXX棟 XX階 XXXX室',
      tags: ['タグテキスト', 'タグテキスト'],
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    }
  ]
};

export const contentsList_hierarchy = Template.bind({});
contentsList_hierarchy.storyName = 'コンテンツリスト - 階層';
contentsList_hierarchy.args = {
  cardType: 'hierarchy',
  multiple: true,
  columnsNumber: 3,
  columnsNumberSmall: 1,
  linkArea: 'none',
  multipleCards: [
    {
      linkArea: 'title',
      href: '#',
      blank: true,
      title: 'リンクテキストリンクテキストリンクテキストリンクテキスト',
      titleTag: 'h3',
      text: 'リード文「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、',
      addContents:
        '<a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-hidden="true"><use xlink:href="/assets/img/sprite.svg#chevron_right"></use></svg></a><a href="#" target="_blank" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-label="新しいウインドウで開く"><use xlink:href="/assets/img/sprite.svg#new_window"></use></svg></a><a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-label="ファイルを開く"><use xlink:href="/assets/img/sprite.svg#pdf"></use></svg></a><a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-hidden="true"><use xlink:href="/assets/img/sprite.svg#chevron_right"></use></svg></a>',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    },
    {
      linkArea: 'title',
      href: '#',
      title: 'リンクテキスト',
      titleTag: 'h3',
      text: 'リード文「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、',
      rightIcon: 'pdf',
      addContents:
        '<a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-hidden="true"><use xlink:href="/assets/img/sprite.svg#chevron_right"></use></svg></a><a href="#" target="_blank" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-label="新しいウインドウで開く"><use xlink:href="/assets/img/sprite.svg#new_window"></use></svg></a><a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-label="ファイルを開く"><use xlink:href="/assets/img/sprite.svg#pdf"></use></svg></a><a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-hidden="true"><use xlink:href="/assets/img/sprite.svg#chevron_right"></use></svg></a>',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    },
    {
      linkArea: 'title',
      href: '#',
      title: 'リンクテキスト',
      titleTag: 'h3',
      text: 'リード文「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、',
      rightIcon: 'chevron_right',
      addContents:
        '<a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-hidden="true"><use xlink:href="/assets/img/sprite.svg#chevron_right"></use></svg></a><a href="#" target="_blank" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-label="新しいウインドウで開く"><use xlink:href="/assets/img/sprite.svg#new_window"></use></svg></a><a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-label="ファイルを開く"><use xlink:href="/assets/img/sprite.svg#pdf"></use></svg></a><a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-hidden="true"><use xlink:href="/assets/img/sprite.svg#chevron_right"></use></svg></a>',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    },
    {
      linkArea: 'title',
      href: '#',
      title: 'リンクテキスト',
      titleTag: 'h3',
      text: 'リード文「自然界はどのようにしてできているのだろう',
      rightIcon: 'chevron_right',
      addContents:
        '<a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト</a>'
    },
    {
      linkArea: 'title',
      href: '#',
      title: 'リンクテキスト',
      titleTag: 'h3',
      text: 'リード文「自然界はどのようにしてできているのだろう',
      rightIcon: 'chevron_right',
      addContents:
        '<a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト</a>'
    },
    {
      linkArea: 'title',
      href: '#',
      title: 'リンクテキスト',
      titleTag: 'h3',
      text: 'リード文「自然界はどのようにしてできているのだろう',
      rightIcon: 'chevron_right',
      addContents:
        '<a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト</a>'
    }
  ]
};

export const contentsList_hierarchy_person = Template.bind({});
contentsList_hierarchy_person.storyName = 'コンテンツリスト - 階層・人物';
contentsList_hierarchy_person.args = {
  cardType: 'hierarchy',
  multiple: true,
  columnsNumber: 3,
  columnsNumberSmall: 1,
  linkArea: 'none',
  multipleCards: [
    {
      linkArea: 'title',
      href: '#',
      blank: true,
      title: '人物名',
      titleTag: 'h3',
      subTitle: 'English name',
      text: '役職名役職名役職名役職名役職名 役職名役職名役職名役職名役職名 役職名役職名役職名役職名役職名',
      addContents:
        '<a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-hidden="true"><use xlink:href="/assets/img/sprite.svg#chevron_right"></use></svg></a><a href="#" target="_blank" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-label="新しいウインドウで開く"><use xlink:href="/assets/img/sprite.svg#new_window"></use></svg></a><a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-label="ファイルを開く"><use xlink:href="/assets/img/sprite.svg#pdf"></use></svg></a><a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-hidden="true"><use xlink:href="/assets/img/sprite.svg#chevron_right"></use></svg></a>',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    },
    {
      linkArea: 'title',
      href: '#',
      title: '人物名',
      titleTag: 'h3',
      subTitle: 'English name',
      text: '役職名役職名役職名役職名役職名 役職名役職名役職名役職名役職名 役職名役職名役職名役職名役職名',
      rightIcon: 'pdf',
      addContents:
        '<a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-hidden="true"><use xlink:href="/assets/img/sprite.svg#chevron_right"></use></svg></a><a href="#" target="_blank" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-label="新しいウインドウで開く"><use xlink:href="/assets/img/sprite.svg#new_window"></use></svg></a><a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-label="ファイルを開く"><use xlink:href="/assets/img/sprite.svg#pdf"></use></svg></a><a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-hidden="true"><use xlink:href="/assets/img/sprite.svg#chevron_right"></use></svg></a>',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    },
    {
      linkArea: 'title',
      href: '#',
      title: '人物名',
      titleTag: 'h3',
      subTitle: 'English name',
      text: '役職名役職名役職名役職名役職名 役職名役職名役職名役職名役職名 役職名役職名役職名役職名役職名',
      rightIcon: 'chevron_right',
      addContents:
        '<a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-hidden="true"><use xlink:href="/assets/img/sprite.svg#chevron_right"></use></svg></a><a href="#" target="_blank" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-label="新しいウインドウで開く"><use xlink:href="/assets/img/sprite.svg#new_window"></use></svg></a><a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-label="ファイルを開く"><use xlink:href="/assets/img/sprite.svg#pdf"></use></svg></a><a href="#" class="c-link c-utilityLink c-utilityLink--sizeS">リンクテキスト<svg class="c-link__icon c-link__icon--external icon" role="img" aria-hidden="true"><use xlink:href="/assets/img/sprite.svg#chevron_right"></use></svg></a>',
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: 800,
      imageHeight: 450,
      imageAlt: '画像のalt'
    }
  ]
};

export const contentsList_event_carousel = Template.bind({});
contentsList_event_carousel.storyName = 'コンテンツリスト - イベントカレンダー';
contentsList_event_carousel.args = {
  cardType: 'event',
  multiple: true,
  columnsNumber: 3,
  columnsNumberSmall: 1,
  linkArea: 'none',
  multipleCards: [
    {
      title:
        'リンクテキスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心',
      titleTag: 'h2',
      text: '',
      startDate: '2025年01月01日（火）',
      place: '[ダミー]大岡山キャンパス 本館 1F A会議室',
      tags: [
        'タグテキスト',
        'タグテキスト',
        'タグテキスト',
        'タグテキスト',
        'タグテキスト'
      ],
      linkArea: 'card',
      blank: false,
      href: '#',
      thumbnail: false,
      addClass: ''
    },
    {
      title:
        'リンクテキスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心',
      titleTag: 'h2',
      text: '',
      startDate: '2025年01月01日（火）',
      place: '[ダミー]大岡山キャンパス 本館 1F A会議室',
      tags: [
        'タグテキスト',
        'タグテキスト',
        'タグテキスト',
        'タグテキスト',
        'タグテキスト'
      ],
      linkArea: 'card',
      blank: false,
      href: '#',
      thumbnail: false,
      addClass: ''
    },
    {
      title:
        'リンクテキスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心',
      titleTag: 'h2',
      text: '',
      startDate: '2025年01月01日（火）',
      place: '[ダミー]大岡山キャンパス 本館 1F A会議室',
      tags: [
        'タグテキスト',
        'タグテキスト',
        'タグテキスト',
        'タグテキスト',
        'タグテキスト'
      ],
      linkArea: 'card',
      blank: false,
      href: '#',
      thumbnail: false,
      addClass: ''
    }
  ]
};
