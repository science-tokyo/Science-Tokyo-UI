// cnt.accordion.ts
export default class Accordion {
  element: HTMLElement;
  accordionItem: NodeListOf<Element>;
  accordionToggleAll: HTMLElement;
  settings: { duration: number; easing: string };
  allOpen: boolean;
  //-------------------------------------------------
  // Parameters
  //-------------------------------------------------
  constructor(element: HTMLElement) {
    // 対象要素
    this.element = element;
    // アコーディオン要素を取得
    this.accordionItem = this.element.querySelectorAll('[data-js-accordion]');
    // すべてのアコーディオンを制御するボタンを取得
    this.accordionToggleAll = this.element.querySelector(
      '[data-js-accordion-toggle-all]'
    ) as HTMLElement;
    // アニメーションの設定
    this.settings = {
      // アニメーションの時間は高さに合わせて調整
      duration: 500,
      easing: 'ease'
    };
    this.allOpen = false;
    // 初期化
    this.init();
  }
  //-------------------------------------------------
  // Methods
  //-------------------------------------------------
  private init() {
    // 各アコーディオンにイベントを設定
    this.setAccordion(this.accordionItem);
    // すべてのアコーディオンを制御するボタンがあればイベントを設定
    if (this.accordionToggleAll) {
      // デフォルトの表示状態を取得
      const defaultOpen = this.accordionToggleAll.dataset.jsAccordionToggleAll;
      // 初期表示の状態を設定
      defaultOpen === 'isOpen' ? (this.allOpen = true) : (this.allOpen = false);
      // ボタンの状態を更新
      this.updateButtonStutas(this.allOpen);
      // ボタンを押したときのイベントを設定
      this.accordionToggleAll.addEventListener('click', (event) => {
        // デフォルトの挙動を無効化
        event.preventDefault();
        // ボタンの状態を更新
        this.updateButtonStutas(!this.allOpen);
        // アコーディオンを開閉
        this.toggleAllAccordion(this.accordionItem);
      });
    }
  }
  /**
   * @description アコーディオンの開閉を設定
   * @param item
   */
  private setAccordion(items: NodeListOf<Element>) {
    Array.from(items).forEach((item) => {
      // トリガー要素を取得
      const trigger = item.querySelector('[data-js-accordion-trigger]');
      // ターゲット要素を取得
      const target = item.querySelector(
        '[data-js-accordion-target]'
      ) as HTMLElement;
      // トリガーとターゲットがあればイベントを設定
      if (trigger && target) {
        trigger.addEventListener('click', (event) => {
          // デフォルトの挙動を無効化
          event.preventDefault();
          // detailsのopen属性を判定
          if (item.getAttribute('open') !== null) {
            // アコーディオンを閉じるときの処理
            const closingAnim = target.animate(
              this.closingAnimation(target),
              this.settings
            );

            closingAnim.onfinish = () => {
              // アニメーションの完了後にopen属性を取り除く
              item.removeAttribute('open');
              // アコーディオン全体の状態を確認
              if (this.accordionToggleAll) this.checkAllStatus(items);
            };
          } else {
            // open属性を付与
            item.setAttribute('open', 'true');
            // アコーディオンを開くときの処理
            target.animate(this.openingAnimation(target), this.settings);
            // アコーディオン全体の状態を確認
            if (this.accordionToggleAll) this.checkAllStatus(items);
          }
        });
      }
    });
  }
  /**
   * @description すべてのアコーディオンを開閉
   * @param items
   */
  private toggleAllAccordion(items: NodeListOf<Element>) {
    // アコーディオンの数だけ処理を繰り返す
    Array.from(items).forEach((item) => {
      // ターゲット要素を取得
      const target = item.querySelector(
        '[data-js-accordion-target]'
      ) as HTMLElement;
      // detailsのopen属性を判定
      if (!this.allOpen && item.getAttribute('open') !== null) {
        // アコーディオンを閉じるときの処理
        const closingAnim = target.animate(
          this.closingAnimation(target),
          this.settings
        );
        closingAnim.onfinish = () => {
          // アニメーションの完了後にopen属性を取り除く
          item.removeAttribute('open');
        };
      } else if (this.allOpen && item.getAttribute('open') === null) {
        // open属性を付与
        item.setAttribute('open', 'true');
        // アコーディオンを開くときの処理
        target.animate(this.openingAnimation(target), this.settings);
      } else {
        return;
      }
    });
  }
  /**
   * @description アコーディオン全体の状態を確認
   * @param items
   */
  private checkAllStatus(items: NodeListOf<Element>) {
    // detailsのopen属性を判定
    const itemsArray: Element[] = [...(items as any)];
    const allOpen = itemsArray.every(
      (item) => item.getAttribute('open') !== null
    );
    const allClose = itemsArray.every(
      (item) => item.getAttribute('open') === null
    );

    if (allOpen) this.updateButtonStutas(true);
    if (allClose) this.updateButtonStutas(false);
  }
  /**
   * @description ボタンの状態を更新
   * @param status = true: 全開状態, false: 全閉状態
   */
  private updateButtonStutas(status: boolean) {
    this.allOpen = status;
    const pathname = window.location.pathname;
    const lang = pathname.indexOf('/en/') !== -1 ? 'en' : 'ja';
    if (lang === 'ja') {
      this.accordionToggleAll.textContent = status
        ? 'すべて閉じる'
        : 'すべて開く';
    } else {
      this.accordionToggleAll.textContent = status
        ? 'Collapse all'
        : 'Expand all';
    }
    this.accordionToggleAll.setAttribute(
      'data-js-accordion-toggle-all',
      status ? 'expanded' : ''
    );
  }
  /**
   * @description アコーディオンを開くアニメーション
   * @param target
   * @returns
   */
  private openingAnimation(target: HTMLElement) {
    return [
      { height: '0px', opacity: 0 },
      { height: `${target.scrollHeight}px`, opacity: 1 }
    ];
  }
  /**
   * @description アコーディオンを閉じるアニメーション
   * @param target
   * @returns
   */
  private closingAnimation(target: HTMLElement) {
    return [
      { height: `${target.scrollHeight}px`, opacity: 1 },
      { height: '0px', opacity: 0 }
    ];
  }
}
