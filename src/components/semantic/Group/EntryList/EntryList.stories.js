import beautify from 'js-beautify';
import renderComponent from './EntryList.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/グループ Group/記事リスト Entry list',
  argTypes: {
    contentsType: {
      description: 'コンテンツタイプを指定します。',
      options: ['', 'event'],
      control: {
        type: 'select',
        labels: {
          '': 'default',
          event: 'event'
        }
      }
    },
    items: {
      control: {
        type: 'array'
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
  // デフォルトデータを取得
  let default_data_update = Default.args.items;
  // イベント用のデータを取得
  let event_data_update = Event.args.items;
  // 英語の場合はデータを更新
  if (locale === 'en') {
    for (let i = 0; i < default_data_update.length; i++) {
      default_data_update[i].dateEn = 'December 31, 2024';
      default_data_update[i].tagsEn = [
        {
          label: 'Category'
        },
        {
          label: 'Category'
        },
        {
          label: 'Category'
        }
      ];
      default_data_update[i].titleEn =
        'Entry title text title text title text title text title text title text title text title text title text ';
    }
    for (let i = 0; i < event_data_update.length; i++) {
      event_data_update[i].titleEn =
        'Link text. Curabitur tempor quis eros tempus lacinia. Nam ';
      event_data_update[i].startDateEn = 'Tue, Jan. 1';
      event_data_update[i].endDateEn = 'Mon, Dec 31';
      event_data_update[i].venueEn = '[Bummy]Science Tokyo Ookayama Campus';
      event_data_update[i].tagsEn = [
        {
          label: 'Tag text Tag'
        },
        {
          label: 'Tag text Tag'
        },
        {
          label: 'Tag text Tag'
        }
      ];
    }
  } else {
    // 日本語の場合はデータを更新
    for (let i = 0; i < default_data_update.length; i++) {
      delete default_data_update[i].dateEn;
      delete default_data_update[i].tagsEn;
      delete default_data_update[i].titleEn;
    }
    for (let i = 0; i < event_data_update.length; i++) {
      delete event_data_update[i].titleEn;
      delete event_data_update[i].startDateEn;
      delete event_data_update[i].endDateEn;
      delete event_data_update[i].venueEn;
      delete event_data_update[i].tagsEn;
    }
  }

  const updatedArgs = {
    ...args,
    locale: locale
  };

  return beautify.html(
    renderComponent({
      storybookArgs: updatedArgs
    }),
    { indent_size: 2, preserve_newlines: false }
  );
};

export const Default = Template.bind({});
Default.storyName = 'デフォルト';
Default.args = {
  items: [
    {
      date: '2024年12月31日',
      tags: [
        {
          label: 'カテゴリ'
        },
        {
          label: 'カテゴリ'
        },
        {
          label: 'カテゴリ'
        }
      ],
      title:
        'エントリータイトル 情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、',
      url: '#'
    },
    {
      date: '2024年12月31日',
      tags: [
        {
          label: 'カテゴリ'
        },
        {
          label: 'カテゴリ'
        },
        {
          label: 'カテゴリ'
        }
      ],
      title:
        'リンクテキスト「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。「自然界はどのようにして',
      url: '#'
    },
    {
      date: '2024年12月31日',
      tags: [
        {
          label: 'カテゴリ'
        },
        {
          label: 'カテゴリ'
        },
        {
          label: 'カテゴリ'
        }
      ],
      title:
        'エントリータイトル 情に棹させば流される。智に働けば角が立つ。どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。 とかくに人の世は住みにくい。意地を通せば窮屈だ。 どこへ越しても住みにくいと悟った時、詩が生れて、画が出来る。とかくに人の世は住みにくい。意地を通せば窮屈だ。 とかくに人の世は住みにくい。意地を通せば窮屈だ。',
      url: '#'
    }
  ]
};

export const Event = Template.bind({});
Event.storyName = 'イベント';
Event.args = {
  contentsType: 'event',
  items: [
    {
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: '1600',
      imageHeight: '900',
      title:
        'リンクテキスト「自然界はどのようにしてできているのだろう?」という',
      startDate: '2025年01月01日（月）',
      startTime: '12:00',
      endTime: '24:00',
      venue: '[ダミー]大岡山キャンパス',
      tags: [
        {
          label: 'カテゴリ'
        },
        {
          label: 'カテゴリ'
        },
        {
          label: 'カテゴリ'
        }
      ]
    },
    {
      imageSrc: '/assets/img/img-campus.webp',
      imageWidth: '1600',
      imageHeight: '900',
      title:
        'リンクテキスト「自然界はどのようにしてできているのだろう?」という',
      startDate: '2025年01月01日（月）',
      endDate: '2025年12月31日（火）',
      startTime: '12:00',
      venue: '[ダミー]大岡山キャンパス',
      tags: [
        {
          label: 'カテゴリ'
        },
        {
          label: 'カテゴリ'
        },
        {
          label: 'カテゴリ'
        }
      ]
    }
  ]
};
