import { CasinoHeader } from '@/components/landing/header/CasinoHeader'
import { GameSection } from '@/components/landing/sections/GameSection'
import { mockGames } from '@/lib/games/mockGames'
import { partitionGames } from '@/lib/games/partition'

export default function LandingPage() {
  const { active, completed, comingSoon } = partitionGames(mockGames)

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
      <CasinoHeader />

      <main className="relative z-10">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 py-6 sm:py-8">
          {active.length > 0 && (
            <GameSection
              title="🎮 Active Weekly Challenges"
              subtitle={`${active.length} game${active.length !== 1 ? 's' : ''} available to play now`}
              games={active}
              delay={0.1}
              primaryColor="#3385FF"
              accentColor="#8b5cf6"
            />
          )}

          {completed.length > 0 && (
            <GameSection
              title="🏆 Completed Weekly Challenges"
              subtitle={`${completed.length} challenge${completed.length !== 1 ? 's' : ''} completed - Well done!`}
              games={completed}
              delay={0.6}
              primaryColor="#fbbf24"
              accentColor="#f59e0b"
            />
          )}

          {comingSoon.length > 0 && (
            <GameSection
              title="⏰ Coming Soon"
              subtitle={`${comingSoon.length} new challenge${comingSoon.length !== 1 ? 's' : ''} starting soon`}
              games={comingSoon}
              delay={1.1}
              primaryColor="#6b7280"
              accentColor="#9ca3af"
            />
          )}

          <p className="mt-12 sm:mt-16 text-center text-blue-200/80 text-sm sm:text-base">
            🎲 New challenges are added weekly. Check back regularly for more rewards! 🎰
          </p>
        </div>
      </main>
    </div>
  )
}
