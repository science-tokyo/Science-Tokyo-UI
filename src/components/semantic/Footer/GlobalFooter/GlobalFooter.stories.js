import beautify from 'js-beautify';
import renderComponent from './GlobalFooter.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/フッター Footer/グローバルフッター Global footer',
  parameters: {
    layout: 'fullscreen'
  },
  argTypes: {}
};

/**
 * @param {Object} args
 */
const Template = (args, { globals }) => {
  const { locale } = globals;

  // 言語ごとのラベルを定義
  const labels = {
    ja: [
      '本サイトについて',
      'サイトマップ',
      '個人情報の取り扱い',
      'ウェブアクセシビリティ方針',
      'SNSポリシー'
    ],
    en: [
      'Terms of use',
      'Sitemap',
      'Privacy policy',
      'Web accessibility policy',
      'SNS policy'
    ]
  };

  const updatedArgs = {
    ...args,
    localeLabels: labels[locale] || labels.ja
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
Default.args = {};
