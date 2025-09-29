'use client'

import { Coins, User } from 'lucide-react'
import { motion } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import type { ReactElement } from 'react'

import { GameMenuBar } from '@/components/landing/header/GameMenuBar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Button } from '@/components/ui/Button'
import type { CategoryId, MenuItem } from '@/types/navigation'

type CasinoHeaderProps = {
  menu?: {
    items: MenuItem[]
    selected: CategoryId
    onSelect: (id: CategoryId) => void
    onOpenProvider?: () => void
    promotionsCount?: number
    onPromotions?: () => void
    onContact?: () => void
    onFavorites?: () => void
    onSearch?: (value: string) => void
  }
}

export function CasinoHeader({ menu }: CasinoHeaderProps): ReactElement {
  return (
    <motion.header
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: 'spring', stiffness: 100 }}
      className="bg-gradient-to-r from-black via-purple-950/30 to-black border-b border-blue-500/20 shadow-2xl relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            aria-label="Go to home"
            className="relative block h-10 w-40 sm:h-11 sm:w-48"
          >
            <Image
              src="/images/logo/logo.webp"
              alt="Jackpot City"
              fill
              priority
              className="object-contain"
              sizes="(max-width: 640px) 10rem, 12rem"
            />
          </Link>

          {/* User section */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            {/* Enhanced Balance */}
            <motion.div
              className="bg-black/60 backdrop-blur-md rounded-lg px-2 sm:px-4 py-1.5 sm:py-2 border border-blue-400/20 shadow-lg shadow-blue-500/10 relative overflow-hidden"
              whileHover={{ scale: 1.05, y: -2 }}
              transition={{ type: 'spring', stiffness: 400, damping: 17 }}
            >
              <div className="flex items-center space-x-1 sm:space-x-2 relative z-10">
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                >
                  <Coins className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-400" />
                </motion.div>
                <div className="text-right">
                  <motion.p
                    className="text-yellow-400 font-medium text-sm sm:text-base"
                    whileHover={{
                      scale: 1.05,
                      textShadow: '0 0 10px rgba(251, 191, 36, 0.5)',
                    }}
                  >
                    £28.65
                  </motion.p>
                  <p className="text-blue-200/70 text-xs hidden sm:block">Balance</p>
                </div>
              </div>
            </motion.div>

            {/* User profile */}
            <div className="flex items-center space-x-1 sm:space-x-2">
              <Avatar
                className="border-2 w-8 h-8 sm:w-10 sm:h-10"
                style={{ borderColor: '#3385FF' }}
              >
                <AvatarImage
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face"
                  alt="Profile Picture"
                />
                <AvatarFallback className="text-white" style={{ backgroundColor: '#3385FF' }}>
                  <User className="w-3 h-3 sm:w-4 sm:h-4" />
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:block">
                <p className="text-white font-medium text-sm">Carlo</p>
                <p className="text-gray-400 text-xs">VIP Player</p>
              </div>
            </div>

            {/* Deposit button */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                className="text-white border-0 shadow-lg text-sm sm:text-base px-3 sm:px-4 py-1.5 sm:py-2 cursor-pointer"
                style={{ background: 'linear-gradient(to right, #10b981, #059669)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, #059669, #047857)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'linear-gradient(to right, #10b981, #059669)'
                }}
              >
                Deposit
              </Button>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Inline menu under the header, inside the same animation container */}
      {menu && (
        <GameMenuBar
          items={menu.items}
          selected={menu.selected}
          onSelect={menu.onSelect}
          onOpenProvider={menu.onOpenProvider}
          promotionsCount={menu.promotionsCount}
          onPromotions={menu.onPromotions}
          onContact={menu.onContact}
          onFavorites={menu.onFavorites}
          onSearch={menu.onSearch}
        />
      )}
    </motion.header>
  )
}
