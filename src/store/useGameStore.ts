import { create } from 'zustand'
import { GameState, Player, Role } from '../types'

interface GameStore extends GameState {
  addPlayer: (name: string) => void
  removePlayer: (id: string) => void
  assignRoles: () => void
  nextPlayer: () => void
  reset: () => void
}

const ROLES: Role[] = ['Imposter', 'Diva']

export const useGameStore = create<GameStore>((set, get) => ({
  players: [],
  currentRevealIndex: 0,

  addPlayer: (name) =>
    set((state) => ({
      players: [
        ...state.players,
        { id: Date.now().toString(), name },
      ],
    })),

  removePlayer: (id) =>
    set((state) => ({
      players: state.players.filter((p) => p.id !== id),
    })),

  assignRoles: () => {
    const { players } = get()
    const shuffled = [...players].sort(() => Math.random() - 0.5)
    const assigned: Player[] = shuffled.map((p, i) => ({
      ...p,
      role: ROLES[i % ROLES.length],
    }))
    set({ players: assigned, currentRevealIndex: 0 })
  },

  nextPlayer: () =>
    set((state) => ({
      currentRevealIndex: state.currentRevealIndex + 1,
    })),

  reset: () => set({ players: [], currentRevealIndex: 0 }),
}))
