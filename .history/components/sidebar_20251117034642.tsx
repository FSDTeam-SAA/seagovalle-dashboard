'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, ShoppingCart, UtensilsCrossed, Pizza, Tag, Users, Star, CreditCard, LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'

const menuItems = [
  { href: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/orders', icon: ShoppingCart, label: 'Order Management' },
  { href: '/menu', icon: Pizza, label: 'Menu Management' },
  { href: '/toppings', icon: UtensilsCrossed, label: 'Toppings & Ingredients' },
  { href: '/deals', icon: Tag, label: 'Deals & Coupons' },
  { href: '/customers', icon: Users, label: 'Customers' },
  { href: '/reviews', icon: Star, label: 'Reviews & Ratings' },
  { href: '/payments', icon: CreditCard, label: 'Payments & Transactions' },
]

export function Sidebar() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed left-0 top-0 h-screen w-[312px] bg-sidebar text-sidebar-foreground
        transition-transform duration-300 z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        overflow-y-auto
      `}>
        <div className="p-6">
         <Image src="/logo.png" alt="Logo" width={150} height={40} className="mb-10" />

          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href} className='cusor-pointer'>
                  <button
                    onClick={() => setIsOpen(false)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 rounded-lg
                      transition-colors
                      ${isActive
                        ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                        : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                      }
                    `}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </button>
                </Link>
              )
            })}
          </nav>

          <div className="border-t border-sidebar-border mt-8 pt-8">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 text-sidebar-foreground hover:text-sidebar-accent"
            >
              <LogOut size={20} />
              Log Out
            </Button>
          </div>
        </div>
      </aside>
    </>
  )
}
