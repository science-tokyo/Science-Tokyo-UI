import beautify from 'js-beautify';
import renderComponent from './Pagination.njk';

export default {
  title:
    'プリミティブコンポーネント Primitive/アクション Action/ページネーション Pagination',
  argTypes: {
    currentPage: {
      description: '現在のページ番号を指定します。',
      control: 'number'
    },
    totalPages: {
      description: 'ページの総数を指定します。',
      control: {
        type: 'number'
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
  currentPage: 2,
  totalPages: 5
};
Default.storyName = 'デフォルト';
export const First_Page = Template.bind({});
First_Page.args = {
  currentPage: 1,
  totalPages: 5
};
export const Last_Page = Template.bind({});
Last_Page.args = {
  currentPage: 5,
  totalPages: 5
};
