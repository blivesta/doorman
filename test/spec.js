import Doorman from '../src/doorman'

describe('Doorman', () => {
  function el () {
    return document.querySelector('.doorman')
  }

  before(() => {
    document.body.innerHTML = window.__html__['test/fixtures/fixture.html']
  })

  after(() => {
    document.body.innerHTML = ''
  })

  it('init', (done) => {
    const doorman = new Doorman(el())
    assert.equal(doorman.state, 0)
    done()
  })

  it('start', (done) => {
    const doorman = new Doorman(el())
    doorman.start()
    assert.equal(doorman.state, 1)
    done()
  })
})
