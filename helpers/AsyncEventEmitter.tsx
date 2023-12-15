import EventEmitter from 'events'

export class AsyncEventEmitter extends EventEmitter {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async emitAsync(event: string | symbol, ...args: any[]) {
    const listeners = this.listeners(event)
    const promises = listeners.map(async (listener) => {
      return listener(...args) // Assuming each listener returns a Promise
    })
    await Promise.all(promises)
  }
}
