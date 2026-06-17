import { GameState } from "../types"

interface GameStore extends GameState {
  addPlayer: (name: string) => void
  removePlayer: (id: string) => void
  assignRoles: () => void
  nextPlayer: () => void
  reset: () => void
}