import Duck from 'extensible-duck'

export default new Duck({
  namespace: 'counter', store: 'counter',
  types: ['INCREMENT', 'DECREMENT'],
  initialState: { count: 0 },
  reducer: (state, action, duck) => {
    switch(action.type) {
      // do reducer stuff
      case duck.types.INCREMENT:
        return { count: state.count + 1}

      case duck.types.DECREMENT:
        return { count: state.count - 1}
      default: return state
    }
  },
  creators: (duck) => ({
    increment: () => ({ type: duck.types.INCREMENT  }),
    decrement: () => ({ type: duck.types.DECREMENT })
  })
})