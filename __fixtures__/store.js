import { createStore } from 'redux'

export const getStore = (obj = {}) => createStore((state) => state, obj)
