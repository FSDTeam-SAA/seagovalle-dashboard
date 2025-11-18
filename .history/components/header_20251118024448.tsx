'use client'

import { HeaderUserAvatar } from '@/components/header-user-avatar'

interface HeaderProps {
  title: string
  searchPlaceholder?: string
}

export function Header({ title, searchPlaceholder = 'Search...' }: HeaderProps) {
  return (
    <header className="border-b border-border bg-[]">
      <div className="flex items-center justify-between px-6 py-4">
        <h1 className="text-3xl font-bold text-foreground">{title}</h1>
        <div className="flex items-center gap-6">
          {/* <div className="relative hidden md:flex items-center">
            <Search className="absolute left-3 text-muted-foreground" size={20} />
            <Input
              placeholder={searchPlaceholder}
              className="pl-10 w-64"
            />
          </div> */}
          <HeaderUserAvatar />
        </div>
      </div>
    </header>
  )
}
