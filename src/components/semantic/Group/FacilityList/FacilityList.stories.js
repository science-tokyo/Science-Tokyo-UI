import beautify from 'js-beautify';
import renderComponent from './FacilityList.njk';

export default {
  title:
    'セマンティックコンポーネント Semantic/グループ Group/施設リスト Facility list',
  argTypes: {
    title: {
      description: 'タイトルを指定します。',
      control: 'text'
    },
    description: {
      description: '説明文を指定します。',
      control: 'text'
    },
    address: {
      description: '住所を指定します。',
      control: 'text'
    },
    tel: {
      description: '電話番号を指定します。',
      control: 'text'
    },
    access: {
      description: 'アクセス情報を箇条書きで指定します。',
      control: 'array'
    },
    href: {
      description: 'リンク先を指定します。',
      control: 'text'
    },
    external: {
      description: '外部リンクを指定します。',
      control: 'boolean'
    },
    buttonLabel: {
      description: 'ボタンラベルを指定します。',
      control: 'text'
    },
    mapEmbedCode: {
      description: '地図の埋め込みコードを入力します。',
      control: 'text'
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
Default.storyName = 'デフォルト';
Default.args = {
  title: '施設名',
  description:
    '本文テキスト 「自然界はどのようにしてできているのだろう?」という基本的な原理への興味や関心をモチベーションに、法則や論理を探究するのが理学です。',
  address: '東京都目黒区大岡山2丁目12-1',
  tel: '03-3XXXX-XXXX',
  access: [
    '[ダミー]JR新宿駅南口A5出口から徒歩5分／都営新宿線初台駅B1出口から徒歩15分／都営新宿線初台駅B1出口から徒歩15分'
  ],
  href: '#',
  buttonLabel: 'Google Mapsで見る',
  external: false,
  mapEmbedCode:
    '<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6065.130754054877!2d139.67980080649278!3d35.6055073284914!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018f88b899cc553%3A0x5d0763367373fca5!2z5p2x5Lqs5bel5qWt5aSn5a2m!5e0!3m2!1sja!2sjp!4v1718307435430!5m2!1sja!2sjp" width="600" height="450" style="border:0" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>'
};
