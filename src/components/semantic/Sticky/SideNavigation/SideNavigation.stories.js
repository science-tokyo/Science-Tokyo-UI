import beautify from 'js-beautify';
import renderComponent from './SideNavigation.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/スティッキー Sticky/サイドナビゲーション Side navigation',
  parameters: {
    layout: 'fullscreen'
  }
};

/**
 * @param {Object} args
 */
const Template = (args, { globals }) => {
  const { locale } = globals;
  // スクリプト適用
  setTimeout(() => {
    const button = document.querySelector('[data-js-sidenav-btn]');
    if (button) {
      // ボタンの親要素にアクティブクラスを付与
      button.closest('[data-js-sidenav]').classList.add('is-active');
      button.closest('[data-js-sidenav]').classList.add('is-open');
      // メニューを開く（display: noneを削除）
      const menu = document.querySelector('#sidenav');
      menu.style.display = '';
      delete button.dataset.jsSidenavBtn;
      // ボタンをクローンで複製
      const clonedBtn = button.cloneNode(true);
      // 元のボタンをクローンで置き換えてイベントを無効化
      button.replaceWith(clonedBtn);
    }
  }, 0);

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
Default.args = {};
Default.storyName = 'デフォルト';
