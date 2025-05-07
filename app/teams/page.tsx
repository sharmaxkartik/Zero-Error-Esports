import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Trophy } from "lucide-react"

export default function TeamsPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>

        {/* Background image */}
        <div className="absolute inset-0">
          <Image src="/placeholder.svg?height=400&width=1200" alt="Teams Background" fill className="object-cover" />
        </div>

        {/* Hero content */}
        <div className="container mx-auto relative z-20 h-full flex flex-col justify-center px-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight">
            OUR <span className="text-red-600">TEAMS</span>
          </h1>
          <p className="text-lg text-zinc-300 mt-4 max-w-2xl">
            Meet the elite players who represent FasterUI in competitions worldwide
          </p>
        </div>
      </section>

      {/* Featured Team */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row gap-12">
            {/* Team image */}
            <div className="md:w-1/2">
              <div className="relative h-[400px] overflow-hidden rounded-lg">
                <Image src="/placeholder.svg?height=400&width=600" alt="Featured Team" fill className="object-cover" />
                <div className="absolute top-4 left-4 bg-red-600 px-4 py-2 uppercase text-sm font-bold">Featured</div>
              </div>
            </div>

            {/* Team details */}
            <div className="md:w-1/2 flex flex-col justify-center">
              <h2 className="text-3xl font-bold uppercase mb-4">FasterUI Apex</h2>
              <p className="text-zinc-300 mb-6">
                Our flagship team competing in the world's most prestigious FPS tournaments. With multiple championship
                titles and a reputation for innovative strategies, Team Apex continues to dominate the competitive
                scene.
              </p>

              <div className="flex items-center gap-2 mb-6">
                <Trophy className="h-5 w-5 text-yellow-500" />
                <span className="text-zinc-300">3x World Champions</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-zinc-900 p-4 rounded-lg">
                  <p className="text-sm text-zinc-400">Founded</p>
                  <p className="font-bold">2018</p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg">
                  <p className="text-sm text-zinc-400">Game</p>
                  <p className="font-bold">Tactical Shooter</p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg">
                  <p className="text-sm text-zinc-400">Region</p>
                  <p className="font-bold">North America</p>
                </div>
                <div className="bg-zinc-900 p-4 rounded-lg">
                  <p className="text-sm text-zinc-400">Coach</p>
                  <p className="font-bold">Marcus Williams</p>
                </div>
              </div>

              <Link
                href="#"
                className="bg-red-600 text-white px-6 py-3 uppercase font-bold text-sm w-fit flex items-center hover:bg-red-700 transition-colors"
              >
                Team Profile
                <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* All Teams */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold uppercase mb-12">
            OUR <span className="text-red-600">TEAMS</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Team cards */}
            {[
              {
                name: "FasterUI Apex",
                game: "Tactical Shooter",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                name: "FasterUI Legends",
                game: "MOBA",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                name: "FasterUI Royale",
                game: "Battle Royale",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                name: "FasterUI Fighters",
                game: "Fighting Games",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                name: "FasterUI Strategy",
                game: "RTS",
                image: "/placeholder.svg?height=250&width=400",
              },
              {
                name: "FasterUI Academy",
                game: "Multi-Game",
                image: "/placeholder.svg?height=250&width=400",
              },
            ].map((team, index) => (
              <div key={index} className="bg-zinc-900 rounded-lg overflow-hidden group">
                <div className="relative h-[200px] overflow-hidden">
                  <Image
                    src={team.image || "/placeholder.svg"}
                    alt={team.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{team.name}</h3>
                  <p className="text-zinc-400 mb-4">{team.game}</p>

                  <div className="grid grid-cols-5 gap-2 mb-6">
                    {[1, 2, 3, 4, 5].map((player) => (
                      <div key={player} className="relative h-12 w-12 rounded-full overflow-hidden">
                        <Image
                          src={`/placeholder.svg?height=48&width=48`}
                          alt={`Player ${player}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>

                  <Link
                    href="#"
                    className="text-red-600 flex items-center text-sm uppercase font-bold hover:text-red-500 transition-colors"
                  >
                    Team Details
                    <ChevronRight className="ml-1 h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Our Teams */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold uppercase mb-6">
              JOIN OUR <span className="text-red-600">TEAMS</span>
            </h2>
            <p className="text-zinc-300 mb-8">
              FasterUI is always looking for talented players to join our competitive teams. If you have what it takes
              to compete at the highest level, we want to hear from you.
            </p>
            <Link
              href="#"
              className="bg-red-600 text-white px-8 py-3 uppercase font-bold text-sm inline-flex items-center hover:bg-red-700 transition-colors"
            >
              Apply Now
              <ChevronRight className="ml-2 h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
