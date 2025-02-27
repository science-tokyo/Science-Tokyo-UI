import beautify from 'js-beautify';
import renderComponent from './Banner.njk';

export default {
  title: 'セマンティックコンポーネント Semantic/グループ Group/バナー Banner',
  argTypes: {
    columnsNumber: {
      description: 'カラム数を指定します。',
      options: [1, 2, 3, 4],
      control: {
        type: 'select',
        labels: {
          1: '1カラム',
          2: '2カラム',
          3: '3カラム',
          4: '4カラム'
        }
      }
    },
    items: {
      description: 'バナーアイテムを指定します。',
      control: 'array'
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
export const col1 = Template.bind({});
col1.storyName = '1カラム';
col1.args = {
  columnsNumber: 1,
  items: [
    {
      src: '/assets/img/img-campus.webp',
      alt: 'バナー画像',
      href: '#',
      width: 1600,
      height: 900
    }
  ]
};
export const col2 = Template.bind({});
col2.storyName = '2カラム';
col2.args = {
  columnsNumber: 2,
  items: [
    {
      src: '/assets/img/img-campus.webp',
      alt: 'バナー画像',
      href: '#',
      width: 800,
      height: 450
    },
    {
      src: '/assets/img/img-campus.webp',
      alt: 'バナー画像',
      href: '#',
      width: 800,
      height: 450
    }
  ]
};
export const col3 = Template.bind({});
col3.storyName = '3カラム';
col3.args = {
  columnsNumber: 3,
  items: [
    {
      src: '/assets/img/img-campus.webp',
      alt: 'バナー画像',
      href: '#',
      width: 800,
      height: 450
    },
    {
      src: '/assets/img/img-campus.webp',
      alt: 'バナー画像',
      href: '#',
      width: 800,
      height: 450
    },
    {
      src: '/assets/img/img-campus.webp',
      alt: 'バナー画像',
      href: '#',
      width: 800,
      height: 450
    }
  ]
};
export const col4 = Template.bind({});
col4.storyName = '4カラム';
col4.args = {
  columnsNumber: 4,
  items: [
    {
      src: '/assets/img/img-campus.webp',
      alt: 'バナー画像',
      href: '#',
      width: 800,
      height: 450
    },
    {
      src: '/assets/img/img-campus.webp',
      alt: 'バナー画像',
      href: '#',
      width: 800,
      height: 450
    },
    {
      src: '/assets/img/img-campus.webp',
      alt: 'バナー画像',
      href: '#',
      width: 800,
      height: 450
    },
    {
      src: '/assets/img/img-campus.webp',
      alt: 'バナー画像',
      href: '#',
      width: 800,
      height: 450
    }
  ]
};
