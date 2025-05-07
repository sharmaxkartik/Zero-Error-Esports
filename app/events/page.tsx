import Image from "next/image"
import Link from "next/link"
import { Calendar, ChevronRight, MapPin, Users } from "lucide-react"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>

        {/* Background image */}
        <div className="absolute inset-0">
          <Image src="/placeholder.svg?height=400&width=1200" alt="Events Background" fill className="object-cover" />
        </div>

        {/* Hero content */}
        <div className="container mx-auto relative z-20 h-full flex flex-col justify-center px-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight">
            UPCOMING <span className="text-red-600">EVENTS</span>
          </h1>
          <p className="text-lg text-zinc-300 mt-4 max-w-2xl">
            Join us at our tournaments, exhibitions, and community gatherings
          </p>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Event image */}
            <div className="md:w-1/2">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image src="/placeholder.svg?height=400&width=600" alt="Featured Event" fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-red-600 px-4 py-2 uppercase text-sm font-bold">Featured</div>
              </div>
            </div>

            {/* Event details */}
            <div className="md:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl font-bold uppercase mb-4">FasterUI Championship Series 2025</h2>

              <div className="flex items-center gap-2 text-zinc-400 mb-2">
                <Calendar className="h-5 w-5" />
                <span>June 15-20, 2025</span>
              </div>

              <div className="flex items-center gap-2 text-zinc-400 mb-6">
                <MapPin className="h-5 w-5" />
                <span>Los Angeles Convention Center, CA</span>
              </div>

              <p className="text-zinc-300 mb-6">
                The premier esports event of the year returns with an expanded format, featuring competitions across
                multiple game titles, meet-and-greets with pro players, exclusive merchandise, and more. Don't miss the
                biggest FasterUI event of the year!
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm">FPS Tournament</span>
                <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm">MOBA Championship</span>
                <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm">Fighting Games</span>
                <span className="bg-zinc-800 px-3 py-1 rounded-full text-sm">Fan Activities</span>
              </div>

              <Link
                href="#"
                className="bg-red-600 text-white px-6 py-3 uppercase font-bold text-sm w-fit flex items-center hover:bg-red-700 transition-colors"
              >
                Register Now
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold uppercase mb-12">
            UPCOMING <span className="text-red-600">EVENTS</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Event cards */}
            {[
              {
                title: "FasterUI Open Tournament",
                date: "July 8-10, 2025",
                location: "New York, NY",
                participants: "32 Teams",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                title: "Community Meetup Day",
                date: "August 15, 2025",
                location: "Chicago, IL",
                participants: "Open Registration",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                title: "Pro Player Bootcamp",
                date: "September 5-12, 2025",
                location: "Seattle, WA",
                participants: "Invitation Only",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                title: "College Invitational",
                date: "October 22-24, 2025",
                location: "Austin, TX",
                participants: "16 College Teams",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                title: "Winter Showdown",
                date: "December 12-14, 2025",
                location: "Denver, CO",
                participants: "24 Teams",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                title: "New Year's Gaming Festival",
                date: "December 30-31, 2025",
                location: "Las Vegas, NV",
                participants: "Open Registration",
                image: "/placeholder.svg?height=250&width=400",
              },
            ].map((event, index) => (
              <div key={index} className="bg-zinc-900 rounded-lg overflow-hidden group">
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-4">{event.title}</h3>

                  <div className="flex items-center gap-2 text-zinc-400 mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">{event.date}</span>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-400 mb-2">
                    <MapPin className="h-4 w-4" />
                    <span className="text-sm">{event.location}</span>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-400 mb-4">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{event.participants}</span>
                  </div>

                  <Link
                    href="#"
                    className="text-red-600 flex items-center text-sm uppercase font-bold hover:text-red-500 transition-colors"
                  >
                    Learn More
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Events */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold uppercase mb-12">
            PAST <span className="text-red-600">EVENTS</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Past event cards */}
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="relative h-[250px] overflow-hidden rounded-lg group">
                <Image
                  src={`/placeholder.svg?height=250&width=300`}
                  alt={`Past Event ${item}`}
                  fill
                  alt={`Past Event ${item}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Link href="#" className="bg-red-600 text-white px-4 py-2 uppercase font-bold text-sm">
                    View Gallery
                  </Link>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
                  <h3 className="text-sm font-bold">FasterUI Tournament {2024 - item}</h3>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="#"
              className="bg-zinc-800 text-white px-6 py-3 uppercase font-bold text-sm inline-flex items-center hover:bg-zinc-700 transition-colors"
            >
              View All Past Events
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
