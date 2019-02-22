import { MockScheduler } from 'rt-testing'
import { PlatformAdapter } from 'rt-components'
import { ConnectionActions } from 'rt-actions'
import { Action } from 'redux'
import { of, Subject } from 'rxjs'
import { closePositionEpic, createTrade } from '../closePosition'
import { ActionsObservable, StateObservable } from 'redux-observable'
import configureStore from 'redux-mock-store'
import { GlobalState } from 'StoreTypes'

const MockPlatform = jest.fn<PlatformAdapter>(() => ({
  interop: {
    subscribe$: (sender: string, topic: string, listener: () => void) => of('result'),
  },
}))

const middlewares: any = []
const mockStore = configureStore(middlewares)

describe('Close position', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it.only('Should ignore actions if application is not connected', () => {
    const testScheduler = new MockScheduler()
    const actionReference = {
      a: { type: 'Random' },
      c: ConnectionActions.connect(),
      b: {},
    }
    const initState = {
      currencyPairs: {},
      spotTilesData: {},
    } as GlobalState
    const store = mockStore(initState)
    testScheduler.run(({ cold, expectObservable }) => {
      const platform = new MockPlatform((position: string) => of(position))
      const actionLifeTime = '-aaabb'
      const expectLifetime = '-------'
      const source$ = cold<Action<any>>(actionLifeTime, actionReference)
      const state$ = new StateObservable(new Subject(), store)
      const epics$ = closePositionEpic(ActionsObservable.from(source$), state$, {
        platform,
      })

      expectObservable(epics$).toBe(expectLifetime)
    })
  })

  it('Should call the createTrade', () => {
    const testScheduler = new MockScheduler()
    testScheduler.run(({ cold, expectObservable }) => {
      const platform = new MockPlatform()
      // const action$
    })
  })
})
