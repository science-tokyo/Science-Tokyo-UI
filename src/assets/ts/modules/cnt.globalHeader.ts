// cnt.globalHeader.ts
export default class GlobalHeader {
  element: HTMLElement;
  hiddenClass: string;
  activeClass: string;
  menuOpenClass: string;
  //-------------------------------------------------
  // Parameters
  //-------------------------------------------------
  constructor(element: HTMLElement) {
    // 対象要素
    this.element = element;
    // 初期化
    this.init();

    // Hidden ClassName
    this.hiddenClass = 'is-hidden';
    // Active ClassName
    this.activeClass = 'is-active';
    // Menu Open ClassName
    this.menuOpenClass = 'is-menuOpen';
  }
  //-------------------------------------------------
  // Methods
  //-------------------------------------------------
  private init() {
    // スクロールに伴う処理
    this.scrollEvent();
    // 検索ポップアップの処理
    this.searchPopup();
    // グローバルナビの表示切り替え
    this.toggleGlobalNav();
  }
  /**
   * スクロールに伴う処理
   */
  private scrollEvent() {
    // スクロール位置の記憶
    let lastScrollY = 0;
    // ページトップへ戻るボタン
    const pageTopBtn = document.querySelector('[data-js-pagetop]');
    /**
     * スクロールイベント
     */
    window.addEventListener('scroll', () => {
      // スクロール量
      const scrollY = window.scrollY;
      // ヘッダーの高さ
      const headerHeight = this.element.clientHeight;
      // スクロールの方向を判定
      const scrollDirection = lastScrollY < scrollY ? 'down' : 'up';
      if (scrollDirection === 'down') {
        // スクロール量がヘッダーの高さを超えたら
        if (
          scrollY > headerHeight &&
          !this.element.classList.contains(this.menuOpenClass)
        ) {
          // ヘッダーを隠す
          this.element.classList.add(this.hiddenClass);
          // ページトップへ戻るボタンを表示
          pageTopBtn?.classList.add(this.activeClass);
        }
      } else {
        // ヘッダーを表示する
        this.element.classList.remove(this.hiddenClass);
        // スクロールがヘッダー位置に戻ったら
        if (scrollY < headerHeight) {
          // ページトップへ戻るボタンを隠す
          pageTopBtn?.classList.remove(this.activeClass);
        }
      }
      // スクロール位置を更新
      lastScrollY = scrollY;
    });
  }
  /**
   * 検索ポップアップの処理
   */
  private searchPopup() {
    // 検索ボタン
    const searchBtn = this.element.querySelector('[data-js-search]');
    if (searchBtn) {
      // 操作対象のIDを取得
      const targetId = searchBtn?.getAttribute('aria-controls');
      // ポップアップ要素を取得
      const searchPopup = document.querySelector(`#${targetId}`);
      // 検索ボタンをクリックでポップアップの表示切り替え
      searchBtn.addEventListener('click', () => {
        searchPopup?.classList.toggle(this.activeClass);

        searchPopup?.classList.contains(this.activeClass)
          ? searchBtn.setAttribute('aria-expanded', 'true')
          : searchBtn.setAttribute('aria-expanded', 'false');
      });

      // 閉じるボタン
      const closeBtn = this.element.querySelector('[data-js-search-close]');
      closeBtn?.addEventListener('click', () => {
        searchPopup?.classList.remove(this.activeClass);
        searchBtn.setAttribute('aria-expanded', 'false');
      });
    }
  }
  /**
   * グローバルナビの表示切り替え
   */
  private toggleGlobalNav() {
    // メニューボタン
    const menuBtn = this.element.querySelector('[data-js-menubtn]');
    if (menuBtn) {
      // ナビボタンをクリックでナビの表示切り替え
      menuBtn.addEventListener('click', () => {
        this.element.classList.toggle(this.menuOpenClass);
        // メニューを開く
        if (this.element.classList.contains(this.menuOpenClass)) {
          buttonControl(menuBtn, 'open');
          // スクロール禁止
          noScrolling(true);
        } else {
          // メニューを閉じる
          buttonControl(menuBtn, 'close');
          // スクロール禁止解除
          noScrolling(false);
        }
      });
    }

    const buttonControl = (button: Element, status: String) => {
      let buttonLabel = button.querySelector('.label');
      if (status === 'open') {
        button.setAttribute('aria-expanded', 'true');
        if (buttonLabel) buttonLabel.textContent = 'Close';
      } else {
        button.setAttribute('aria-expanded', 'false');
        if (buttonLabel) buttonLabel.textContent = 'Menu';
      }
    };

    const noScrolling = (status: Boolean) => {
      if (status) {
        document.body.style.overflow = 'hidden';
        document.querySelector('main')?.setAttribute('inert', '');
        document.querySelector('footer')?.setAttribute('inert', '');
      } else {
        document.body.style.overflow = '';
        document.querySelector('main')?.removeAttribute('inert');
        document.querySelector('footer')?.removeAttribute('inert');
      }
    };
  }
}
