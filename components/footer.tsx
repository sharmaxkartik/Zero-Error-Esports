import Link from "next/link";
import {
  Instagram,
  Twitter,
  Linkedin,
  MessageSquare,
  Send,
} from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-zinc-950 py-16 border-t border-zinc-800">
      <div className="container mx-auto px-6">
        {/* Social Media Icons */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {/* Instagram */}
          <Link
            href="https://instagram.com"
            target="_blank"
            className="group"
            aria-label="Instagram"
          >
            <div className="bg-zinc-900 p-5 rounded-full group-hover:bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 transition-colors duration-300">
              <Instagram className="h-8 w-8" />
            </div>
          </Link>

          {/* Twitter/X */}
          <Link
            href="https://twitter.com"
            target="_blank"
            className="group"
            aria-label="Twitter"
          >
            <div className="bg-zinc-900 p-5 rounded-full group-hover:bg-black transition-colors duration-300">
              <Twitter className="h-8 w-8" />
            </div>
          </Link>

          {/* LinkedIn */}
          <Link
            href="https://linkedin.com"
            target="_blank"
            className="group"
            aria-label="LinkedIn"
          >
            <div className="bg-zinc-900 p-5 rounded-full group-hover:bg-blue-600 transition-colors duration-300">
              <Linkedin className="h-8 w-8" />
            </div>
          </Link>

          {/* Discord */}
          <Link
            href="https://discord.com"
            target="_blank"
            className="group"
            aria-label="Discord"
          >
            <div className="bg-zinc-900 p-5 rounded-full group-hover:bg-indigo-600 transition-colors duration-300">
              <MessageSquare className="h-8 w-8" />
            </div>
          </Link>

          {/* WhatsApp */}
          <Link
            href="https://whatsapp.com"
            target="_blank"
            className="group"
            aria-label="WhatsApp"
          >
            <div className="bg-zinc-900 p-5 rounded-full group-hover:bg-green-600 transition-colors duration-300">
              <Send className="h-8 w-8" />
            </div>
          </Link>
        </div>

        {/* Email */}
        <div className="text-center mb-12">
          <p className="text-zinc-400 mb-2 text-sm uppercase tracking-wider">
            Contact Us
          </p>
          <a
            href="mailto:contact@fasterui.com"
            className="text-xl md:text-2xl font-bold hover:text-red-600 transition-colors"
          >
            contact@fasterui.com
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-zinc-500 text-sm">
          <p>© {new Date().getFullYear()} FasterUI. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
