import beautify from 'js-beautify';
import renderComponent from './Video.njk';
const typeOption = ['iframe', 'video'];

export default {
  title: 'プリミティブコンポーネント Primitive/メディア Media/ビデオ Video',
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
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
    type: {
      if: { arg: 'multiple', eq: false },
      description: '動画の種類を指定します。',
      control: 'radio',
      options: typeOption,
      table: {
        type: { summary: '"iframe"|"video"' }
      }
    },
    src: {
      if: { arg: 'multiple', eq: false },
      description: '動画のURLを指定します。',
      control: 'text',
      if: { arg: 'type', eq: 'video' }
    },
    embedCode: {
      if: { arg: 'multiple', eq: false },
      description: '埋め込みコードを指定します。',
      control: 'text',
      if: { arg: 'type', eq: 'iframe' }
    },
    aspectRatio: {
      if: { arg: 'multiple', eq: false },
      description: 'アスペクト比を指定します。',
      options: ['16-9', '4-3', '1-1'],
      control: {
        type: 'select',
        labels: {
          '16-9': '16:9',
          '4-3': '4:3',
          '1-1': '1:1'
        }
      },
      type: {
        name: 'select'
      },
      table: {
        defaultValue: { summary: '16:9' },
        type: { summary: '"16:9"|"4:3"|"1:1"' }
      }
    },
    size: {
      if: { arg: 'multiple', eq: false },
      description: 'サイズを指定します。',
      options: ['', 'SS', 'S', 'M', 'L', 'LL'],
      control: {
        type: 'select',
        labels: {
          '': '指定なし'
        }
      },
      table: {
        type: { summary: '"SS"|"S"|"M"|"L"|"LL"' }
      }
    },
    caption: {
      if: { arg: 'multiple', eq: false },
      description: '動画のキャプションを指定します。',
      control: 'text',
      type: {
        name: 'string'
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
 * @param {string} args.type
 * @param {Text} args.src
 * @param {Text} [args.caption]
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
  multiple: false,
  type: 'iframe',
  src: '',
  embedCode:
    '<iframe width="560" height="315" src="https://www.youtube.com/embed/Kd7aNwrVlMM?si=7az-u9KQ5F5HVg4a" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
  aspectRatio: '16-9'
};
Default.storyName = 'iframe';
export const HTMLVideo = Template.bind({});
HTMLVideo.args = {
  ...Default.args,
  type: 'video'
};
export const WithCaption = Template.bind({});
WithCaption.args = {
  ...Default.args,
  caption: 'This is a caption'
};
WithCaption.storyName = 'キャプションつき';
export const Multiple = Template.bind({});
Multiple.args = {
  multiple: true,
  columnsNumber: 2,
  columnsNumberSmall: 1,
  items: [
    {
      type: 'iframe',
      embedCode:
        '<iframe width="560" height="315" src="https://www.youtube.com/embed/Kd7aNwrVlMM?si=7az-u9KQ5F5HVg4a" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
      aspectRatio: '16-9'
    },
    {
      type: 'video',
      src: '',
      aspectRatio: '16-9'
    }
  ]
};
Multiple.storyName = '2カラム表示';
