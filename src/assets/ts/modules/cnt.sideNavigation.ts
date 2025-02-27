// cnt.sideNavigation.ts
export default class SideNavigation {
  element: HTMLElement;
  button: HTMLElement | null;
  menu: HTMLElement | null;
  menuDuration: number = 200;
  animateOptions: any;
  openClass: string = 'is-open';
  menuOpenFlag: boolean = false;
  //-------------------------------------------------
  // Parameters
  //-------------------------------------------------
  constructor(element: HTMLElement) {
    // 対象要素
    this.element = element;
    // トリガーボタン要素
    this.button = this.element.querySelector('[data-js-sidenav-btn]');
    // メニューエリア
    this.menu = this.element.querySelector('#sidenav');
    // アニメーションオプション
    this.animateOptions = {
      easing: 'ease-out',
      duration: this.menuDuration,
      fill: 'forwards'
    };
    // 初期化
    this.init();
  }
  //-------------------------------------------------
  // Methods
  //-------------------------------------------------
  private init() {
    // sessionStorageの値をチェック
    const menuInitFlag = sessionStorage.getItem('menuInitDone');
    if (!menuInitFlag) {
      // sessionStorageに値をセット
      sessionStorage.setItem('menuInitDone', 'true');
      // 初期表示時は開いた状態にする
      this.menuOpen();
    } else {
      // 初期表示時は閉じた状態にする
      this.menuClose();
    }

    this.button?.addEventListener('click', () => {
      // aria-expanded属性の値を取得
      const expanded = this.button?.getAttribute('aria-expanded');
      expanded === 'false' ? this.openAnimation() : this.closeAnimation();
    });
  }
  /**
   * メニューを開くアニメーション
   * @returns {void}
   */
  private openAnimation(duration: number = this.menuDuration) {
    this.animateOptions.duration = duration;
    // メニューエリアを表示
    if (this.menu) this.menu.style.display = 'block';
    // メニューを左にスライドさせる
    this.element?.animate(
      [
        { transform: 'translateX(calc(100% + 8px)) translateY(-50%)' },
        { transform: 'translateX(0) translateY(-50%)' }
      ],
      this.animateOptions
    );
    // アニメーションが完了したら表示
    setTimeout(() => this.menuOpen(), duration);
  }
  /**
   * メニューを閉じるアニメーション
   * @returns {void}
   */
  private closeAnimation(duration: number = this.menuDuration) {
    this.animateOptions.duration = duration;
    // メニューを右にスライドさせる
    this.element?.animate(
      [
        { transform: 'translateX(0) translateY(-50%)' },
        { transform: 'translateX(calc(100% + 8px)) translateY(-50%)' }
      ],
      this.animateOptions
    );
    // アニメーションが完了したら非表示
    setTimeout(() => this.menuClose(), duration);
  }
  /**
   * メニューを開く
   * @returns {void}
   */
  private menuOpen() {
    // is-openクラスを追加
    this.element.classList.add(this.openClass);
    // aria-expanded属性の値を変更
    this.button?.setAttribute('aria-expanded', 'true');
    this.menu?.setAttribute('aria-hidden', 'false');
    // フラグを更新
    this.menuOpenFlag = true;
  }
  /**
   * メニューを閉じる
   * @returns {void}
   */
  private menuClose() {
    // メニューエリアを非表示
    if (this.menu) this.menu.style.display = 'none';
    // is-openクラスを削除
    this.element.classList.remove(this.openClass);
    // aria属性の値を変更
    this.button?.setAttribute('aria-expanded', 'false');
    this.menu?.setAttribute('aria-hidden', 'true');
    // フラグを更新
    this.menuOpenFlag = false;
  }
}
