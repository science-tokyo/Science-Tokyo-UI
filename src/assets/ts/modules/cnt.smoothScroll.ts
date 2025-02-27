// cnt.smoothScroll.ts
export default class SmoothScroll {
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
    this.element.addEventListener('click', this.processExec.bind(this));
  }
  private processExec(e: Event) {
    e.preventDefault();
    if (e.currentTarget !== null) {
      const hash = (e.currentTarget as HTMLAnchorElement).hash;
      const target = document.getElementById(hash.slice(1));

      // ページトップへ("#"と"#top"）
      if (!hash || hash === '#top') {
        e.preventDefault();
        window.scrollTo({
          top: 1, // iOSのChromeで固定ヘッダーが動くバグがあるため0ではなく1に
          behavior: 'smooth'
        });

        // アンカーへ
      } else if (target) {
        e.preventDefault();
        // ヘッダーの高さを取得
        const headerElement = document.querySelector('[data-js-header]');
        const headerHeight = headerElement ? headerElement.clientHeight : 0;
        // 今のスクロール位置
        const scrollY = window.scrollY;
        // スクロール先の位置
        let targetY = target ? target.getBoundingClientRect().top + scrollY : 0;

        // 上方向のスクロールの場合はヘッダーの高さ分だけずらす
        if (targetY < scrollY) targetY = targetY - headerHeight;
        window.scrollTo({
          top: targetY,
          behavior: 'smooth'
        });
      }
      // URLにハッシュを含める
      history.pushState(null, '', hash);
    }
  }
}
