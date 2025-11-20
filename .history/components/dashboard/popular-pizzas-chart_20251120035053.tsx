"use client";

import { usePopularPizzas } from "@/lib/hooks/use-popular-pizzas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PopularPizzasChart() {
  const { data: pizzas = [], isLoading, error } = usePopularPizzas();

  const maxSold =
    pizzas.length > 0 ? Math.max(...pizzas.map((p) => p.totalSold)) : 1;

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Popular Pizzas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-2 w-40" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Popular Pizzas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-destructive">
            Failed to load popular pizzas
          </div>
        </CardContent>
      </Card>
    );
  }

  if (pizzas.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Popular Pizzas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground">
            No pizza data available
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className=" h-full">
      <CardHeader>
        <CardTitle className="flex item-center justify-between"><h3 className="text-b">Popular Pizzas</h3> <h3>sold</h3></CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pizzas.map((pizza) => (
            <div
              key={pizza._id}
              className="flex items-center h-full justify-between"
            >
              <span className="text-sm font-medium">{pizza.name}</span>
              <div className="flex items-center gap-2">
                {/* <div className="w-32 bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${(pizza.totalSold / maxSold) * 100}%` }}
                  />
                </div> */}
                <span className="text-sm font-semibold">
                  {pizza.totalSold}{" "}
                </span>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
