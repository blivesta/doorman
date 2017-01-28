export function whichTransitionEvent (name) {
  let t
  const el = document.createElement(name + '-transition')
  const transitions = {
    'transition': 'transitionend',
    'OTransition': 'oTransitionEnd',
    'MozTransition': 'transitionend',
    'WebkitTransition': 'webkitTransitionEnd'
  }
  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t]
    }
  }
}
