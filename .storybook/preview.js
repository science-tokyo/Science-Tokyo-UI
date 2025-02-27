/** @type { import('@storybook/html').Preview } */
import '../src/assets/css/font.scss';
import '../src/assets/css/style.scss';
import '../src/assets/ts/main.ts';
export const globalTypes = {
  locale: {
    name: 'Locale',
    description: '言語変更',
    defaultValue: 'ja', // デフォルトを日本語に設定
    toolbar: {
      icon: 'globe',
      items: [
        { value: 'ja', right: '🇯🇵', title: '日本語' },
        { value: 'en', right: '🇺🇸', title: 'English' }
      ]
    }
  }
};
const preview = {
  parameters: {
    // actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    options: {
      storySort: {
        order: [
          'Science Tokyo UI',
          '利用方法',
          'コーディングガイド',
          'ライセンス',
          'Tokens',
          [
            '色 Color',
            'アイコン Icon',
            'タイポグラフィー Typography - 日本語',
            'タイポグラフィー Typography - English',
            '余白・スペース Spacing',
            'サイズ Size',
            '角丸 Corner radius',
            'エレベーション Elevation',
            'ブレイクポイント Break point',
            'レイアウトグリッド Layout grid'
          ],
          'プリミティブコンポーネント Primitive',
          [
            'メディア Media',
            ['画像 Image', 'ビデオ Video', 'マップ Map'],
            'テキスト Text',
            [
              '段落 Paragraph',
              '見出し Heading',
              '引用 Blockquote',
              'ラベル Label'
            ],
            'データセット Dataset',
            [
              'テーブル Table',
              '箇条書きリスト List',
              '順序付きリスト Order list',
              '定義リスト Definition list'
            ],
            'アクション Action',
            [
              'ボタン Button',
              'アイコンボタン Icon button',
              'インラインリンク Inline link',
              'ユーティリティリンク Utility link',
              'ページネーション Pagination'
            ],
            'フォーム Form',
            [
              'インプット（入力フォーム） Input',
              'テキストエリア Textarea',
              'ラジオボラン Radiobutton',
              'チェックボックス Checkbox',
              'セレクトボックス Select'
            ]
          ],
          'セマンティックコンポーネント Semantic',
          [
            'ヘッダー Header',
            [
              'グローバルヘッダー Global header',
              'グローバルナビゲーション Global navigation'
            ],
            'フッター Footer',
            ['グローバルフッター Global footer', 'サイトフッター Site footer'],
            'グループ Group',
            [
              'ピックアップコンテンツ Pickup contents',
              'カード Card',
              '記事コンテンツ Article contents',
              '記事リスト Entry list',
              '更新履歴 Update history',
              'コンタクトリスト Contact list',
              '施設リスト Facility list',
              'カルーセル Carousel',
              'ヒーロー画像 Hero',
              'バナー Banner',
              '重要なお知らせ Important notice',
              'イベント情報 Event information',
              'パンくずリスト Breadcrumb',
              'アコーディオン Accordion',
              'リンクリスト Link list',
              'アンカーリンク Anchor link'
            ],
            'スティッキー Sticky',
            [
              'ページトップボタン Page top button',
              'サイドナビゲーション Side navigation'
            ],
            'フォーム Form',
            ['フォームセット Form set', '検索ツール Search tool'],
            'コントロールグループ Control group'
          ]
        ]
      }
    }
  },
  decorators: [
    (Story, context) => {
      // 現在のlocaleを取得
      const { locale } = context.globals;

      // iframe内の<html>のlang属性を変更
      const updateIframeLang = () => {
        const iframe = window.parent.document.querySelector(
          'iframe#storybook-preview-iframe'
        );
        if (iframe && iframe.contentDocument) {
          const html = iframe.contentDocument.documentElement; // iframe内の<html>要素を取得
          html.setAttribute('lang', locale || 'ja'); // localeに基づいてlang属性を設定
        }
      };

      // 初回設定
      updateIframeLang();

      // StorybookのUIが更新されたときにも適用
      setTimeout(updateIframeLang, 0);

      return Story();
    }
  ]
};

export default preview;
