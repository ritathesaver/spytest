import { create } from 'zustand'
import { GameState, Player } from '../types'
import { playerImages } from '../constants/images'

interface GameStore extends GameState {
  addPlayer: (name: string) => void
  removePlayer: (id: string) => void
  assignRoles: () => void
  nextPlayer: () => void
}

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
    const imposterIndex = Math.floor(Math.random() * players.length)
    const assigned: Player[] = players.map((p, i) => ({
      ...p,
      role: i === imposterIndex ? 'Imposter' : 'Diva',
      image: Math.floor(Math.random() * playerImages.length),
    }))
    set({ players: assigned, currentRevealIndex: 0 })
  },

  nextPlayer: () =>
    set((state) => ({
      currentRevealIndex: state.currentRevealIndex + 1,
    })),
}))
