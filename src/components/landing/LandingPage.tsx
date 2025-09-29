import { GameExplorer } from '@/components/landing/GameExplorer'
import { mockGames } from '@/lib/games/mockGames'

export default function LandingPage() {
  return (
    <div className="min-h-screen relative landing-background">
      <main className="relative z-10">
        <GameExplorer games={mockGames} />
      </main>
    </div>
  )
}
