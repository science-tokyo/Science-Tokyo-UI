//===================================== modules import
import Splide from '@splidejs/splide';
import GlobalHeader from './modules/cnt.globalHeader';
import SideNavigation from './modules/cnt.sideNavigation';
import Accordion from './modules/cnt.accordion';
import Tab from './modules/cnt.tab';
import Modal from './modules/cnt.modal';
import SmoothScroll from './modules/cnt.smoothScroll';
import SearchMedia from './modules/cnt.searchMedia';
//===================================== document ready
document.addEventListener('DOMContentLoaded', function () {
  const bp_large = window.matchMedia('(min-width: 768px)');
  /**
   * GlobalHeader
   */
  const globalHeader = document.querySelector('[data-js-header]');
  if (globalHeader) new GlobalHeader(globalHeader as HTMLElement);
  /**
   * SideNavigation
   */
  const sideNavigation = document.querySelector('[data-js-sidenav]');
  if (sideNavigation) new SideNavigation(sideNavigation as HTMLElement);
  /**
   * Carousel
   */
  const carouselContainer = document.querySelectorAll('[data-js-carousel]');
  Array.from(carouselContainer as NodeListOf<HTMLElement>).forEach(
    (container: HTMLElement) => {
      // すでにマウント済みの場合は処理をスキップ
      if (container.classList.contains('is-active')) return;
      // スライドの枚数をチェック
      const slideNum = container.querySelectorAll('.splide__slide').length;
      const hasCardItem = container.querySelector('.c-card');

      const perPageNum = container.dataset.jsCarousel;
      const autoplayFlag = container.dataset.jsCarouselAuto;
      const loopFlag = container.dataset.jsCarouselLoop;
      const paginationFlag =
        container.dataset.jsCarouselPagination === 'true' ? true : false;
      const settings = {
        perPage: parseInt(perPageNum as string),
        perMove: 1,
        type: loopFlag === 'false' ? 'slide' : 'loop',
        autoplay: autoplayFlag === 'true' ? true : false,
        pauseOnHover: false,
        gap: hasCardItem ? '16px' : '0px',
        // 表示するスライドが小数指定の場合、paddingを設定
        padding: Number.isInteger(parseFloat(perPageNum as string))
          ? '0px'
          : { right: '15%' },
        pagination: paginationFlag,
        focus: 0,
        omitEnd: true,
        breakpoints: {
          767: {
            perPage: 1,
            // スライドアイテムにCardコンポーネントがある場合はpaddingを設定
            padding: hasCardItem ? '68px' : '0px'
          }
        }
      };
      const splide = new Splide(container as HTMLElement, settings).mount();

      const handleTabletChange = (e: MediaQueryList | MediaQueryListEvent) => {
        const controller = container.querySelector(
          '.c-carousel__controller'
        ) as HTMLElement;
        if (e.matches) {
          // スライド枚数がperPageNum以下の場合、スライダーを破棄する
          if (slideNum <= parseInt(perPageNum as string)) {
            // コントローラーを隠す
            if (controller) controller.style.display = 'none';
            // スライダーを破棄
            splide.destroy();
          }
        } else {
          if (slideNum > 1) {
            // コントローラーを表示
            if (controller) controller.style.display = '';
            // スライダーを再生成
            if ('type' in e && e.type === 'change') {
              splide.mount();
            }
          } else {
            // コントローラーを隠す
            if (controller) controller.style.display = 'none';
            // スライダーを破棄
            splide.destroy();
          }
        }
      };
      // イベントリスナーを登録
      bp_large.addEventListener('change', handleTabletChange as EventListener);
      // 初回実行
      handleTabletChange(bp_large);
    }
  );
  /**
   * Tab
   */
  const tabContainer = document.querySelectorAll('[data-js-tab]');
  Array.from(tabContainer as NodeListOf<HTMLElement>).forEach(
    (container: HTMLElement) => {
      new Tab(container);
    }
  );
  /**
   * Modal
   */
  const modalContainer = document.querySelectorAll('[data-js-modal]');
  Array.from(modalContainer as NodeListOf<HTMLElement>).forEach(
    (container: HTMLElement) => {
      new Modal(container);
    }
  );
  /**
   * SmoothScroll
   */
  const anchorLinkItems = document.querySelectorAll('a[href^="#"]');
  Array.from(anchorLinkItems as NodeListOf<HTMLElement>).forEach(
    (item: HTMLElement) => {
      new SmoothScroll(item);
    }
  );
  /**
   * Accordion
   */
  const accordionContainer = document.querySelectorAll(
    '[data-js-accordion-container]'
  );
  Array.from(accordionContainer as NodeListOf<HTMLElement>).forEach(
    (container: HTMLElement) => {
      new Accordion(container);
    }
  );
  /**
   * Search Media
   */
  const search_media = document.querySelector('[data-js-search-media]');
  if (search_media) new SearchMedia(search_media as HTMLElement);
});
