'use client';

import { useState, useEffect } from 'react';
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Trophy, Medal, Crown, TrendingUp, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface LeaderboardUser {
  _id: string;
  name: string;
  points: number;
  rank: number;
}

export default function Leaderboard() {
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    async function fetchLeaderboard() {
      try {
        const response = await fetch('/api/ze-club/leaderboard');
        if (!response.ok) {
          throw new Error('Failed to fetch leaderboard');
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setLoading(false);
      }
    }

    fetchLeaderboard();
  }, []);

  useEffect(() => {
    let filtered = users;
    
    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Category filter (can be extended)
    if (activeFilter === 'top10') {
      filtered = filtered.slice(0, 10);
    }
    
    setFilteredUsers(filtered);
  }, [searchQuery, activeFilter, users]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-300" />;
      case 3:
        return <Medal className="h-6 w-6 text-orange-600" />;
      default:
        return <Trophy className="h-5 w-5 text-gray-500" />;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 border-yellow-500/50';
      case 2:
        return 'bg-gradient-to-r from-gray-400/20 to-gray-500/20 border-gray-400/50';
      case 3:
        return 'bg-gradient-to-r from-orange-500/20 to-orange-600/20 border-orange-500/50';
      default:
        return 'hover:bg-gray-800/30';
    }
  };

  const topThree = filteredUsers.slice(0, 3);
  const restUsers = filteredUsers.slice(3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-white"
    >
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-500 via-red-500 to-orange-500 bg-clip-text text-transparent">
          🏆 Leaderboard
        </h1>
        <p className="text-gray-400 text-lg">See where you stand among the champions</p>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700/50 backdrop-blur-xl mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search players..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-800/50 border-gray-700 text-white placeholder:text-gray-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={activeFilter === 'all' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('all')}
                className={activeFilter === 'all' ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                All Players
              </Button>
              <Button
                variant={activeFilter === 'top10' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveFilter('top10')}
                className={activeFilter === 'top10' ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                Top 10
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center justify-center h-64"
        >
          <div className="text-xl text-gray-400 flex items-center gap-3">
            <TrendingUp className="h-6 w-6 text-red-500 animate-pulse" />
            Loading leaderboard...
          </div>
        </motion.div>
      ) : error ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-red-900/20 border border-red-500/50 rounded-xl p-6 backdrop-blur-sm"
        >
          <p className="text-red-400">Error: {error}</p>
        </motion.div>
      ) : (
        <>
          {/* Top 3 Podium */}
          {topThree.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* 2nd Place */}
                {topThree[1] && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="md:order-1"
                  >
                    <Card className="bg-gradient-to-br from-gray-400/10 to-gray-500/10 border-gray-400/30 backdrop-blur-xl text-center p-6 h-full relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-gray-400 to-gray-500 opacity-10 blur-3xl" />
                      <div className="relative z-10">
                        <div className="flex justify-center mb-4">
                          <div className="relative">
                            <div className="p-4 rounded-full bg-gradient-to-br from-gray-400 to-gray-500 shadow-xl">
                              <Medal className="h-10 w-10 text-white" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-gray-900 rounded-full px-3 py-1 text-xs font-bold border-2 border-gray-400">
                              2nd
                            </div>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{topThree[1].name}</h3>
                        <p className="text-2xl font-bold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent">
                          {topThree[1].points} pts
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* 1st Place */}
                {topThree[0] && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="md:order-2"
                  >
                    <Card className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 border-yellow-500/50 backdrop-blur-xl text-center p-6 md:scale-110 h-full relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-400 to-orange-500 opacity-20 blur-3xl" />
                      <div className="relative z-10">
                        <div className="flex justify-center mb-4">
                          <div className="relative">
                            <div className="p-5 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 shadow-2xl shadow-yellow-500/50 animate-pulse">
                              <Crown className="h-12 w-12 text-white" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-gray-900 rounded-full px-3 py-1 text-sm font-bold border-2 border-yellow-400">
                              1st
                            </div>
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{topThree[0].name}</h3>
                        <p className="text-3xl font-bold bg-gradient-to-r from-yellow-300 to-orange-400 bg-clip-text text-transparent">
                          {topThree[0].points} pts
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                )}

                {/* 3rd Place */}
                {topThree[2] && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="md:order-3"
                  >
                    <Card className="bg-gradient-to-br from-orange-600/10 to-orange-700/10 border-orange-600/30 backdrop-blur-xl text-center p-6 h-full relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-600 opacity-10 blur-3xl" />
                      <div className="relative z-10">
                        <div className="flex justify-center mb-4">
                          <div className="relative">
                            <div className="p-4 rounded-full bg-gradient-to-br from-orange-500 to-orange-700 shadow-xl">
                              <Medal className="h-10 w-10 text-white" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-gray-900 rounded-full px-3 py-1 text-xs font-bold border-2 border-orange-600">
                              3rd
                            </div>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">{topThree[2].name}</h3>
                        <p className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                          {topThree[2].points} pts
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}

          {/* Rest of Leaderboard */}
          <Card className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 border-gray-700/50 backdrop-blur-xl overflow-hidden">
            <CardHeader>
              <CardTitle className="text-2xl text-white">All Rankings</CardTitle>
            </CardHeader>
            <CardContent className="overflow-x-auto">
              {filteredUsers.length === 0 ? (
                <p className="text-center text-gray-400 py-8">No players found.</p>
              ) : (
                <div className="min-w-full">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-gray-700/50 hover:bg-transparent">
                        <TableHead className="w-[100px] text-gray-400">Rank</TableHead>
                        <TableHead className="text-gray-400">Player</TableHead>
                        <TableHead className="text-right text-gray-400">Points</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {(topThree.length > 0 ? restUsers : filteredUsers).map((user, index) => (
                        <motion.tr
                          key={user._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: (index + 3) * 0.05 }}
                          className={`border-gray-700/50 transition-all ${getRankColor(user.rank)}`}
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              {getRankIcon(user.rank)}
                              <span className="text-white font-bold">#{user.rank}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-white font-medium">{user.name}</TableCell>
                          <TableCell className="text-right">
                            <span className="text-red-400 font-bold text-lg">
                              {user.points}
                            </span>
                          </TableCell>
                        </motion.tr>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      )}
    </motion.div>
  );
}
