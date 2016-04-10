import * as Animator from 'animator';
import * as Dom from 'dom';
import * as Maths from 'maths';
import * as Singleton from 'singleton';

export default class extends Singleton {

  constructor() {
    super();
    if (this.getInstance()) {
      return this.getInstance();
    }
    this.HASH = 'titleAnimationHash';
    this.TEXT_ANIM_DURATION = 200;
    this.textAnimEndTime = 0;
    this.easeStartPosition = 0;
    this.easeEndPosition = 0;
    this.lastStartPosition = 0;
  }

  handleScroll() {
    var animator = new Animator();
    animator.cancelAnimation(this.HASH);
    this.easeStartPosition = this.lastStartPosition;
    this.textAnimEndTime = new Date().getTime() + this.TEXT_ANIM_DURATION;
    var splashTextEl = document.getElementsByClassName('cuiffo-page-title-container')[0];
    var range = splashTextEl.clientHeight + 30;
    var positionInPage = Dom.getScrollPosition();
    this.easeEndPosition = (positionInPage / Dom.getWindowHeight()) * range;
    var boundFn = this.textAnimationFn.bind(this);
    animator.startAnimation(boundFn, this.HASH);
  }

  textAnimationFn(currentTime) {
    var isComplete = false;
    if (currentTime > this.textAnimEndTime) {
      this.lastStartPosition = this.easeEndPosition;
      isComplete = true;
    } else {
      var startTime = this.textAnimEndTime - this.TEXT_ANIM_DURATION;
      // The text should always be moving, boost the current time if it's low.
      var timeDiff = Math.max(currentTime - startTime, 20);
      var calc = Maths.easeOutQuad(
          timeDiff,
          this.easeStartPosition,
          this.easeEndPosition - this.easeStartPosition,
          this.TEXT_ANIM_DURATION);
      this.lastStartPosition = calc;
    }
    var splashTextEl = document.getElementsByClassName('cuiffo-page-title-container')[0];
    var opacity = 1 - (this.lastStartPosition / (splashTextEl.clientHeight + 30));
    splashTextEl.style.opacity = Math.max(opacity, 0);
    Dom.setCssTransform(splashTextEl, 'translateY(' + this.lastStartPosition + 'px)');
    return isComplete;
  }
}
