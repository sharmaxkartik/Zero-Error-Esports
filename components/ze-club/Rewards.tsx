'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';

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
      <motion.div 
        className="relative z-10 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xl">Loading rewards...</p>
      </motion.div>
    );
  }
  
  if (error) {
    return (
      <motion.div 
        className="relative z-10 text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xl text-red-500">Error: {error}</p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="relative z-10 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h2 
        className="text-2xl md:text-3xl font-bold tracking-tight mb-4 md:mb-6 text-white"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Rewards
      </motion.h2>
      {rewards.length === 0 ? (
        <motion.p 
          className="text-lg md:text-xl text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          No rewards available at the moment.
        </motion.p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {rewards.map((reward, index) => (
            <motion.div
              key={reward._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.03, y: -5 }}
            >
              <Card className="bg-gray-900/90 border-red-900/30 text-white h-full">
                <CardHeader>
                  <CardTitle className="text-white text-lg md:text-xl">{reward.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 text-sm md:text-base">{reward.description}</p>
                  <p className="mt-4 font-semibold text-red-500 text-base md:text-lg">{reward.cost} Points</p>
                  <p className="text-xs md:text-sm text-gray-400">
                    {reward.stock} remaining
                  </p>
                </CardContent>
                <CardFooter>
                  <Button 
                    onClick={() => handleRedeem(reward._id)} 
                    disabled={reward.stock <= 0}
                    className="bg-red-600 hover:bg-red-700 text-white w-full sm:w-auto"
                  >
                    Redeem
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
