import renderComponent from './Grid.njk';

export default {
  title: 'Tokens/レイアウトグリッド Layout grid',
  argTypes: {
    equalLayout: {
      description: 'カラムを均等幅で分割します。',
      control: {
        type: 'boolean'
      }
    },
    columnsNumber: {
      if: { arg: 'equalLayout', eq: true },
      description: '均等割りカラムの数を指定します。',
      control: {
        type: 'range',
        min: 1,
        max: 12
      }
    },
    columnsNumberMedium: {
      if: { arg: 'equalLayout', eq: true },
      description: 'ミディアムウインドウ時の均等割りカラムの数を指定します。',
      control: {
        type: 'range',
        min: 1,
        max: 12
      }
    },
    columnsNumberSmall: {
      if: { arg: 'equalLayout', eq: true },
      description: 'スモールウインドウ時の均等割りカラムの数を指定します。',
      control: {
        type: 'range',
        min: 1,
        max: 8
      }
    },
    columnSettings: {
      description:
        '各カラム内のHTMLを配列で指定します。任意で結合する列数(span)の設定ができます。',
      defaultValue: [
        {
          html: '<div>column</div>',
          span: 12
        }
      ],
      control: {
        type: 'array'
      },
      table: {
        disable: true
      }
    },
    justifyContent: {
      description: 'justify-contentの設定を指定します。',
      type: 'string',
      options: [
        'Normal',
        'Center',
        'Start',
        'End',
        'Between',
        'Around',
        'Evenly',
        'Stretch'
      ],
      control: {
        type: 'select',
        labels: {
          Normal: 'normal',
          Center: 'center',
          Start: 'flex-start',
          End: 'flex-end',
          Between: 'space-between',
          Around: 'space-around',
          Evenly: 'space-evenly',
          Stretch: 'stretch'
        }
      },
      table: {
        defaultValue: { summary: 'normal' },
        type: { summary: 'select' }
      }
    },
    alignItems: {
      description: 'align-itemsの設定を指定します。',
      type: 'string',
      options: ['Center', 'Start', 'End', 'Stretch', 'Baseline'],
      control: {
        type: 'select',
        labels: {
          Center: 'center',
          Start: 'flex-start',
          End: 'flex-end',
          Baseline: 'baseline',
          Stretch: 'stretch'
        }
      },
      table: {
        defaultValue: { summary: 'strecth' },
        type: { summary: 'select' }
      }
    },
    flexDirection: {
      description: 'flex-directionの設定を指定します。',
      type: 'string',
      options: ['Row', 'RowReverse', 'Column', 'ColumnReverse'],
      control: {
        type: 'select',
        labels: {
          Row: 'row',
          RowReverse: 'row-reverse',
          Column: 'column',
          ColumnReverse: 'column-reverse'
        }
      },
      table: {
        defaultValue: { summary: 'row' },
        type: { summary: 'select' }
      }
    },
    noGutter: {
      description: 'カラム間の余白を削除します。',
      control: {
        type: 'boolean'
      },
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
    }
  }
};
/**
 * @param {Object} args
 * @param {Array} args.columnSettings
 * @param {string} [args.justifyContent]
 * @param {string} [args.alignItems]
 */
const Template = (args) => {
  return renderComponent({
    storybookArgs: args
  });
};

export const Default = Template.bind({});
Default.storyName = '基本形';

export const EqualLayout = Template.bind({});
EqualLayout.storyName = '均等割り';
EqualLayout.args = {
  equalLayout: true,
  columnsNumber: 12,
  columnsNumberMedium: 6,
  columnsNumberSmall: 4,
  columnSettings: [
    {
      html: '<div>eq</div>'
    },
    {
      html: '<div>eq</div>'
    },
    {
      html: '<div>eq</div>'
    },
    {
      html: '<div>eq</div>'
    },
    {
      html: '<div>eq</div>'
    },
    {
      html: '<div>eq</div>'
    },
    {
      html: '<div>eq</div>'
    },
    {
      html: '<div>eq</div>'
    },
    {
      html: '<div>eq</div>'
    },
    {
      html: '<div>eq</div>'
    },
    {
      html: '<div>eq</div>'
    },
    {
      html: '<div>eq</div>'
    }
  ]
};

export const SpanLayout = Template.bind({});
SpanLayout.storyName = 'カラム結合';
SpanLayout.args = {
  equalLayout: false,
  columnSettings: [
    {
      html: '<div>span[lg:6/md:4/sm:3]</div>',
      span: 6,
      md: {
        span: 4
      },
      sm: {
        span: 3
      }
    },
    {
      html: '<div>span[lg:6/md:8/sm:5]</div>',
      span: 6,
      md: {
        span: 8
      },
      sm: {
        span: 5
      }
    }
  ]
};

export const JustifyContent = Template.bind({});
JustifyContent.storyName = '左右揃え';
JustifyContent.args = {
  equalLayout: true,
  columnsNumber: 5,
  columnsNumberMedium: 4,
  columnsNumberSmall: 3,
  columnSettings: [
    {
      html: '<div>A</div>'
    },
    {
      html: '<div>B</div>'
    }
  ],
  justifyContent: 'Center'
};

export const AlignItems = Template.bind({});
AlignItems.storyName = '上下揃え';
AlignItems.args = {
  equalLayout: false,
  columnSettings: [
    {
      html: '<div>A</div>',
      span: 4,
      sm: {
        span: 2
      }
    },
    {
      html: '<div style="height:10rem">B</div>',
      span: 8,
      sm: {
        span: 6
      }
    }
  ],
  alignItems: 'Center'
};

export const FlexDirection = Template.bind({});
FlexDirection.storyName = '方向指定';
FlexDirection.args = {
  equalLayout: true,
  columnsNumber: 5,
  columnsNumberMedium: 4,
  columnsNumberSmall: 3,
  columnSettings: [
    {
      html: '<div>A</div>'
    },
    {
      html: '<div>B</div>'
    }
  ],
  justifyContent: 'Center',
  flexDirection: 'RowReverse'
};

export const PercentLayout = Template.bind({});
PercentLayout.storyName = '割合指定';
PercentLayout.args = {
  equalLayout: false,
  columnSettings: [
    {
      html: '<div>[lg:50%/md:40%/sm:100%]</div>',
      per: 50,
      md: {
        per: 40
      },
      sm: {
        per: 100
      }
    },
    {
      html: '<div>[lg:50%/md:60%/sm:100%]</div>',
      per: 50,
      md: {
        per: 60
      },
      sm: {
        per: 100
      }
    }
  ]
};
export const NoGutter = Template.bind({});
NoGutter.storyName = 'ガター無し';
NoGutter.args = {
  ...PercentLayout.args,
  noGutter: true
};
