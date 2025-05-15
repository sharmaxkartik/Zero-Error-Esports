"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Users,
  Trophy,
  ArrowRight,
  Gamepad2,
  Calendar,
  Tv,
  Briefcase,
  Building,
  Handshake,
} from "lucide-react";

// Services data
const services = [
  {
    id: 1,
    title: "Gaming Tournaments & Events",
    category: "Events",
    image: "/images/GamingTournament&Events.png?height=400&width=600",
    description:
      "We host online & offline competitions – from small scrims to mega arena-level events.",
    featured: true,
    icon: Trophy,
    details: [
      "Arena-scale competitive tournaments",
      "Community gaming events",
      "Custom leagues and championships",
      "Comprehensive event management",
    ],
  },
  {
    id: 2,
    title: "Talent Management & Team Building",
    category: "Talent",
    image: "/images/TalentManagement.png?height=400&width=600",
    description:
      "We scout and train passionate players and help them grow as professionals.",
    featured: true,
    icon: Users,
    details: [
      "Pro player scouting and development",
      "Team formation and management",
      "Career coaching for esports athletes",
      "Professional skills training",
    ],
  },
  {
    id: 3,
    title: "Content Creation & Streaming Collabs",
    category: "Content",
    image: "/images/BrandActivation.png?height=400&width=600",
    description:
      "Support for streamers, casters, and editors – we help you build your content brand.",
    featured: true,
    icon: Tv,
    details: [
      "Streaming setup and optimization",
      "Content strategy development",
      "Creator collaborations and networking",
      "Audience building and engagement",
    ],
  },
  {
    id: 4,
    title: "Campus & Café Esports Integration",
    category: "Integration",
    image: "/images/minecraft.jpeg?height=400&width=600",
    description:
      "Bring Zero Error to your college or gaming zone with custom events, workshops & leagues.",
    featured: false,
    icon: Building,
    details: [
      "Campus esports program development",
      "Gaming café partnership programs",
      "Educational workshops and seminars",
      "Custom collegiate competitions",
    ],
  },
  {
    id: 5,
    title: "Brand Partnerships & Sponsorship Activation",
    category: "Partnerships",
    image: "/images/gow.jpg?height=400&width=600",
    description:
      "We connect youth audiences with aligned brands through esports narratives.",
    featured: false,
    icon: Handshake,
    details: [
      "Brand integration in esports events",
      "Targeted marketing campaigns",
      "Sponsored team opportunities",
      "Custom activation solutions",
    ],
  },
];

// Service card component
const ServiceCard = ({
  service,
  featured = false,
}: {
  service: (typeof services)[0];
  featured?: boolean;
}) => {
  const Icon = service.icon;

  return (
    <motion.div
      className="h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      <div className="group h-full relative overflow-hidden rounded-xl border border-zinc-800/50 bg-gradient-to-b from-zinc-900/80 to-black shadow-lg hover:shadow-red-900/20 transition-all duration-500">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={service.image || "/placeholder.svg"}
            alt={service.title}
            fill
            className="object-cover opacity-40 transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>

          {/* Dynamic accent light */}
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>
        </div>

        <div className="relative z-10 p-6 h-full flex flex-col">
          <div className="mb-2">
            <span className="bg-red-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
              {service.category}
            </span>
            {featured && (
              <span className="ml-2 bg-zinc-900/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium flex items-center inline-flex">
                <Trophy className="w-3 h-3 mr-1 text-yellow-500" />
                Featured
              </span>
            )}
          </div>

          <div className="mt-3 flex items-center">
            <div className="p-2.5 bg-red-600/10 rounded-lg mr-3">
              <Icon className="w-5 h-5 text-red-500" />
            </div>
            <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors duration-300 font-orbitron">
              {service.title}
            </h3>
          </div>

          <p className="text-zinc-300 text-sm mt-3 mb-4">
            {service.description}
          </p>

          <div className="mt-auto">
            <h4 className="text-xs font-semibold text-zinc-200 mb-2">
              KEY FEATURES
            </h4>
            <ul className="text-zinc-300 text-xs space-y-2 mb-4">
              {service.details.map((detail, idx) => (
                <li key={idx} className="flex items-start">
                  <span className="text-red-500 mr-1.5 mt-0.5">•</span>
                  <span>{detail}</span>
                </li>
              ))}
            </ul>

            <Link href={`/services/${service.id}`} className="inline-block">
              <button className="text-xs font-medium bg-red-600/20 hover:bg-red-600/30 text-red-400 px-4 py-2 rounded-md transition-all duration-300 flex items-center">
                Learn more <ArrowRight className="ml-1 w-3 h-3" />
              </button>
            </Link>
          </div>
        </div>

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-600/20 to-transparent"></div>
      </div>
    </motion.div>
  );
};

export default function ServicesPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  // Handle mouse movement for dynamic effects
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(timer);
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1.0] },
    },
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white overflow-hidden">
      {/* Global dynamic background elements */}
      <div className="fixed inset-0 z-0">
        {/* Dynamic gradient background that moves with mouse */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-black via-red-950/10 to-black/80 z-0"
          style={{
            backgroundPosition: `${mousePosition.x * 100}% ${
              mousePosition.y * 100
            }%`,
            transition: "background-position 0.8s ease-out",
          }}
        />

        {/* Abstract cyberpunk grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,0,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,0,0,0.05)_1px,transparent_1px)] bg-[size:70px_70px] opacity-20 z-0"></div>

        {/* Animated scan lines */}
        <div className="absolute inset-0 scan-lines opacity-8 z-0"></div>

        {/* Particle overlay - use with a custom CSS class */}
        <div className="absolute inset-0 particle-overlay z-0"></div>

        {/* Dynamic vignette effect */}
        <div className="absolute inset-0 bg-radial-gradient opacity-70 z-0"></div>
      </div>

      {/* Hero Section - Using new design */}
      <section className="relative h-[400px] overflow-hidden pt-24">
        {/* Background grid effect */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.5)_2px,transparent_2px),linear-gradient(90deg,rgba(20,20,20,0.5)_2px,transparent_2px)] bg-[size:40px_40px] opacity-30 z-10"></div>

        {/* Red glowing orbs */}
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-red-600/10 filter blur-[120px] z-10"></div>
        <div className="absolute bottom-[-30%] left-[-20%] w-[500px] h-[500px] rounded-full bg-red-600/5 filter blur-[100px] z-10"></div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/banner.jpg?height=400&width=1200"
            alt="Services Background"
            fill
            className="object-cover"
          />
        </div>

        {/* Scan lines effect */}
        <div className="absolute inset-0 z-10 scan-lines opacity-20"></div>

        {/* Hero content */}
        <div className="container mx-auto relative z-20 h-full flex flex-col justify-center px-6">
          <motion.h1
            className="text-4xl md:text-6xl font-black uppercase leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            OUR{" "}
            <motion.span
              className="text-red-600 inline-block"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ scale: 1.05 }}
            >
              SERVICES
            </motion.span>
          </motion.h1>
          <motion.p
            className="text-lg text-zinc-300 mt-4 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Professional esports solutions tailored to your needs
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-6"
          >
            <Link href="/about">
              <motion.button
                className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-medium text-lg transition-all duration-300 flex items-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                Get In Touch <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>
            </Link>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute bottom-0 left-0 w-full h-20 bg-gradient-to-t from-black to-transparent z-10"></div>
      </section>

      {/* Services Grid Section */}
      <section className="relative py-12 pb-32">
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2
            className="text-3xl font-bold uppercase mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            WHAT WE <span className="text-red-600">OFFER</span>
          </motion.h2>

          {/* Featured Services */}
          <div className="mb-20">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h2 className="text-3xl md:text-4xl font-bold font-orbitron">
                  <span className="text-red-600">Core</span> SERVICES
                </h2>
                <p className="text-zinc-400 mt-2 max-w-xl">
                  Our premium offerings that define the Zero Error experience
                </p>
              </div>
            </motion.div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services
                .filter((service) => service.featured)
                .map((service) => (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    className="h-full"
                  >
                    <div className="group h-full relative overflow-hidden rounded-xl border border-zinc-800/50 bg-gradient-to-b from-zinc-900/80 to-black shadow-lg hover:shadow-red-900/20 transition-all duration-500">
                      <div className="absolute inset-0 overflow-hidden">
                        <Image
                          src={service.image || "/placeholder.svg"}
                          alt={service.title}
                          fill
                          className="object-cover opacity-40 transition-transform duration-700 ease-in-out group-hover:scale-110 group-hover:opacity-50"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>

                        {/* Dynamic accent light */}
                        <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-red-600/20 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>
                      </div>

                      <div className="relative z-10 p-6 h-full flex flex-col">
                        <div className="mb-2">
                          <span className="bg-red-600/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                            {service.category}
                          </span>
                          {service.featured && (
                            <span className="ml-2 bg-zinc-900/90 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium flex items-center inline-flex">
                              <Trophy className="w-3 h-3 mr-1 text-yellow-500" />
                              Featured
                            </span>
                          )}
                        </div>

                        <div className="mt-3 flex items-center">
                          <div className="p-2.5 bg-red-600/10 rounded-lg mr-3">
                            <service.icon className="w-5 h-5 text-red-500" />
                          </div>
                          <h3 className="text-xl font-bold group-hover:text-red-400 transition-colors duration-300 font-orbitron">
                            {service.title}
                          </h3>
                        </div>

                        <p className="text-zinc-300 text-sm mt-3 mb-4">
                          {service.description}
                        </p>

                        <div className="mt-auto">
                          <h4 className="text-xs font-semibold text-zinc-200 mb-2">
                            KEY FEATURES
                          </h4>
                          <ul className="text-zinc-300 text-xs space-y-2 mb-4">
                            {service.details
                              .map((detail, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="text-red-500 mr-1.5 mt-0.5">
                                    •
                                  </span>
                                  <span>{detail}</span>
                                </li>
                              ))
                              .slice(0, 3)}
                          </ul>

                          <Link
                            href={`/services/${service.id}`}
                            className="inline-block"
                          ></Link>
                        </div>
                      </div>

                      {/* Corner accent */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-red-600/20 to-transparent"></div>
                    </div>
                  </motion.div>
                ))}
            </motion.div>
          </div>

          {/* Additional Services */}
          <div>
            <div className="flex items-center mb-8">
              <h2 className="text-2xl font-bold font-orbitron">
                <span className="text-red-600">Additional</span> OFFERINGS
              </h2>
              <div className="ml-4 h-px bg-gradient-to-r from-red-600 to-transparent flex-grow"></div>
            </div>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {services
                .filter((service) => !service.featured)
                .map((service) => (
                  <motion.div
                    key={service.id}
                    variants={itemVariants}
                    className="h-full"
                  >
                    <ServiceCard
                      key={service.id}
                      service={service}
                      featured={false}
                    />
                  </motion.div>
                ))}
            </motion.div>
          </div>
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 text-center bg-gradient-to-r from-red-900/20 via-black to-red-900/20 rounded-2xl p-12 border border-red-900/20"
        >
          <h2 className="text-3xl font-bold mb-4 font-orbitron">
            READY TO <span className="text-red-600">LEVEL UP</span> YOUR ESPORTS
            JOURNEY?
          </h2>
          <p className="text-xl text-zinc-300 mb-8 max-w-2xl mx-auto">
            Whether you're looking to organize a tournament, develop talent, or
            build your brand through esports, Zero Error is your trusted
            partner. Let's collaborate to create exceptional gaming experiences!
          </p>
          <Link href="/about">
            <motion.button
              className="bg-gradient-to-r from-red-600 to-red-700 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center mx-auto"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(220, 38, 38, 0.5)",
              }}
              whileTap={{ scale: 0.98 }}
            >
              Get Started Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </motion.button>
          </Link>
        </motion.div>
      </section>
    </div>
  );
}
