"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Trophy,
  Gamepad2,
  Users,
  Video,
  Flame,
  Briefcase,
  Handshake,
  DollarSign,
  Star,
  Calendar,
  Target,
  Award,
  Zap,
  Crown,
  Gift,
  Camera,
  MapPin,
  GraduationCap,
  MessageCircle,
} from "lucide-react";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
  viewport: { once: true },
};

const staggerContainer = {
  initial: {},
  whileInView: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const scaleOnHover = {
  whileHover: { scale: 1.05 },
  transition: { type: "spring", stiffness: 300 },
};

const FeatureCard = ({
  icon: Icon,
  title,
  features,
}: {
  icon: any;
  title: string;
  features: string[];
}) => (
  <motion.div
    {...fadeInUp}
    {...scaleOnHover}
    className="bg-gradient-to-br from-gray-900/50 to-red-900/20 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 h-full"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="p-2 bg-red-500/20 rounded-lg">
        <Icon className="h-6 w-6 text-red-400" />
      </div>
      <h3 className="text-xl font-bold text-white">{title}</h3>
    </div>
    <ul className="space-y-3">
      {features.map((feature, index) => (
        <motion.li
          key={index}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start gap-2 text-gray-300"
        >
          <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
          <span>{feature}</span>
        </motion.li>
      ))}
    </ul>
  </motion.div>
);

export default function ZEClubPage() {
  const gamingFeatures = [
    "Weekly Tournaments – BGMI, FIFA, WWE 2K, Valorant & more",
    "Paid Scrims with Prize Pools – Earn money while playing",
    "Free Game Nights – Fun lobbies & community favorites (Fall Guys, Skribbl)",
    "LAN Events – True esports vibes in offline mode",
  ];

  const recognitionFeatures = [
    "ZE Rank System – Climb the leaderboards & show off your skill",
    "Player of the Month – Earn fame & prizes",
    "Social Media Shoutouts – Get featured on our official pages",
    "Exclusive Titles on Discord – Flex your status",
    "Merch & Free Entry Giveaways – Powered by ZePoints loyalty",
  ];

  const contentFeatures = [
    "Player Interviews & Highlights – Show your journey",
    "Creator Spotlights – For our local streamers & content makers",
    "Stream Support – Grow your channel with our help",
    "UGC Events – Meme, montage & reel competitions",
  ];

  const experienceFeatures = [
    "Offline Gaming Meets – Bond over snacks & matches",
    "Watch Parties – Live esports finals with the squad",
    "Crossover Events – Gaming + music, cosplay, quizzes",
    "VIP Finals Access – Sit where the action is",
  ];

  const opportunityFeatures = [
    "Internships – Event management, editing, casting, marketing",
    "Freelance Gigs – Paid work for GFX, editors, casters",
    "Esports Team Trials – Be scouted for Team ZE",
    "Training Camps – Learn FIFA strategies, BGMI tactics & more",
  ];

  const communityFeatures = [
    "Active Discord Roles & Badges – Earn your place",
    "Birthday & Anniversary Shoutouts – We celebrate you",
    "Gaming Talks & Mentorship – For skills & well-being",
    "Mini ZE Teams – Compete in internal leagues",
  ];

  const dealFeatures = [
    "Partner Cafe Discounts – Save while you play",
    "Early Tournament Access – Get in before it's full",
    "Merch & Entry Coupons – Exclusive for members",
    "Priority Registration – Never miss a slot",
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative py-32 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-black to-gray-900/50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-red-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-600 to-red-400 text-white px-6 py-2 rounded-full text-lg font-semibold mb-6">
              <Crown className="h-5 w-5" />
              ZE Club Membership
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-white via-red-200 to-red-400 bg-clip-text text-transparent"
          >
            ZE CLUB
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl text-gray-300 mb-8 max-w-4xl mx-auto font-light"
          >
            Your Gateway to the Ultimate Gaming Life
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a
              href="https://docs.google.com/forms/d/e/1FAIpQLSfNRqOlaidZAyxlxKswBa9zf4Blbbg1Hk_iQwbB7ywrrNWFsQ/viewform"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-12 py-4 rounded-full text-xl font-bold shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-105"
            >
              Join ZE Club Now
            </a>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          >
            <FeatureCard
              icon={Gamepad2}
              title="Gaming Opportunities"
              features={gamingFeatures}
            />

            <FeatureCard
              icon={Trophy}
              title="Recognition & Rewards"
              features={recognitionFeatures}
            />

            <FeatureCard
              icon={Video}
              title="Content Exposure"
              features={contentFeatures}
            />

            <FeatureCard
              icon={Flame}
              title="Experiences & Events"
              features={experienceFeatures}
            />

            <FeatureCard
              icon={Briefcase}
              title="Opportunities"
              features={opportunityFeatures}
            />

            <FeatureCard
              icon={Handshake}
              title="Community & Belonging"
              features={communityFeatures}
            />
          </motion.div>

          {/* Full-width bottom card */}
          <motion.div {...fadeInUp} className="mt-8">
            <FeatureCard
              icon={DollarSign}
              title="Deals & Discounts"
              features={dealFeatures}
            />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-gray-900/50 to-red-900/20">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            {...fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-16 text-white"
          >
            Join the <span className="text-red-400">ZE Army</span>
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="whileInView"
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
          >
            {[
              { number: "500+", label: "Active Members", icon: Users },
              { number: "100+", label: "Weekly Tournaments", icon: Calendar },
              {
                number: "₹50K+",
                label: "Prize Money Distributed",
                icon: Award,
              },
              {
                number: "24/7",
                label: "Community Support",
                icon: MessageCircle,
              },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="bg-gradient-to-br from-black/50 to-red-900/20 backdrop-blur-sm border border-red-500/20 rounded-xl p-6 text-center"
              >
                <stat.icon className="h-8 w-8 text-red-400 mx-auto mb-4" />
                <div className="text-3xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            {...fadeInUp}
            className="bg-gradient-to-br from-red-900/30 to-gray-900/50 backdrop-blur-sm border border-red-500/30 rounded-2xl p-12"
          >
            <Gift className="h-16 w-16 text-red-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
              Ready to Level Up?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of gamers who have already transformed their
              passion into opportunities. Be part of the ultimate gaming
              community.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://docs.google.com/forms/d/e/1FAIpQLSfNRqOlaidZAyxlxKswBa9zf4Blbbg1Hk_iQwbB7ywrrNWFsQ/viewform"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg shadow-red-900/50 transition-all duration-300 hover:scale-105"
              >
                Join ZE Club
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
