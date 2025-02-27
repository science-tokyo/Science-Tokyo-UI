// cnt.searchMedia.ts
interface Media {
  PUBLISH_DATE: string;
  MEDIA_CD: string;
  LANG_CD: string;
  TITLE: string;
  READ_COPY: string;
  THUMBNAIL: string;
  HELD_START_DATE: string;
  HELD_END_DATE: string;
  HELD_START_TIME: string;
  HELD_END_TIME: string;
  START_DATE: string;
  VENUE: string;
  MEDIA_TYPES: string;
  KEYWORDS: string;
  TAGS: string;
  SEVERITY: string;
  PUBLISH_FLG: number;
}
interface Tag {
  TAG_ID: string;
  TAG_CD: string;
  TAG_NAME: string;
  SORT_NO: string;
}
interface Tab {
  [typeID: string]: {
    id: string;
    name: string;
  };
}
interface FilterOption {
  lang: string;
  tab: string;
  keywords: string[];
  date: string;
  page: number;
}
export default class SearchMedia {
  element: HTMLElement;
  displayNum: number;
  contentsArea: HTMLElement | null;
  initialData: Media[];
  curationData: Media[];
  tagMaster: Array<Tag>;
  mediaTypeList: string[];
  filterOption: FilterOption;
  filterData: Media[];
  forTagsData: Media[];
  yearList: string[];
  displayType: string;
  curationFlag: boolean;

  //-------------------------------------------------
  // Parameters
  //-------------------------------------------------
  constructor(element: HTMLElement) {
    // 対象要素
    this.element = element;
    // 画面に表示する件数
    this.displayNum = 36;
    // コンテンツエリア
    this.contentsArea = null;
    // JSON初期データ
    this.initialData = Array();
    // キュレーションデータ
    this.curationData = Array();
    // タグリスト
    this.tagMaster = Array();
    // タブリスト
    // メディアタイプリスト（27:ストーリー, 28:ニュース, 29:イベント, 30:お知らせ, 31:プレスリリース）
    this.mediaTypeList = ['27', '28', '29', '30', '31'];
    // フィルター用のオプション
    this.filterOption = {
      lang: '',
      tab: '',
      keywords: [],
      date: '',
      page: 1
    };
    // フィルター後のデータ
    this.filterData = Array();
    // タグ出力用のデータ
    this.forTagsData = Array();
    this.yearList = Array();
    // 表示タイプ
    this.displayType = '';
    this.curationFlag = false;

    // 初期化を実行
    this.init();
    // イベントを登録
    this.addEvent();
  }
  //-------------------------------------------------
  // Init Methods
  //-------------------------------------------------
  private init() {
    // URLから言語に合わせたメディア情報を取得する
    let jsonFileList: any = {};
    const curation = ['admissions', 'students', 'partnerships'];
    const pathname = window.location.pathname;

    pathname.indexOf('/en/') !== -1
      ? (this.filterOption.lang = 'en')
      : (this.filterOption.lang = 'ja');

    // ホスト名にcurationの文字列が含まれている場合は、curationのJSONファイルを取得
    curation.some((path_key) => {
      if (window.location.hostname.includes(path_key)) {
        this.curationFlag = true;
        return true;
      }
    });
    if (this.curationFlag) {
      jsonFileList = {
        mediaData: `/expansion/get_media_curation_list_json.php?lang_cd=${this.filterOption.lang}`,
        tagList: `/expansion/get_tag_list_json.php?lang_cd=${this.filterOption.lang}`
      };
    } else {
      jsonFileList = {
        mediaData: `/expansion/get_media_list_json.php?lang_cd=${this.filterOption.lang}`,
        tagList: `/expansion/get_tag_list_json.php?lang_cd=${this.filterOption.lang}`,
        curationData: `/expansion/get_media_curation_list_json.php?lang_cd=${this.filterOption.lang}`
      };
    }

    // asyncPromiseTask関数は、Promiseインスタンスを返す
    const asyncPromiseTask = (): Promise<void> => {
      return new Promise((resolve, reject) => {
        const self = this;

        for (const key in jsonFileList) {
          const url = jsonFileList[key];
          const xhr = new XMLHttpRequest();
          xhr.open('GET', url, true);
          xhr.send(null);
          xhr.onreadystatechange = function () {
            if (xhr.readyState == 4 && xhr.status == 200) {
              switch (key) {
                case 'mediaData':
                  self.initialData = JSON.parse(
                    self._unescapeHtml(xhr.responseText)
                  );
                  break;
                case 'tagList':
                  self.tagMaster = JSON.parse(
                    self._unescapeHtml(xhr.responseText)
                  );
                  break;
                case 'curationData':
                  self.curationData = JSON.parse(
                    self._unescapeHtml(xhr.responseText)
                  );
                  break;
                default:
                  break;
              }
              // 2つのJSONファイルのデータを取得したらresolve()を呼ぶ
              if (self.curationFlag) {
                if (
                  self.initialData.length !== 0 &&
                  self.tagMaster.length !== 0
                ) {
                  resolve();
                }
              } else {
                if (
                  self.initialData.length !== 0 &&
                  self.tagMaster.length !== 0 &&
                  self.curationData.length !== 0
                ) {
                  resolve();
                }
              }
            }
          };
        }
      });
    };

    // asyncPromiseTask関数の非同期処理が成功した時、失敗した時に呼ばれる処理をコールバック関数として登録する
    asyncPromiseTask()
      .then(() => {
        // console.log('データ取得が完了しました');
        // --- 非同期処理が成功したときの処理 --- //
        // 初期化セットアップ
        this.initSetup(this.filterOption);
      })
      .catch(() => {
        // --- 非同期処理が失敗したときの処理 --- //
        // console.error('データ取得中にエラーが発生しました');
      });
  }
  /**
   * 初期化セットアップ
   * @param {FilterOption} option - フィルターオプション
   * @return {void}
   */
  private initSetup(option: FilterOption) {
    // フィルター初期化
    this.initFilter();
    // タブを初期化
    this.initTab(option);
    // ソートアイテム初期化
    this.initSortElement();
    // フィルタオプションに合わせてデータをフィルタリング
    this.dataFilter(option);
    // 開催日のセレクトボックスを初期化
    this.initDateSelect(option);
    // タグを初期化
    this.initTagList(option);
    // コンテンツを生成
    this.createContents();
    // ページネーションを生成
    this.createPagination();
  }
  /**
   * フィルター初期化
   * @return {void}
   */
  private initFilter() {
    // URLのパラメーターをチェック
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    const keywords = urlParams.getAll('keywords[]');
    const date = urlParams.get('date');
    const page = urlParams.get('page');
    // フィルターオプションを更新
    // タブの初期値は、全学サイトの場合は「top-picks」、それ以外は「all」
    if (tab) {
      this.filterOption.tab = tab;
    } else {
      if (!this.curationFlag) {
        this.filterOption.tab = 'top-picks';
      } else {
        this.filterOption.tab = 'all';
      }
    }
    this.filterOption.keywords = keywords ? keywords : [];
    this.filterOption.date = date ? date : '';
    this.filterOption.page = page ? Number(page) : 1;

    if (this.displayType === '') {
      if (tab === '29' && date === null) {
        this.displayType = 'eventAll';
      } else if (tab === '29' && date !== null) {
        this.displayType = 'eventMonth';
      } else {
        this.displayType = 'media';
      }
    }

    // console.log('filterOption:', this.filterOption);
  }
  /**
   * タブを初期化
   * @param {FilterOption} option - フィルターオプション
   */
  private initTab(option: FilterOption) {
    // option.tabの値に一致するタブをアクティブにする
    const tabData = document.querySelectorAll(
      '[data-js-tab-trigger]'
    ) as NodeListOf<HTMLElement>;
    tabData.forEach((tab: HTMLElement) => {
      if (tab.dataset.jsTabTrigger === option.tab) {
        this._buttonActiveChange(tabData, tab);
      }
    });
  }
  /**
   * 絞り込みアイテムを初期化
   */
  private initSortElement() {
    // 対象要素を取得
    const searthSort = document.querySelectorAll(
      '[data-js-search-sort]'
    ) as NodeListOf<HTMLElement>;

    // this.displayTypeに一致する要素をアクティブにする
    searthSort.forEach((sort: HTMLElement) => {
      // 一旦非表示にする
      sort.style.display = 'none';
      if (this.filterOption.tab === '29') {
        if (
          this.displayType === 'eventAll' &&
          sort.dataset.jsSearchSort === 'eventAll'
        ) {
          sort.style.display = '';
        }
        if (
          this.displayType === 'eventMonth' &&
          sort.dataset.jsSearchSort === 'eventMonth'
        ) {
          sort.style.display = '';
        }
      } else {
        this.displayType = 'media';
        if (sort.dataset.jsSearchSort === 'year') {
          sort.style.display = '';
        }
      }
    });
  }
  /**
   * フィルタリング処理
   * @param {FilterOption} option - フィルターオプション
   * @return {void}
   */
  private dataFilter(option: FilterOption) {
    let _filterData: Media[] = [];
    // ピックアップタブの場合はキュレーションデータを使用する
    if (this.filterOption.tab === 'top-picks') {
      _filterData = Object.values(this.curationData);
    } else {
      _filterData = Object.values(this.initialData);
    }

    // --- タブ --- //
    if (option.tab === 'top-picks') {
      // SEVERITYの値が142,143,144のいずれかを含むものを抽出
      _filterData = _filterData.filter((data: Media) => {
        if (data.SEVERITY !== null) {
          return ['142', '143', '144'].some((str) =>
            data.SEVERITY.includes(str)
          );
        }
      });
    } else if (option.tab !== 'all' && option.tab !== '') {
      // PUBLISH_FLGが1のみを抽出（全学サイトの場合のみ）
      if (!this.curationFlag) {
        _filterData = _filterData.filter((data: Media) => {
          return data.PUBLISH_FLG === 1;
        });
      }
      // option.tabがthis.mediaTypeListに含まれるか
      if (this.mediaTypeList.includes(option.tab)) {
        // メディアタイプでフィルタリング
        _filterData = _filterData.filter((data: Media) => {
          // MEDIA_TYPESに含まれるものを抽出
          if (data.MEDIA_TYPES !== null)
            return data.MEDIA_TYPES.includes(option.tab);
        });
      } else {
        // キーワードでフィルタリング
        _filterData = _filterData.filter((data: Media) => {
          // KEYWORDSに含まれるものを抽出
          if (data.KEYWORDS !== null) return data.KEYWORDS.includes(option.tab);
        });
      }
    }

    // この時点のデータから年のリストを生成しておく
    this.yearList = [];
    if (option.tab === '29') {
      _filterData.forEach((data: Media) => {
        // HELD_START_DATEの年月を取得
        if (data.HELD_START_DATE !== null) {
          const startDate = data.HELD_START_DATE.substring(0, 7);
          if (!this.yearList.includes(startDate)) this.yearList.push(startDate);
        }
        if (data.HELD_END_DATE !== null) {
          const endDate = data.HELD_END_DATE.substring(0, 7);
          if (!this.yearList.includes(endDate)) this.yearList.push(endDate);
        }
      });
    } else {
      _filterData.forEach((data: Media) => {
        // PUBLISH_DATE（公開日）の年を取得
        const year = data.PUBLISH_DATE.substring(0, 4);
        if (!this.yearList.includes(year)) this.yearList.push(year);
      });
    }
    // 年の値を昇順で並び替え
    this.yearList.sort((a: string, b: string) => {
      return a > b ? -1 : 1;
    });

    // --- 年 --- //
    if (option.date !== '') {
      _filterData = _filterData.filter((data: Media) => {
        if (option.tab === '29') {
          // HELD_START_DATEの年月を取得
          const startDate =
            data.HELD_START_DATE !== null
              ? data.HELD_START_DATE.substring(0, 7)
              : '';
          const endDate =
            data.HELD_END_DATE !== null
              ? data.HELD_END_DATE.substring(0, 7)
              : '';
          return [startDate, endDate].some((date: string) => {
            if (date === '') return false;
            return option.date.includes(date);
          });
        } else {
          // PUBLISH_DATE（公開日）の年を取得
          const publishDate = data.PUBLISH_DATE.substring(0, 4);
          return publishDate === option.date;
        }
      });
    }

    // タグ出力用のデータはキーワードで絞り込まない
    this.forTagsData = new Array(..._filterData);

    // --- キーワード --- //
    // KEYWORDSに含むものを抽出
    if (option.keywords.length !== 0) {
      _filterData = _filterData.filter((data: Media) => {
        // data.KEYWORDSでフィルタリング
        const TAGLIST = this._getTagList(data.KEYWORDS);
        return TAGLIST.some((tag: Tag) => {
          return option.keywords.includes(tag.TAG_ID);
        });
      });
    }

    if (this.filterOption.tab === '29') {
      // HELD_START_DATEで降順に並び替え
      _filterData.sort((a: Media, b: Media) => {
        // 開催日が同じ場合は、掲載開始日を合わせてUnixTimeで比較
        if (a.HELD_START_DATE === b.HELD_START_DATE) {
          const a_unixTime =
            new Date(a.HELD_START_DATE).getTime() +
            new Date(a.START_DATE).getTime() / 100;
          const b_unixTime =
            new Date(b.HELD_START_DATE).getTime() +
            new Date(b.START_DATE).getTime() / 100;
          return a_unixTime > b_unixTime ? -1 : 1;
        }
        return a.HELD_START_DATE > b.HELD_START_DATE ? -1 : 1;
      });
    } else {
      // それ以外は公開日順に並び替え
      _filterData.sort((a: Media, b: Media) => {
        // 公開日が同じ場合は、掲載開始日を合わせてUnixTimeで比較
        if (a.PUBLISH_DATE === b.PUBLISH_DATE) {
          const a_unixTime =
            new Date(a.PUBLISH_DATE).getTime() +
            new Date(a.START_DATE).getTime() / 100;
          const b_unixTime =
            new Date(b.PUBLISH_DATE).getTime() +
            new Date(b.START_DATE).getTime() / 100;
          return a_unixTime > b_unixTime ? -1 : 1;
        }
        return a.PUBLISH_DATE > b.PUBLISH_DATE ? -1 : 1;
      });
    }

    // console.log('filterData:', _filterData);
    this.filterData = _filterData;
  }
  /**
   * 開催日のセレクトボックスを初期化
   * @param {FilterOption} option - フィルターオプション
   * @return {void}
   */
  private initDateSelect(option: FilterOption) {
    // データがないかつ、filterOptionのdateとkeywordsが空の場合は非表示にする
    if (
      this.filterData.length === 0 &&
      option.date === '' &&
      option.keywords.length === 0
    ) {
      document
        .querySelector('.c-searchTool')
        ?.setAttribute('style', 'display:none');
    } else {
      document.querySelector('.c-searchTool')?.removeAttribute('style');
    }
    // --- 年フィルターを初期化 --- //
    // 表示エリア
    const ySelect = document.querySelector(
      '[data-js-search-sort="year"] select'
    ) as HTMLElement;
    // ySelectのoptionにvalueがある場合は削除
    while (ySelect.firstChild) {
      ySelect.removeChild(ySelect.firstChild);
    }
    if (this.filterOption.lang === 'ja') {
      ySelect.insertAdjacentHTML(
        'beforeend',
        '<option value="">掲載年</option>'
      );
      this.yearList.forEach((year: string) => {
        let dateItem = '';
        // yearListをループしてoption要素を生成
        if (option.date.includes(year)) {
          dateItem = `<option value="${year}" selected>${year}年</option>`;
        } else {
          dateItem = `<option value="${year}">${year}年</option>`;
        }
        ySelect.insertAdjacentHTML('beforeend', dateItem);
      });
    } else {
      ySelect.insertAdjacentHTML(
        'beforeend',
        '<option value="">Archives</option>'
      );
      this.yearList.forEach((year: string) => {
        let dateItem = '';
        // yearListをループしてoption要素を生成
        if (option.date.includes(year)) {
          dateItem = `<option value="${year}" selected>${year}</option>`;
        } else {
          dateItem = `<option value="${year}">${year}</option>`;
        }
        ySelect.insertAdjacentHTML('beforeend', dateItem);
      });
    }

    // --- 年月フィルターを初期化 --- //
    // 表示エリア
    const ymSelect = document.querySelector(
      '[data-js-search-sort="eventMonth"] select'
    ) as HTMLElement;
    // ymSelectのoptionにvalueがある場合は削除
    while (ymSelect.firstChild) {
      ymSelect.removeChild(ymSelect.firstChild);
    }

    if (this.filterOption.lang === 'ja') {
      ymSelect.insertAdjacentHTML(
        'beforeend',
        '<option value="">開催日</option>'
      );
    } else {
      ymSelect.insertAdjacentHTML(
        'beforeend',
        '<option value="">Date</option>'
      );
    }
    this.yearList.forEach((year: string) => {
      let dateItem = '';
      if (this.filterOption.lang === 'ja') {
        const yearStr = year.split('-')[0];
        let monthStr = year.split('-')[1];
        // monthStrが0から始まる場合は0を削除
        if (monthStr) monthStr = monthStr.replace(/^0+/, '');
        if (option.date.includes(year)) {
          dateItem = `<option value="${year}" selected>${yearStr}年${monthStr}月</option>`;
        } else {
          dateItem = `<option value="${year}">${yearStr}年${monthStr}月</option>`;
        }
        ymSelect.insertAdjacentHTML('beforeend', dateItem);
      } else {
        // 英語表記に変換
        const convert = this._convertDate(new Date(year));
        // 月を取得
        // const monthStr = convert.substring(5, 9);
        // const yearStr = year.slice(0, 4);
        if (option.date.includes(year)) {
          dateItem = `<option value="${year}" selected>${convert.month} ${convert.year}</option>`;
        } else {
          dateItem = `<option value="${year}">${convert.month} ${convert.year}</option>`;
        }
        ymSelect.insertAdjacentHTML('beforeend', dateItem);
      }
    });
  }
  /**
   * タグリストを初期化
   * @param {FilterOption} option - フィルターオプション
   */
  private initTagList(option: FilterOption) {
    // // データがない場合は処理を中断
    // if (this.filterData.length === 0) return;

    let dataTagList: Array<Tag> = [];
    let keywordList: string = '';
    // キーワードとその他タグのリストを取得
    this.forTagsData.forEach((data: Media) => {
      // data.KEYWORDSをカンマ区切りで結合
      if (data.KEYWORDS !== null) keywordList += data.KEYWORDS + ',';
    });
    dataTagList = this._getTagList(keywordList);

    // タブと一致するタグは削除する
    dataTagList = dataTagList.filter((tag: Tag) => {
      return tag.TAG_ID !== option.tab;
    });

    // 表示エリア
    const tagArea = document.querySelector('[data-js-taglist]') as HTMLElement;
    // テンプレートを取得
    const template = tagArea.querySelector('template') as HTMLTemplateElement;
    // タグアイテムをすべて削除して初期化
    const tagItems = tagArea.querySelectorAll('label');
    tagItems.forEach((item) => {
      item.remove();
    });

    // 配列をループしてタグリストを生成
    dataTagList.forEach((tag: Tag) => {
      // テンプレートを複製
      const clone = template.content.cloneNode(true) as HTMLElement;
      const label = clone.querySelector('label') as HTMLElement;
      // --- 複製したテンプレートにデータを挿入 --- //
      // label要素を生成
      label.append(tag.TAG_NAME);
      label.setAttribute('data-js-tag-id', tag.TAG_ID);
      // フィルターオプションに一致するタグをアクティブにする
      if (option.keywords.includes(tag.TAG_ID)) {
        label.querySelector('input')?.setAttribute('checked', 'checked');
      }
      // 表示エリアの子要素として追加
      tagArea.appendChild(clone);
    });
  }
  //-------------------------------------------------
  // Event Methods
  //-------------------------------------------------
  private addEvent() {
    document.addEventListener('click', (event) => {
      const target = event.target as HTMLElement;
      // --- タブ切り替え --- //
      if (target.closest('[data-js-media-tab] button')) {
        // URLパラメータをすべて削除
        const url = new URL(window.location.href); // URLを取得
        history.replaceState(null, '', url.pathname); // URLからクエリパラメータを削除
        // URLパラメータを更新
        const tabID = target.dataset.jsTabTrigger;
        if (tabID) {
          this.updateURLParams('tab', tabID);
          if (tabID === '29') {
            this.displayType = 'eventAll';
          } else {
            this.displayType = 'mediaAll';
          }
        }
        // 初期化実行
        this.initSetup(this.filterOption);
      }
      // --- 表示形式の切り替え --- //
      if (target.closest('[data-js-display-type]')) {
        event.preventDefault();
        const displayType = target.dataset.jsDisplayType;
        displayType === 'all'
          ? (this.displayType = 'eventAll')
          : (this.displayType = 'eventMonth');

        // 日付のパラメータをリセット
        this.updateURLParams('date', '');

        // 初期化実行
        this.initSetup(this.filterOption);
      }
      // --- タグフィルター --- //
      if (target.closest('[data-js-taglist] input')) {
        // data-js-taglistで選択されたタグを取得
        const checkedTags = document.querySelectorAll(
          '[data-js-taglist] input:checked'
        );
        // 選択されたタグを配列に格納
        const keywords: string[] = [];
        checkedTags.forEach((tag) => {
          const tagID = tag.closest('label')?.dataset.jsTagId;
          if (tagID) keywords.push(tagID);
        });
        // URLパラメータを更新
        this.updateURLParams('keywords', keywords);
        // ページ番号をリセット
        this.updateURLParams('page', '');
        // 初期化実行
        this.initSetup(this.filterOption);
      }
      // --- ページボタン --- //
      if (target.closest('[data-js-pagebtn]')) {
        event.preventDefault();
        const page = target.dataset.jsPagebtn;
        const lastPage = Math.ceil(this.filterData.length / this.displayNum);
        switch (page) {
          case 'first':
            this.filterOption.page = 1;
            // 前へボタンを非活性にする
            document
              .querySelector('[data-js-pagebtn="prev"]')
              ?.setAttribute('disabled', 'disabled');
            break;
          case 'prev':
            this.filterOption.page -= 1;
            break;
          case 'next':
            this.filterOption.page += 1;
            break;
          case 'last':
            this.filterOption.page = lastPage;
            break;
          default:
            break;
        }

        // URLパラメータを更新
        this.updateURLParams('page', this.filterOption.page);
        // 初期化実行
        this.initSetup(this.filterOption);
      }
      // --- イベント表示月切り替えボタン --- //
      if (target.closest('[data-js-month-select]')) {
        const selectedMonth = target.dataset.jsMonthSelect;
        const currentIndex = this.yearList.indexOf(this.filterOption.date);
        let selectedDate = '';
        if (selectedMonth === 'prev') {
          selectedDate = this.yearList[currentIndex + 1];
        } else {
          selectedDate = this.yearList[currentIndex - 1];
        }
        // URLパラメータを更新
        this.updateURLParams('date', selectedDate);
        // ページ番号をリセット
        this.updateURLParams('page', '');
        // 初期化実行
        this.initSetup(this.filterOption);
      }
    });
    document.addEventListener('change', (event) => {
      const target = event.target as HTMLElement;
      // --- 年を選択 --- //
      if (target.closest('[data-js-dateselect]')) {
        const selectedItem = target.querySelector('option:checked');
        const selectedDate = selectedItem?.getAttribute('value');
        // URLパラメータを更新
        this.updateURLParams('date', selectedDate);
        // タグの絞り込みはリセット
        this.updateURLParams('keywords', []);
        // ページ番号をリセット
        this.updateURLParams('page', '');
        // 初期化実行
        this.initSetup(this.filterOption);
      }
      // --- ページネーション --- //
      if (target.closest('[data-js-pagination="default"] select')) {
        const selectedItem = document.querySelector(
          '[data-js-pagination="default"] select option:checked'
        );
        const selectedPageNum = selectedItem?.getAttribute('value');
        // URLパラメータを更新
        this.updateURLParams('page', selectedPageNum);
        // 初期化実行
        this.initSetup(this.filterOption);
      }
    });
  }
  //-------------------------------------------------
  // Update Methods
  //-------------------------------------------------
  /**
   * URLパラメータ更新
   */
  private updateURLParams(target: string, data: any) {
    // URLのパラメーターを更新
    const urlSearchParams = new URLSearchParams(window.location.search);
    switch (target) {
      case 'tab':
        urlSearchParams.set('tab', data);
        break;
      case 'keywords':
        urlSearchParams.delete('keywords[]');
        data.forEach((keyword: string) => {
          urlSearchParams.append('keywords[]', keyword);
        });
        break;
      case 'date':
        data !== ''
          ? urlSearchParams.set('date', data)
          : urlSearchParams.delete('date');
        break;
      case 'page':
        data !== ''
          ? urlSearchParams.set('page', data)
          : urlSearchParams.delete('page');
        break;
    }
    history.replaceState('', '', `?${urlSearchParams.toString()}`);
  }
  /**
   * コンテンツを生成
   */
  private createContents() {
    // contentsAreaの子要素を全て削除して初期化
    while (this.contentsArea?.firstChild) {
      this.contentsArea.removeChild(this.contentsArea.firstChild);
    }

    if (this.displayType === 'eventMonth') {
      this.contentsArea = document.querySelector(
        '[data-js-entrylist]'
      ) as HTMLElement;
    } else {
      this.contentsArea = document.querySelector('[data-js-card-grid]');
    }

    // this.filterDataを6件ずつに分割
    const splitData = this._arraySplit(this.filterData, this.displayNum);
    // 現在のページのデータを取得
    const currentPageData = splitData[this.filterOption.page - 1];

    const messageText =
      this.filterOption.lang === 'ja'
        ? '該当するニュース・イベントがありません。'
        : 'There are no relevant news or events.';
    const concatStr = this.filterOption.lang === 'ja' ? '〜' : ' - ';

    if (currentPageData === undefined) {
      // データがない場合はメッセージを表示
      const messageElem = document.querySelector('[data-js-message]');
      if (!messageElem) {
        this.contentsArea?.insertAdjacentHTML(
          'beforebegin',
          `<p class="c-paragraph" data-js-message>${messageText}</p>`
        );
      }
      // ここで処理を中断する
      return false;
    } else {
      // 0件メッセージを削除する
      const messageElem = document.querySelector('[data-js-message]');
      if (messageElem) messageElem.remove();
    }

    if (this.displayType === 'eventMonth') {
      // 表示エリア
      // this.contentsArea = document.querySelector(
      //   '[data-js-entrylist]'
      // ) as HTMLElement;
      // テンプレートを取得
      const template = document.querySelector(
        '#template-eventCard'
      ) as HTMLTemplateElement;

      // currentPageDataをループさせてコンテンツを生成
      currentPageData.forEach((data: Media) => {
        // テンプレートを複製
        const clone: any = template.content.cloneNode(true);
        // 開始日の文字列を取得
        const startDate = this._convertDate(new Date(data.HELD_START_DATE));
        // 終了日の文字列を取得
        const endDate = this._convertDate(new Date(data.HELD_END_DATE));

        /*
         * 複製したテンプレートにデータを挿入
         */
        // リンク先
        clone
          .querySelector('.c-entryList__link')
          .setAttribute(
            'href',
            `/${this.filterOption.lang}/news/${data.MEDIA_CD}`
          );
        // タイトル
        clone.querySelector('.c-entryList__title').innerText = data.TITLE;

        // 開催開始・終了日
        if (this.filterOption.lang === 'ja') {
          clone
            .querySelector('.c-entryList__schedule')
            .insertAdjacentHTML(
              'beforeend',
              `<time class="c-entryList__scheduleStart" datetime="${data.HELD_START_DATE}"><span class="c-entryList__scheduleYear">${startDate.year}年</span>${startDate.month}月${startDate.day}日${startDate.week}</time>`
            );
        } else {
          clone
            .querySelector('.c-entryList__schedule')
            .insertAdjacentHTML(
              'beforeend',
              `<time class="c-entryList__scheduleStart" datetime="${data.HELD_START_DATE}">${startDate.week}, ${startDate.month} ${startDate.day}<span class="c-entryList__scheduleYear">${startDate.year}</span></time>`
            );
        }

        let startDateString = '';
        let endDateString = '';
        if (this.filterOption.lang === 'ja') {
          startDateString = `${startDate.year}年${startDate.month}月${startDate.day}日${startDate.week}`;
          endDateString = `${endDate.year}年${endDate.month}月${endDate.day}日${endDate.week}`;
        } else {
          startDateString = `${startDate.week}, ${startDate.month} ${startDate.day}, ${startDate.year}`;
          endDateString = `${endDate.week}, ${endDate.month} ${endDate.day}, ${endDate.year}`;
        }
        if (
          data.HELD_END_DATE !== null &&
          data.HELD_END_DATE !== data.HELD_START_DATE
        ) {
          if (this.filterOption.lang === 'ja') {
            clone
              .querySelector('.c-entryList__schedule')
              .insertAdjacentHTML(
                'beforeend',
                `<time class="c-entryList__scheduleEnd" datetime="${data.HELD_END_DATE}"><span class="c-entryList__scheduleYear">${endDate.year}年</span>${endDate.month}月${endDate.day}日${endDate.week}</time>`
              );
          } else {
            clone
              .querySelector('.c-entryList__schedule')
              .insertAdjacentHTML(
                'beforeend',
                `<time class="c-entryList__scheduleEnd" datetime="${data.HELD_END_DATE}">${endDate.week}, ${endDate.month} ${endDate.day}<span class="c-entryList__scheduleYear">${endDate.year}</span></time>`
              );
          }
          clone
            .querySelector('.c-entryList__period')
            .insertAdjacentHTML(
              'beforeend',
              `<time class="c-entryList__periodStart" datetime="${data.HELD_START_DATE}">${startDateString}</time>${concatStr}<time class="c-entryList__periodEnd" datetime="${data.HELD_END_DATE}">${endDateString}</time>`
            );
        } else {
          clone
            .querySelector('.c-entryList__period')
            .insertAdjacentHTML(
              'beforeend',
              `<time class="c-entryList__periodStart" datetime="${data.HELD_START_DATE}">${startDateString}</time>`
            );
        }

        // 開催時間
        if (data.HELD_START_TIME === null && data.HELD_END_TIME === null) {
          // 要素を削除
          clone.querySelector('.c-entryList__time').remove();
        } else {
          if (data.HELD_START_TIME !== null) {
            clone
              .querySelector('.c-entryList__time')
              .insertAdjacentHTML(
                'beforeend',
                `<time class="c-entryList__timeStart" datetime="${data.HELD_START_TIME}">${data.HELD_START_TIME}${concatStr}</time>`
              );
          }
          if (data.HELD_END_TIME !== null) {
            clone
              .querySelector('.c-entryList__time')
              .insertAdjacentHTML(
                'beforeend',
                `<time class="c-entryList__timeEnd" datetime="${data.HELD_END_TIME}">${data.HELD_END_TIME}</time>`
              );
          }
        }
        // 開催場所
        clone
          .querySelector('.c-entryList__venue')
          .insertAdjacentHTML('beforeend', `${data.VENUE}`);
        // サムネイル画像
        clone
          .querySelector('.c-entryList__image img')
          .setAttribute('src', data.THUMBNAIL);
        // キーワードとメディアタイプを結合して表示
        const tagList = this._getTagList(
          data.KEYWORDS + ',' + data.MEDIA_TYPES
        );
        tagList.forEach((tag: Tag) => {
          const tagElement = `<span class="c-label"><span class="c-label__text">${tag.TAG_NAME}</span></span>`;
          clone
            .querySelector('.c-entryList__tags')
            .insertAdjacentHTML('beforeend', tagElement);
        });

        this.contentsArea?.appendChild(clone);
      });
    } else if (this.displayType === 'eventAll') {
      // 表示エリア
      // this.contentsArea = this.contentsArea?.firstElementChild as HTMLElement;
      // this.contentsArea = document.querySelector('[data-js-card-grid]');
      // テンプレートを取得
      const template = document.querySelector(
        '#template-eventTile'
      ) as HTMLTemplateElement;

      // currentPageDataをループさせてコンテンツを生成
      currentPageData.forEach((data: Media) => {
        // テンプレートを複製
        const clone: any = template.content.cloneNode(true);
        // 開始日の文字列を取得
        const startDate = this._convertDate(new Date(data.HELD_START_DATE));
        // 終了日の文字列を取得
        const endDate = this._convertDate(new Date(data.HELD_END_DATE));
        // 出力用の日付文字列を生成
        let startDateStr: string = '';
        let endDateStr: string = '';
        if (this.filterOption.lang === 'ja') {
          startDateStr = `${startDate.year}年${startDate.month}月${startDate.day}日${startDate.week}`;
          endDateStr = `${endDate.year}年${endDate.month}月${endDate.day}日${endDate.week}`;
        } else {
          startDateStr = `${startDate.week}, ${startDate.month} ${startDate.day}, ${startDate.year}`;
          endDateStr = `${endDate.week}, ${endDate.month} ${endDate.day}, ${endDate.year}`;
        }
        /*
         * 複製したテンプレートにデータを挿入
         */
        // リンク先
        clone
          .querySelector('.c-card')
          .setAttribute(
            'href',
            `/${this.filterOption.lang}/news/${data.MEDIA_CD}`
          );
        // タイトル
        clone.querySelector('.c-card__titleLabel').innerText = data.TITLE;
        // リード文
        clone.querySelector('.c-card__text').innerText = data.READ_COPY;

        // 開催開始・終了日
        if (
          data.HELD_END_DATE !== '' &&
          data.HELD_END_DATE !== data.HELD_START_DATE
        ) {
          clone
            .querySelector('.c-card__date')
            .insertAdjacentHTML(
              'beforeend',
              `<time class="c-card__dateStart" datetime="${data.HELD_START_DATE}">${startDateStr}</time>${concatStr}<time class="c-card__dateEnd" datetime="${data.HELD_END_DATE}">${endDateStr}</time>`
            );
        } else {
          clone
            .querySelector('.c-card__date')
            .insertAdjacentHTML(
              'beforeend',
              `<time class="c-card__dateStart" datetime="${data.HELD_START_DATE}">${startDateStr}</time>`
            );
        }
        // 開催時間
        if (data.HELD_START_TIME === null && data.HELD_END_TIME === null) {
          // 要素を削除
          clone.querySelector('.c-card__time').remove();
        } else {
          if (data.HELD_START_TIME !== null) {
            clone
              .querySelector('.c-card__time')
              .insertAdjacentHTML(
                'beforeend',
                `${data.HELD_START_TIME}${concatStr}`
              );
          }
          if (data.HELD_END_TIME !== null) {
            clone
              .querySelector('.c-card__time')
              .insertAdjacentHTML('beforeend', `${data.HELD_END_TIME}`);
          }
        }
        // 開催場所
        if (data.VENUE === null) {
          // 要素を削除
          clone.querySelector('.c-card__place').remove();
        } else {
          clone
            .querySelector('.c-card__place')
            .insertAdjacentHTML('beforeend', `${data.VENUE}`);
        }
        // サムネイル画像
        clone
          .querySelector('.c-card__image img')
          .setAttribute('src', data.THUMBNAIL);
        // キーワードとメディアタイプを結合して表示
        const tagList = this._getTagList(
          data.KEYWORDS + ',' + data.MEDIA_TYPES
        );
        tagList.forEach((tag: Tag) => {
          const tagElement = `<span class="c-label"><span class="c-label__text">${tag.TAG_NAME}</span></span>`;
          clone
            .querySelector('.c-card__tag')
            .insertAdjacentHTML('beforeend', tagElement);
        });

        this.contentsArea?.appendChild(clone);
      });
    } else {
      // 表示エリア
      // this.contentsArea = this.contentsArea?.firstElementChild as HTMLElement;
      // テンプレートを取得
      const template = document.querySelector(
        '#template-mediaTile'
      ) as HTMLTemplateElement;

      // currentPageDataをループさせてコンテンツを生成
      currentPageData.forEach((data: Media) => {
        // テンプレートを複製
        const clone: any = template.content.cloneNode(true);
        // 投稿日の文字列を取得
        const publishDateString = this._convertDate(
          new Date(data.PUBLISH_DATE)
        );
        /*
         * 複製したテンプレートにデータを挿入
         */
        // リンク先
        clone
          .querySelector('.c-card')
          .setAttribute(
            'href',
            `/${this.filterOption.lang}/news/${data.MEDIA_CD}`
          );
        // タイトル
        clone.querySelector('.c-card__titleLabel').innerText = data.TITLE;
        // 公開日
        if (this.filterOption.lang === 'ja') {
          clone.querySelector('.c-card__date').insertAdjacentHTML(
            'beforeend',
            `<time class="c-card__dateStart" datetime="${data.PUBLISH_DATE}">
                <span class="c-card__dateStartYear">${publishDateString.year}年</span>${publishDateString.month}月${publishDateString.day}日
              </time>`
          );
        } else {
          clone.querySelector('.c-card__date').insertAdjacentHTML(
            'beforeend',
            `<time class="c-card__dateStart" datetime="${data.PUBLISH_DATE}">${publishDateString.month} ${publishDateString.day}, <span class="c-card__dateStartYear">${publishDateString.year}</span>
              </time>`
          );
        }
        // キーワードとメディアタイプを結合して表示
        const tagList = this._getTagList(
          data.KEYWORDS + ',' + data.MEDIA_TYPES
        );
        tagList.forEach((tag: Tag) => {
          const tagElement = `<span class="c-label"><span class="c-label__text">${tag.TAG_NAME}</span></span>`;
          clone
            .querySelector('.c-card__tag')
            .insertAdjacentHTML('beforeend', tagElement);
        });
        // サムネイル画像
        clone
          .querySelector('.c-card__image img')
          .setAttribute('src', data.THUMBNAIL);

        this.contentsArea?.appendChild(clone);
      });
    }

    // スクロール位置をトップに移動
    window.scroll(0, 0);
  }
  /**
   * ページネーションを生成
   */
  private createPagination() {
    if (this.displayType === 'eventMonth') {
      // 表示エリア
      const paginationDefault = document.querySelector(
        '[data-js-pagination="default"]'
      ) as HTMLElement;
      // 通常のページネーションは非表示
      paginationDefault.style.display = 'none';

      const paginationArea = document.querySelector(
        '[data-js-pagination="month"]'
      ) as HTMLElement;

      // データがない場合、もしくはページ数が1ページ以下の場合はページネーションを表示しない
      if (this.filterData.length === 0) {
        paginationArea.style.display = 'none';
        return false;
      } else {
        paginationArea.style.display = '';
      }

      // 日付指定がない場合はページネーションを非表示
      if (this.filterOption.date === '') {
        paginationArea.style.display = 'none';
      } else {
        // 日付指定があればページネーションを表示＆初期化
        paginationArea.style.display = '';

        const currentDate = paginationArea.querySelector(
          '[data-js-current-month]'
        ) as HTMLElement;
        const prevDate = paginationArea.querySelector(
          '[data-js-month-select="prev"]'
        ) as HTMLElement;
        const prevDateText = prevDate.querySelector('span') as HTMLElement;
        const nextDate = paginationArea.querySelector(
          '[data-js-month-select="next"]'
        ) as HTMLElement;
        const nextDateText = nextDate.querySelector('span') as HTMLElement;

        const index = this.yearList.indexOf(this.filterOption.date);

        const currentDateStr = this._convertDate(
          new Date(this.filterOption.date)
        );
        if (this.filterOption.lang === 'ja') {
          currentDate.innerText = `${currentDateStr.year}年${currentDateStr.month}月`;
        } else {
          currentDate.innerText = `${currentDateStr.month} ${currentDateStr.year}`;
        }

        prevDate.classList.add('is-hidden');
        nextDate.classList.add('is-hidden');

        // 前月ボタンの処理
        if (index !== this.yearList.length - 1) {
          prevDate.classList.remove('is-hidden');

          const prevDateStr = this._convertDate(
            new Date(this.yearList[index + 1])
          );
          if (this.filterOption.lang === 'ja') {
            if (prevDateText !== null) {
              // 要素にテキストを挿入
              prevDateText.innerText = `${prevDateStr.year}年${prevDateStr.month}月`;
            } else {
              prevDate.insertAdjacentHTML(
                'beforeend',
                `<span>${prevDateStr.year}年${prevDateStr.month}月</span>`
              );
            }
          } else {
            if (prevDateText !== null) {
              prevDateText.innerText = `${prevDateStr.month} ${prevDateStr.year}`;
            } else {
              prevDate.insertAdjacentHTML(
                'beforeend',
                `<span>${prevDateStr.month} ${prevDateStr.year}</span>`
              );
            }
          }
        }
        let nextSplitDate,
          nextSplitYear,
          nextSplitMonth = '';
        // 次月ボタンの処理
        if (index !== 0) {
          nextDate.classList.remove('is-hidden');

          const nextDateStr = this._convertDate(
            new Date(this.yearList[index - 1])
          );
          if (this.filterOption.lang === 'ja') {
            if (nextDateText !== null) {
              // 要素にテキストを挿入
              nextDateText.innerText = `${nextDateStr.year}年${nextDateStr.month}月`;
            } else {
              nextDate.insertAdjacentHTML(
                'afterbegin',
                `<span>${nextDateStr.year}年${nextDateStr.month}月</span>`
              );
            }
          } else {
            if (nextDateText !== null) {
              nextDateText.innerText = `${nextDateStr.month} ${nextDateStr.year}`;
            } else {
              nextDate.insertAdjacentHTML(
                'afterbegin',
                `<span>${nextDateStr.month} ${nextDateStr.year}</span>`
              );
            }
          }
        }
      }
    } else {
      // 月切り替えのページネーションは非表示
      const paginationMonth = document.querySelector(
        '[data-js-pagination="month"]'
      ) as HTMLElement;
      paginationMonth.style.display = 'none';

      // 表示エリア
      const paginationArea = document.querySelector(
        '[data-js-pagination="default"]'
      ) as HTMLElement;
      const pageSelect = paginationArea.querySelector('select') as HTMLElement;
      // ページ数を取得
      const pageCount = Math.ceil(this.filterData.length / this.displayNum);

      // データがない場合、もしくはページ数が1ページ以下の場合はページネーションを表示しない
      if (this.filterData.length === 0 || pageCount === 1) {
        paginationArea.style.display = 'none';
      } else {
        paginationArea.style.display = '';
      }

      // ページネーションを初期化
      while (pageSelect.firstChild) {
        pageSelect.removeChild(pageSelect.firstChild);
      }

      // ページ数分のボタンを生成
      for (let i = 1; i <= pageCount; i++) {
        // 表示エリアの子要素として追加
        if (i === this.filterOption.page) {
          // カレントページをアクティブにする
          pageSelect.insertAdjacentHTML(
            'beforeend',
            `<option value="${i}" aria-selected="true" selected>${i} / ${pageCount}</option>`
          );
        } else {
          pageSelect.insertAdjacentHTML(
            'beforeend',
            `<option value="${i}">${i} / ${pageCount}</option>`
          );
        }
      }
      // 左右ボタンのスタイル制御
      const paginationButtons = document.querySelectorAll('[data-js-pagebtn]');
      paginationButtons.forEach((button) => {
        const buttonID = button.getAttribute('data-js-pagebtn');
        if (
          this.filterOption.page === 1 &&
          (buttonID === 'first' || buttonID === 'prev')
        ) {
          button.setAttribute('disabled', 'disabled');
        } else if (
          this.filterOption.page === pageCount &&
          (buttonID === 'next' || buttonID === 'last')
        ) {
          button.setAttribute('disabled', 'disabled');
        } else {
          button.removeAttribute('disabled');
        }
      });
    }
  }
  //-------------------------------------------------
  // Utility Methods
  //-------------------------------------------------
  /**
   * エスケープされたHTML文字列を元に戻す処理
   * @param {string} str - エスケープされた文字列
   * @return {string} - 元の文字列
   */
  private _unescapeHtml(str: string) {
    if (typeof str !== 'string') return str;

    const patterns: any = {
      '&lt;': '<',
      '&gt;': '>',
      '&amp;': '&',
      '&quot;': '"',
      '&#x27;': "'",
      '&#x60;': '`'
    };

    return str.replace(/&(lt|gt|amp|quot|#x27|#x60);/g, (match: string) => {
      return patterns[match];
    });
  }
  /**
   * タグマスタとマッチングさせてタグ名の配列を返す
   * @param {string} keywords - キーワードIDの文字列
   * @param {string} tags - タグIDの文字列
   * @return {string[]} - タグ名の配列
   */
  private _getTagList(keywords: string) {
    const self = this;
    let dataTagList: string[] = [];
    let tagObject: Tag[] = [];
    // --- 引数が文字列の場合 --- //
    if (typeof keywords === 'string' && keywords !== null) {
      // keywordsのダブルクォーテーションを削除
      keywords = keywords.replace(/"/g, '');
      dataTagList = dataTagList.concat(keywords.split(','));
    }

    if (dataTagList.length !== 0) {
      // 空の要素を削除
      dataTagList = dataTagList.filter((tag) => tag !== '');
      // 重複を削除する
      dataTagList = Array.from(new Set(dataTagList));
      // タグマスタからキーが一致するデータのみを抽出
      dataTagList.forEach((tag: any) => {
        if (self.tagMaster[tag]) tagObject.push(self.tagMaster[tag]);
      });
      // tagObjectをSORT_NOの昇順でソート
      tagObject.sort((a: any, b: any) => {
        return a.SORT_NO - b.SORT_NO;
      });
    }

    return tagObject;
  }
  /**
   * 要素のアクティブ状態を切り替える処理
   * @param {NodeListOf<HTMLElement> | null} allElement - 全ての要素
   * @param {HTMLElement} target - クリックされた要素
   */
  private _buttonActiveChange(
    allElement: NodeListOf<HTMLElement> | null,
    target: HTMLElement
  ) {
    // リセット処理
    if (allElement) {
      allElement.forEach((element) => {
        if (element !== target) {
          element.classList.remove('is-active');
          element.removeAttribute('aria-selected');
        }
      });
    }
    // target要素をアクティブにする処理
    target.classList.add('is-active');
    target.setAttribute('aria-selected', 'true');
  }
  /**
   * 配列をn件ずつ分割する処理
   * @param {Array} array - 分割したい配列
   * @param {Number} split_num - 分割する数字
   * @return {Array} - 分割された配列
   */
  private _arraySplit(array: any[], split_num: number) {
    const length = Math.ceil(array.length / split_num);
    return new Array(length)
      .fill(null)
      .map((_, i) => array.slice(i * split_num, (i + 1) * split_num));
  }
  /**
   * date型を年月日に変換する処理
   * @param {Date} date - date型のデータ
   * @return {Object} - 日付情報のオブジェクト
   */
  private _convertDate(date: Date) {
    // （例 Monday, Mar 27, 2021）
    const year = date.getFullYear();
    const day = date.getDate();
    let month: string | number = date.getMonth();
    const weekNum = date.getDay();
    let weekDay = '';
    if (this.filterOption.lang === 'ja') {
      month = month + 1;
      const week = ['日', '月', '火', '水', '木', '金', '土'];
      weekDay = `（${week[weekNum]}）`;
      // return `${year}年${month + 1}月${day}日（${weekDay}）`;
    } else {
      // 月の英語配列
      const monthList = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December'
      ];
      month = monthList[month];
      const week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      weekDay = week[weekNum];
      // return `${weekDay}, ${monthList[month]} ${day} ${year}`;
    }
    return { year: year, month: month, day: day, week: weekDay };
  }
}
