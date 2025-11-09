'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

interface Reward {
  _id: string;
  name: string;
  description: string;
  cost: number;
  stock: number;
}

export default function Rewards() {
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchRewards() {
      try {
        const response = await fetch('/api/ze-club/rewards');
        if (!response.ok) {
          throw new Error('Failed to fetch rewards');
        }
        const data = await response.json();
        setRewards(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchRewards();
  }, []);

  async function handleRedeem(rewardId: string) {
    try {
      const response = await fetch('/api/ze-club/rewards/redeem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rewardId }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to redeem reward');
      }

      toast({
        title: 'Success!',
        description: 'Reward redeemed successfully.',
      });
      
      // Optimistically update the UI or refetch rewards
      setRewards(prevRewards => 
        prevRewards.map(r => 
          r._id === rewardId ? { ...r, stock: r.stock - 1 } : r
        ).filter(r => r.stock > 0)
      );

    } catch (err) {
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'An unknown error occurred',
        variant: 'destructive',
      });
    }
  }

  if (loading) {
    return (
      <div className="relative z-10 text-white">
        <p className="text-xl">Loading rewards...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="relative z-10 text-white">
        <p className="text-xl text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="relative z-10 text-white">
      <h2 className="text-3xl font-bold tracking-tight mb-6 text-white">Rewards</h2>
      {rewards.length === 0 ? (
        <p className="text-xl text-gray-400">No rewards available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rewards.map((reward) => (
            <Card key={reward._id} className="bg-gray-900/90 border-red-900/30 text-white">
              <CardHeader>
                <CardTitle className="text-white">{reward.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{reward.description}</p>
                <p className="mt-4 font-semibold text-red-500">{reward.cost} Points</p>
                <p className="text-sm text-gray-400">
                  {reward.stock} remaining
                </p>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => handleRedeem(reward._id)} 
                  disabled={reward.stock <= 0}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Redeem
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
