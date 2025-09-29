import { GameExplorer } from '@/components/landing/GameExplorer'
import { mockGames } from '@/lib/games/mockGames'

export default function LandingPage() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        background: `
          radial-gradient(ellipse 140% 80% at top center, rgba(51,133,255,.25) 0%, rgba(51,133,255,.12) 30%, transparent 70%),
          radial-gradient(ellipse 120% 100% at bottom right, rgba(139,92,246,.18) 0%, rgba(168,85,247,.08) 40%, transparent 80%),
          radial-gradient(ellipse 120% 100% at bottom left, rgba(6,182,212,.15) 0%, rgba(14,165,233,.06) 40%, transparent 80%),
          radial-gradient(ellipse 100% 120% at center, rgba(30,64,175,.12) 0%, transparent 60%),
          radial-gradient(ellipse 150% 80% at top right, rgba(79,70,229,.08) 0%, transparent 50%),
          radial-gradient(ellipse 150% 80% at top left, rgba(37,99,235,.08) 0%, transparent 50%),
          linear-gradient(135deg, #000 0%, #0f172a 15%, #1e293b 25%, #1e3a8a 45%, #312e81 55%, #1e293b 75%, #0f172a 85%, #000 100%),
          linear-gradient(45deg, rgba(51,133,255,.03) 0%, transparent 30%, rgba(139,92,246,.03) 70%, transparent 100%)
        `,
      }}
    >
      <main className="relative z-10">
        <GameExplorer games={mockGames} />
      </main>
    </div>
  )
}
