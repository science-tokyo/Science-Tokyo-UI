import { create } from '@storybook/theming/create';

export default create({
  base: 'light', // ライトテーマ（baseの指定は必須）

  // 左上のStorybookのロゴが入っていたエリア
  brandTitle: 'Science Tokyo',
  brandUrl: '/?path=/docs/science-tokyo-ui--docs',
  brandImage: './assets/img/logo.svg',
  brandTarget: '_self'
});
