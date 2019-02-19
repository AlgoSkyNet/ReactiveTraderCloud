import { MockScheduler } from 'rt-testing'
import { PlatformAdapter } from 'rt-components'
import { ConnectionActions } from 'rt-actions'
import { Action } from 'redux'

import { of } from 'rxjs'
import { closePositionEpic } from '../closePosition'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { ApplicationDependencies } from 'applicationServices'

const MockPlatform = jest.fn<PlatformAdapter>(() => ({
  interop: {
    subscribe: (sender: string, topic: string, listener: () => void) => of('result'),
  },
}))

describe('Close position', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('Should only start emitting after application is connected', () => {
    const testScheduler = new MockScheduler()
    const actionReference = {
      a: { type: 'Random' },
      c: ConnectionActions.connect(),
      b: {},
    }
    const state = {}
    testScheduler.run(({ cold, expectObservable }) => {
      const platform = new MockPlatform()
      const actionLifeTime = '-aaa-c-b'
      const expectLifetime = '-------b'
      const source$ = cold<Action<any>>(actionLifeTime, actionReference)
      const epics$ = closePositionEpic(ActionsObservable.from(source$), StateObservable.from(state), {
        platform,
      } as ApplicationDependencies)
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
