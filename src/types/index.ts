export type Role = 'Imposter' | 'Diva'

export interface Player {
  id: string
  name: string
  role?: Role
  image?: number
}

export interface GameState {
  players: Player[]
  currentRevealIndex: number
}

export type RootStackParamList = {
  PlayersList: undefined
  RoleReveal: undefined
}