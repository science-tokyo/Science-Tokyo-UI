import beautify from 'js-beautify';
import renderComponent from './Image.njk';

export default {
  title: 'プリミティブコンポーネント Primitive/メディア Media/画像 Image',
  argTypes: {
    src: {
      if: { arg: 'multiple', eq: false },
      description: '画像のURLを指定します。',
      control: 'text'
    },
    alt: {
      if: { arg: 'multiple', eq: false },
      description: '画像の説明文を指定します。',
      control: 'text'
    },
    width: {
      if: { arg: 'multiple', eq: false },
      description: '画像の幅を指定します。',
      control: { type: 'number', min: 100, max: 800, step: 10 }
    },
    height: {
      if: { arg: 'multiple', eq: false },
      description: '画像の高さを指定します。',
      control: { type: 'number', min: 100, max: 800, step: 10 }
    },
    fullWidth: {
      if: { arg: 'multiple', eq: false },
      description: '画像を幅いっぱいにするかどうかを指定します。',
      control: 'boolean',
      table: {
        category: 'Option'
      }
    },
    size: {
      if: { arg: 'fullWidth', eq: false },
      description: 'サイズを指定します。',
      options: ['', 'SS', 'S', 'M', 'L', 'LL'],
      control: {
        type: 'select',
        labels: {
          '': '指定なし'
        }
      },
      table: {
        type: { summary: '"指定なし"|"SS"|"S"|"M"|"L"|"LL"' },
        category: 'Option'
      }
    },
    align: {
      if: { arg: 'size', neq: '' },
      description: '画像の配置を指定します。',
      control: 'select',
      options: ['Left', 'Center', 'Right'],
      table: {
        category: 'Option',
        defaultValue: { summary: 'Center' },
        type: { summary: '"Left"|"Center"|"Right"' }
      }
    },
    caption: {
      if: { arg: 'multiple', eq: false },
      description: '画像にキャプションを表示するかどうかを指定します。',
      control: 'boolean'
    },
    responsiveImage: {
      if: { arg: 'multiple', eq: false },
      description: 'レスポンシブ画像を指定するかどうかを指定します。',
      control: 'boolean',
      table: {
        category: 'Responsive Image'
      }
    },
    srcsetSmall: {
      description: 'スモールウインドウ時に表示する画像のURLを指定します。',
      if: { arg: 'responsiveImage', eq: true },
      control: 'text',
      table: {
        category: 'Responsive Image'
      }
    },
    widthSmall: {
      description: 'スモールウインドウ時に表示する画像の幅を指定します。',
      if: { arg: 'responsiveImage', eq: true },
      control: { type: 'number', min: 100, max: 800, step: 10 },
      table: {
        category: 'Responsive Image'
      }
    },
    heightSmall: {
      description: 'スモールウインドウ時に表示する画像の高さを指定します。',
      if: { arg: 'responsiveImage', eq: true },
      control: { type: 'number', min: 100, max: 800, step: 10 },
      table: {
        category: 'Responsive Image'
      }
    },
    srcsetMedium: {
      description: 'ミディアムウインドウ時に表示する画像のURLを指定します。',
      if: { arg: 'responsiveImage', eq: true },
      control: 'text',
      table: {
        category: 'Responsive Image'
      }
    },
    widthMedium: {
      description: 'ミディアムウインドウ時に表示する画像の幅を指定します。',
      if: { arg: 'responsiveImage', eq: true },
      control: { type: 'number', min: 100, max: 800, step: 10 },
      table: {
        category: 'Responsive Image'
      }
    },
    heightMedium: {
      description: 'ミディアムウインドウ時に表示する画像の高さを指定します。',
      if: { arg: 'responsiveImage', eq: true },
      control: { type: 'number', min: 100, max: 800, step: 10 },
      table: {
        category: 'Responsive Image'
      }
    },
    multiple: {
      description: '複数の画像を表示するかどうかを指定します。',
      control: 'boolean',
      table: {
        disable: true
      }
    },
    columnsNumber: {
      if: { arg: 'multiple', eq: true },
      description: '複数の画像を表示する際の列数を指定します。',
      control: { type: 'number', min: 1, max: 4, step: 1 }
    },
    columnsNumberMedium: {
      if: { arg: 'multiple', eq: true },
      description: 'ミディアムウインドウ時に表示する際の列数を指定します。',
      control: { type: 'number', min: 1, max: 4, step: 1 }
    },
    columnsNumberSmall: {
      if: { arg: 'multiple', eq: true },
      description: 'スモールウインドウ時に表示する際の列数を指定します。',
      control: { type: 'number', min: 1, max: 4, step: 1 }
    },
    items: {
      description: '複数の画像を表示する際の画像情報を指定します。',
      control: 'array',
      table: {
        disable: true
      }
    },
    addClass: {
      description:
        '追加のクラスを指定します。複数指定する場合はスペースで区切ります。',
      control: 'text',
      table: {
        disable: true
      }
    },
    dataset: {
      description: '複数の画像を表示する際の画像情報を指定します。',
      control: 'array',
      table: {
        disable: true
      }
    }
  }
};

/**
 * @param {Object} args
 * @param {boolean} [args.fullWidth]
 * @param {string} args.src
 * @param {number} args.width
 * @param {number} args.height
 * @param {string} args.alt
 * @param {string} [args.caption]
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
  multiple: false,
  src: '/assets/img/img-campus.webp',
  width: 800,
  height: 450,
  alt: 'Placeholder Image',
  fullWidth: true,
  responsiveImage: false,
  size: '',
  align: 'Center'
};

export const WithCaption = Template.bind({});
WithCaption.storyName = 'キャプションあり';
WithCaption.args = {
  ...Default.args,
  caption: true
};

export const ResponsiveImage = Template.bind({});
ResponsiveImage.storyName = 'レスポンシブイメージ';
ResponsiveImage.args = {
  ...Default.args,
  src: '//placehold.jp/1600x900.jpg',
  width: 1600,
  height: 900,
  responsiveImage: true,
  srcsetSmall: '//placehold.jp/300x400.jpg',
  widthSmall: 300,
  heightSmall: 400,
  srcsetMedium: '//placehold.jp/800x600.jpg',
  widthMedium: 800,
  heightMedium: 600
};

export const Size = Template.bind({});
Size.storyName = 'サイズ';
Size.args = {
  size: '',
  items: [
    {
      src: '/assets/img/img-campus.webp',
      width: 800,
      height: 450,
      align: 'Left',
      size: 'SS'
    },
    {
      src: '/assets/img/img-campus.webp',
      width: 800,
      height: 450,
      align: 'Left',
      size: 'S'
    },
    {
      src: '/assets/img/img-campus.webp',
      width: 800,
      height: 450,
      align: 'Left',
      size: 'M'
    },
    {
      src: '/assets/img/img-campus.webp',
      width: 800,
      height: 450,
      align: 'Left',
      size: 'L'
    },
    {
      src: '/assets/img/img-campus.webp',
      width: 800,
      height: 450,
      align: 'Left',
      size: 'LL'
    }
  ]
};

export const Align = Template.bind({});
Align.storyName = '配置';
Align.args = {
  size: '',
  items: [
    {
      src: '/assets/img/img-campus.webp',
      width: 800,
      height: 450,
      alt: 'Placeholder Image',
      size: 'S',
      align: 'Left'
    },
    {
      src: '/assets/img/img-campus.webp',
      width: 800,
      height: 450,
      alt: 'Placeholder Image',
      size: 'S'
    },
    {
      src: '/assets/img/img-campus.webp',
      width: 800,
      height: 450,
      alt: 'Placeholder Image',
      size: 'S',
      align: 'Right'
    }
  ]
};

export const Column = Template.bind({});
Column.storyName = 'カラム';
Column.args = {
  multiple: true,
  dataset: [
    {
      columnsNumber: 2,
      columnsNumberSmall: 1,
      items: [
        {
          src: '/assets/img/img-campus.webp',
          width: 800,
          height: 450,
          alt: 'Placeholder Image 1',
          fullWidth: true
        },
        {
          src: '/assets/img/img-campus.webp',
          width: 800,
          height: 450,
          alt: 'Placeholder Image 2',
          fullWidth: true
        }
      ]
    },
    {
      columnsNumber: 3,
      columnsNumberSmall: 1,
      items: [
        {
          src: '/assets/img/img-campus.webp',
          width: 800,
          height: 450,
          alt: 'Placeholder Image 1',
          fullWidth: true
        },
        {
          src: '/assets/img/img-campus.webp',
          width: 800,
          height: 450,
          alt: 'Placeholder Image 2',
          fullWidth: true
        },
        {
          src: '/assets/img/img-campus.webp',
          width: 800,
          height: 450,
          alt: 'Placeholder Image 3',
          fullWidth: true
        }
      ]
    },
    {
      columnsNumber: 4,
      columnsNumberSmall: 2,
      items: [
        {
          src: '/assets/img/img-campus.webp',
          width: 800,
          height: 450,
          alt: 'Placeholder Image 1',
          fullWidth: true
        },
        {
          src: '/assets/img/img-campus.webp',
          width: 800,
          height: 450,
          alt: 'Placeholder Image 2',
          fullWidth: true
        },
        {
          src: '/assets/img/img-campus.webp',
          width: 800,
          height: 450,
          alt: 'Placeholder Image 3',
          fullWidth: true
        },
        {
          src: '/assets/img/img-campus.webp',
          width: 800,
          height: 450,
          alt: 'Placeholder Image 4',
          fullWidth: true
        }
      ]
    }
  ]
};
