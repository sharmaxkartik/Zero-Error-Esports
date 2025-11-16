'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Gift, Coins, ShoppingBag, Star, Sparkles, TrendingUp, Package } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

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
  const [userPoints, setUserPoints] = useState(0);
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch rewards and user points in parallel
        const [rewardsResponse, dashboardResponse] = await Promise.all([
          fetch('/api/ze-club/rewards'),
          fetch('/api/ze-club/user/dashboard')
        ]);

        if (!rewardsResponse.ok) {
          throw new Error('Failed to fetch rewards');
        }
        const rewardsData = await rewardsResponse.json();
        setRewards(rewardsData);

        if (dashboardResponse.ok) {
          const dashboardData = await dashboardResponse.json();
          setUserPoints(dashboardData.totalPoints || 0);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  async function handleRedeem(rewardId: string, cost: number) {
    if (userPoints < cost) {
      toast({
        title: 'Insufficient Points',
        description: `You need ${cost - userPoints} more points to redeem this reward.`,
        variant: 'destructive',
      });
      return;
    }

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
        title: 'Success! 🎉',
        description: 'Reward redeemed successfully. Check your email for details.',
      });
      
      // Update local state
      setRewards(prevRewards => 
        prevRewards.map(r => 
          r._id === rewardId ? { ...r, stock: r.stock - 1 } : r
        ).filter(r => r.stock > 0)
      );
      setUserPoints(prev => prev - cost);

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
        className="relative z-10 text-white flex items-center justify-center h-64"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex items-center gap-3">
          <ShoppingBag className="h-6 w-6 text-red-500 animate-pulse" />
          <p className="text-xl">Loading rewards...</p>
        </div>
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
        <div className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 backdrop-blur-sm">
          <p className="text-xl text-red-400">Error: {error}</p>
        </div>
      </motion.div>
    );
  }

  const rewardIcons = [Gift, Star, Sparkles, Package, TrendingUp];

  return (
    <motion.div 
      className="relative z-10 text-white"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <motion.h1 
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          🎁 Rewards Store
        </motion.h1>
        <p className="text-gray-400 text-sm sm:text-base md:text-lg">Redeem your hard-earned points for exclusive rewards</p>
      </div>

      {/* User Points Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-4 sm:mb-6"
      >
        <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30 backdrop-blur-xl">
          <CardContent className="pt-4 sm:pt-6 px-3 sm:px-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-gradient-to-br from-purple-500 to-pink-600">
                  <Coins className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Your Balance</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {userPoints} Points
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Available Rewards</p>
                <p className="text-2xl font-bold text-white">{rewards.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Rewards Grid */}
      {rewards.length === 0 ? (
        <motion.div 
          className="text-center py-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          <Package className="h-16 w-16 text-gray-600 mx-auto mb-4" />
          <p className="text-xl text-gray-400">No rewards available at the moment.</p>
          <p className="text-sm text-gray-500 mt-2">Check back soon for new rewards!</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {rewards.map((reward, index) => {
            const Icon = rewardIcons[index % rewardIcons.length];
            const canAfford = userPoints >= reward.cost;
            const isLowStock = reward.stock <= 3;
            
            return (
              <motion.div
                key={reward._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                whileHover={{ scale: 1.03, y: -8 }}
                className="h-full"
              >
                <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700/50 backdrop-blur-xl text-white h-full flex flex-col relative overflow-hidden group">
                  {/* Gradient overlay */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500 to-orange-600 opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500" />
                  
                  {/* Low stock badge */}
                  {isLowStock && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge variant="destructive" className="bg-red-600/90 backdrop-blur-sm">
                        Only {reward.stock} left!
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="relative z-10">
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="p-3 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 shadow-lg">
                        <Icon className="h-8 w-8 text-white" />
                      </div>
                    </div>
                    <CardTitle className="text-white text-xl font-bold">{reward.name}</CardTitle>
                    <CardDescription className="text-gray-300 text-sm">
                      {reward.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="flex-1 relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Coins className="h-5 w-5 text-yellow-400" />
                        <span className="text-2xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                          {reward.cost}
                        </span>
                      </div>
                      {!canAfford && (
                        <Badge variant="outline" className="text-xs border-red-500/50 text-red-400">
                          Need {reward.cost - userPoints} more
                        </Badge>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm">
                      <Package className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400">
                        {reward.stock} {reward.stock === 1 ? 'item' : 'items'} remaining
                      </span>
                    </div>
                  </CardContent>

                  <CardFooter className="relative z-10">
                    <Button 
                      onClick={() => handleRedeem(reward._id, reward.cost)} 
                      disabled={reward.stock <= 0 || !canAfford}
                      className={`w-full font-semibold transition-all ${
                        canAfford 
                          ? 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg hover:shadow-red-500/50' 
                          : 'bg-gray-700 cursor-not-allowed'
                      }`}
                    >
                      {reward.stock <= 0 ? '❌ Out of Stock' : canAfford ? '🎁 Redeem Now' : '🔒 Not Enough Points'}
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </motion.div>
  );
}
