import beautify from 'js-beautify';
import renderComponent from './Map.njk';

export default {
  title: 'プリミティブコンポーネント Primitive/メディア Media/マップ Map',
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {
    embedCode: {
      description: '埋め込みコードを指定します。',
      control: 'text'
    },
    aspectRatio: {
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
      table: {
        defaultValue: { summary: '4:3' },
        type: { summary: '"16:9"|"4:3"|"1:1"' }
      }
    },
    size: {
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
  embedCode:
    '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6065.130754054877!2d139.67980080649278!3d35.6055073284914!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f88b899cc553%3A0x5d0763367373fca5!2z5p2x5Lqs5bel5qWt5aSn5a2m!5e0!3m2!1sja!2sjp!4v1718307435430!5m2!1sja!2sjp" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>',
  aspectRatio: '4-3',
  size: ''
};
Default.storyName = 'デフォルト';
