import * as Animator from 'animator';
import * as Dom from 'dom';
import * as Singleton from 'singleton';
import * as Maths from 'maths';

export default class extends Singleton {

  constructor() {
    super();
    if (this.getInstance()) {
      return this.getInstance();
    }
    this.HASH = 'pageAnimationHash';
    this.SCROLL_ANIM_DURATION = 500;
    this.easeScrollEndTime = 0;
    this.easeScrollPositionStart = 0;
    this.easeScrollPositionEnd = 0;
    this.lastStartScroll = 0;
    this.isAnimating = false;
    this.animatorHash =  -1;
  }

  scrollToElement(element) {
    var animator = new Animator();
    animator.cancelAnimation(this.HASH);
    var scrollTo = element.offsetTop;
    this.easeScrollPositionEnd = scrollTo;
    this.easeScrollEndTime = new Date().getTime() + this.SCROLL_ANIM_DURATION;
    var top = Dom.getScrollPosition();
    this.easeScrollPositionStart = top;
    this.lastStartScroll = top;
    var boundFn = this.pageAnimationFn.bind(this);
    animator.startAnimation(boundFn, this.HASH);
    this.isAnimating = true;
  }

  pageAnimationFn(currentTime) {
    var isComplete = false;
    if (currentTime > this.easeScrollEndTime) {
      this.lastStartScroll = this.easeScrollPositionEnd;
      new TitleAnimation().handleScroll();
      new Pages().updateActivePage();
      isComplete = true;
      this.isAnimating = false;
    } else {
      var startTime = this.easeScrollEndTime - this.SCROLL_ANIM_DURATION;
      var calc = Maths.easeInOutQuad(
          currentTime - startTime,
          this.easeScrollPositionStart,
          this.easeScrollPositionEnd - this.easeScrollPositionStart,
          this.SCROLL_ANIM_DURATION);
      this.lastStartScroll = calc;
    }
    window.scrollTo(0, this.lastStartScroll);
    return isComplete;
  }
}
