'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, ShoppingCart, UtensilsCrossed, Gift, Users, Star, CreditCard } from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'

const AppSidebar = () => {
  const pathname = usePathname()

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/',
      icon: BarChart3,
    },
    {
      title: 'Order Management',
      href: '/orders',
      icon: ShoppingCart,
    },
    {
      title: 'Menu Management',
      href: '/menumanagement',
      icon: UtensilsCrossed,
    },
    {
      title: 'Toppings & Ingredients',
      href: '/toppingsingredients',
      icon: Gift,
    },
    {
      title: 'Deals & Coupons',
      href: '/dealscoupons',
      icon: Gift,
    },
    {
      title: 'Customers',
      href: '/customers',
      icon: Users,
    },
    {
      title: 'Reviews & Ratings',
      href: '/reviews',
      icon: Star,
    },
    {
      title: 'Payments & Transactions',
      href: '#',
      icon: CreditCard,
    },
  ]

  return (
    <Sidebar>
      <SidebarHeader className="border-b px-4 py-3">
        <h2 className="text-lg font-bold">SeaGo Valle</h2>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
            return (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className="flex items-center gap-3"
                >
                  <Link href={item.href}>
                    <Icon className="h-4 w-4" />
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>
    </Sidebar>
  )
}

export default AppSidebar