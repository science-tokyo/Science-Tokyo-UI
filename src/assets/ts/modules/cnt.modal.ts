// cnt.modal.ts
export default class Modal {
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
    const modalTriggers = document.querySelectorAll('[data-js-modal-trigger]');
    // タブトリガーの数だけイベントを設定
    Array.from(modalTriggers as NodeListOf<Element>).forEach(
      (trigger: Node) => {
        trigger.addEventListener('click', this.openModal.bind(this));
      }
    );
  }
  // タブ切り替えの処理
  private openModal(e: Event) {
    const targetModal = e.currentTarget as HTMLElement;
    const targetId = targetModal.getAttribute('data-js-modal-trigger');
    const targetContent = document.querySelector(
      `[data-js-modal="${targetId}"]`
    ) as any;
    // 対象要素がない場合は処理を中断
    if (!targetContent) return;
    // モーダルを表示
    targetContent.showModal();
  }
}
