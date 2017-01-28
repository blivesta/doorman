import { extend } from './lib/extend'
import { whichTransitionEvent } from './lib/whichTransitionEvent'

export default class Doorman {
  constructor (element = {}, options = {}) {
    this.name = 'doorman'
    this.element = element
    this.options = options
    this.data = {}
    this.elementContent = {}
    this.elementTransform = {}
    this.state = null
    this.default = {
      direction: 'lr', // lr (left to right) || rl (right to left) || tb (top to bottom) || bt (bottom to top).
      bgColor: 'rgb(000, 000, 000)',
      duration: '300', // ms
      delay: '0', // ms
      easing: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)', // easeInOutQuint
      reverse: false,
      begin: (element) => {},
      complete: (element) => {}
    }

    const dataReverse = this.element.getAttribute('data-doorman-reverse')
    const dataDirection = this.element.getAttribute('data-doorman-direction')
    const dataBgColor = this.element.getAttribute('data-doorman-bgColor')
    const dataDuration = this.element.getAttribute('data-doorman-duration')
    const dataDelay = this.element.getAttribute('data-doorman-delay')
    const dataEasing = this.element.getAttribute('data-doorman-easing')

    if (dataReverse !== null) this.data.reverse = dataReverse
    if (dataDirection !== null) this.data.direction = dataDirection
    if (dataBgColor !== null) this.data.bgColor = dataBgColor
    if (dataDuration !== null) this.data.duration = dataDuration
    if (dataDelay !== null) this.data.delay = dataDelay
    if (dataEasing !== null) this.data.easing = dataEasing

    this.options = extend(this.default, options, this.data)

    this.init()
  }

  init () {
    const elementInnerHtml = this.element.innerHTML
    const elContentName = `${this.name}-content`
    const elTransformName = `${this.name}-transform`
    const elChilderen = `<div class="${elContentName}"></div><div class="${elTransformName}"></div>`

    this.state = 0
    this.element.textContent = ''
    this.element.insertAdjacentHTML('beforeend', elChilderen)

    this.element.setAttribute('data-doorman', this.state)

    this.elementTransform = this.element.querySelector(`.${elTransformName}`)
    this.elementContent = this.element.querySelector(`.${elContentName}`)
    this.elementContent.innerHTML = elementInnerHtml

    this.setStyle('init')
  }

  start (str) {
    if (this.isTransitioning) return
    if (str) this.reverse()
    this.firstStep()
  }

  firstStep () {
    const self = this
    const transitionEvent = whichTransitionEvent(self.name)

    self.state = 1

    setTimeout(() => {
      self.element.setAttribute('data-doorman', self.state)
      self.element.setAttribute('data-doorman-reverse', self.options.reverse)
      self.setStyle('start')
      self.options.begin(self.element)

      transitionEvent && self.element.addEventListener(transitionEvent, (e) => {
        e.stopImmediatePropagation()
        self.checkCurrentTransition()
      }, false)
    }, 1)
  }

  secondStep () {
    this.state = 2
    this.element.setAttribute('data-doorman', this.state)
    this.setStyle('end')
  }

  complete () {
    this.state = 'complete'
    this.element.setAttribute('data-doorman', this.state)
    this.options.complete(this.element)
  }

  checkCurrentTransition () {
    if (this.state === 1) {
      this.secondStep()
    } else {
      this.complete()
    }
  }

  reverse () {
    this.options.reverse = true
    this.element.setAttribute('data-doorman-reverse', true)

    switch (this.options.direction) {
      case 'lr':
        this.options.direction = 'rl'
        this.element.setAttribute('data-doorman-direction', 'rl')
        break
      case 'rl':
        this.options.direction = 'lr'
        this.element.setAttribute('data-doorman-direction', 'lr')
        break
      case 'tb':
        this.options.direction = 'bt'
        this.element.setAttribute('data-doorman-direction', 'bt')
        break
      case 'bt':
        this.options.direction = 'tb'
        this.element.setAttribute('data-doorman-direction', 'tb')
        break
    }
  }

  destroy () {}

  setStyle (type) {
    var s = this.element.style
    var t = this.elementTransform.style
    var c = this.elementContent.style

    switch (type) {
      case 'init':
        s.position = 'relative'

        c.visibility = 'hidden'

        t.position = 'absolute'
        t.top = 0
        t.left = 0
        t.width = '100%'
        t.height = '100%'
        t.pointerEvents = 'none'
        t.transitionProperty = 'transform'
        t.willChange = 'transform'

        t.backgroundColor = this.options.bgColor
        t.transitionDuration = `${this.options.duration}ms`
        t.transitionDelay = `${this.options.delay}ms`
        t.transitionTimingFunction = this.options.easing
        break
      case 'start':
        this.element.style.visibility = 'visible'
        switch (this.options.reverse) {
          case true:
            c.visibility = 'visible'
            break
          case false:
            c.visibility = 'hidden'
            break
        }
        break
      case 'end':
        switch (this.options.reverse) {
          case true:
            c.visibility = 'hidden'
            break
          case false:
            c.visibility = 'visible'
            break
        }
        break
    }

    switch (this.options.direction) {
      case 'lr':
        switch (type) {
          case 'init':
            t.transform = 'scaleX(0)'
            break
          case 'start':
            t.transform = 'scaleX(1)'
            t.transformOrigin = '0 0 0'
            break
          case 'end':
            t.transform = 'scaleX(0)'
            t.transformOrigin = '100% 0 0'
            break
        }
        break
      case 'rl':
        switch (type) {
          case 'init':
            t.transform = 'scaleX(0)'
            break
          case 'start':
            t.transform = 'scaleX(1)'
            t.transformOrigin = '100% 0 0'
            break
          case 'end':
            t.transform = 'scaleX(0)'
            t.transformOrigin = '0 0 0'
            break
        }
        break
      case 'tb':
        switch (type) {
          case 'init':
            t.transform = 'scaleY(0)'
            break
          case 'start':
            t.transform = 'scaleY(1)'
            t.transformOrigin = '0 0 0'
            break
          case 'end':
            t.transform = 'scaleY(0)'
            t.transformOrigin = '0 100% 0'
            break
        }
        break
      case 'bt':
        switch (type) {
          case 'init':
            t.transform = 'scaleY(0)'
            break
          case 'start':
            t.transform = 'scaleY(1)'
            t.transformOrigin = '0 100% 0'
            break
          case 'end':
            t.transform = 'scaleY(0)'
            t.transformOrigin = '0 0 0'
            break
        }
        break
    }
  }
}
