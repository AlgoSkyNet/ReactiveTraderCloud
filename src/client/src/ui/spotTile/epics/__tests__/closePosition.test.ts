import { MockScheduler } from 'rt-testing'
import { PlatformAdapter } from 'rt-components'
import { of } from 'rxjs'

const MockPlatform = jest.fn<PlatformAdapter>(() => ({
  interop: {
    subscribe: (sender: string, topic: string, listener: () => void) => of('result'),
  },
}))

describe('Close position', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should only map when application is connected', () => {
    const testScheduler = new MockScheduler()
    testScheduler.run(({ cold, expectObservable }) => {
      const platform = new MockPlatform()
      // const action$
    })
  })

  it('Should ', () => {})
})
