# Doorman

[![npm version](https://img.shields.io/npm/v/doorman.svg?style=flat-square)](https://www.npmjs.com/package/doorman)
[![Build Status](https://img.shields.io/travis/blivesta/doorman/master.svg?style=flat-square)](https://travis-ci.org/blivesta/doorman)

> Simple animation for revealing elements.

## Demo

http://git.blivesta.com/doorman/

## Install

```html
<script src="umd/doorman.min.js"></script>
```

CDN

```html
<script src="https://unpkg.com/@blivesta/doorman/umd/doorman.min.js"></script>
```

npm

```html
$ npm install @blivesta/doorman
```
```js
const Doorman = require('doorman');
```

## Usage

css

```css
[data-doorman] {
	visibility: hidden;
}
```

html
```html
<span id="doorman">...</span>
<span data-doorman>...</span>
```

### Call the Doorman

```js
const elements = document.querySelector('#doorman');
const doorman = new Doorman(elements, { /* options */ });
doorman.start();
```

Use with multiple selectors.

```js
const elements = document.querySelectorAll('[data-doorman]');
Array.prototype.forEach.call(elements, function (el) {
  const doorman = new Doorman(el, { /* options */ });
  doorman.start();
});
```

Example to use with [scrollmonitor](https://github.com/stutrek/scrollMonitor)

```html
<style>
.section {
  height: 100vh;
}
[data-doorman] {
	visibility: hidden;
}
</style>

<div id="section1" class="section">
  <span data-doorman>section1</span>
</div>
<div id="section2" class="section">
  <span data-doorman>section2</span>
</div>
<div id="section3" class="section">
  <span data-doorman>section3</span>
</div>

<script src="https://unpkg.com/scrollmonitor@1.2.2"></script>
<script src="https://unpkg.com/@blivesta/doorman/doorman.min.js"></script>
<script>
  const sections = [
    document.getElementById('section1'),
    document.getElementById('section2'),
    document.getElementById('section3')
  ]
  Array.prototype.forEach.call(sections, (section) => {
    const elementWatcher = scrollMonitor.create(section, -200)
    elementWatcher.enterViewport(() => {
      const elements = section.querySelectorAll('[data-doorman]')
      Array.prototype.forEach.call(elements, (el) => {
        const doorman = new Doorman(el)
        doorman.start()
      })
      elementWatcher.destroy()
    })
  })
</script>
```


## Options

```js
{
  direction: 'lr',
	// lr (left to right) || rl (right to left) || tb (top to bottom) || bt (bottom to top).
  bgColor: 'rgb(000, 000, 000)',
  duration: '300', // ms
  delay: '0', // ms
  easing: 'cubic-bezier(0.860, 0.000, 0.070, 1.000)', // easeInOutQuint
  reverse: false,
  begin: function (element) {},
  complete: function (element) {}
}
```

```html
<div
  data-doorman-direction="lr"
  data-doorman-bgColor="rgb(000, 000, 000)"
  data-doorman-duration="300"
  data-doorman-delay="150"
  data-doorman-easing="cubic-bezier(0.860, 0.000, 0.070, 1.000)"
  data-doorman-reverse="flase"
>
  Content...
</div>
```

## Browsers

- Chrome
- Firefox
- IE11+
- Safari

## License
Released under the MIT license.
