// cnt.tab.ts
export default class Tab {
  element: HTMLElement;
  //-------------------------------------------------
  // Parameters
  //-------------------------------------------------
  constructor(element: HTMLElement) {
    // 対象要素
    this.element = element;
    // 対象要素がない場合は処理を中断
    if (!this.element) return;
    // 初期化
    this.init();
  }
  //-------------------------------------------------
  // Methods
  //-------------------------------------------------
  private init() {
    // タブトリガーの要素を取得
    const tabTriggers = this.element.querySelectorAll('[data-js-tab-trigger]');
    // タブトリガーの数だけイベントを設定
    Array.from(tabTriggers as NodeListOf<Element>).forEach((trigger: Node) => {
      trigger.addEventListener('click', this.tabChange.bind(this));
    });
  }
  // タブ切り替えの処理
  private tabChange(e: Event) {
    const toggleClass = 'is-active';
    /**
     * タブ側の処理
     */
    const tabTriggers = this.element.querySelectorAll('[data-js-tab-trigger]');
    const targetTab = e.currentTarget as HTMLElement;
    const targetId = targetTab.getAttribute('data-js-tab-trigger');
    Array.from(tabTriggers as NodeListOf<HTMLElement>).forEach(
      (trigger: HTMLElement) => {
        // すべてのタブトリガーを非アクティブにする
        trigger.classList.remove(toggleClass);
        trigger.setAttribute('aria-selected', 'false');
      }
    );
    // 対象のトリガーをアクティブにする
    targetTab.classList.add(toggleClass);
    targetTab.setAttribute('aria-selected', 'true');

    /**
     * コンテンツ側の処理
     */
    const tabContents = this.element.querySelectorAll('[data-js-tab-content]');
    const targetContent = this.element.querySelector(
      `[data-js-tab-content="${targetId}"]`
    );
    // 該当するコンテンツがない場合は処理を中断
    if (!targetContent) return;
    // タブ全体に対する処理
    Array.from(tabContents as NodeListOf<HTMLElement>).forEach(
      (content: HTMLElement) => {
        // すべてのタブコンテンツを非表示にする
        content.classList.remove(toggleClass);
      }
    );
    // 対象のタブコンテンツを表示する
    targetContent.classList.add(toggleClass);
  }
}
