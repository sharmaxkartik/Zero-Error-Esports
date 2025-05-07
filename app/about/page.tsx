import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <section className="relative h-[400px] overflow-hidden">
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/70 z-10"></div>

        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/placeholder.svg?height=400&width=1200"
            alt="About Us Background"
            fill
            className="object-cover"
          />
        </div>

        {/* Hero content */}
        <div className="container mx-auto relative z-20 h-full flex flex-col justify-center px-6">
          <h1 className="text-4xl md:text-6xl font-black uppercase leading-tight">
            ABOUT <span className="text-red-600">Zero Error Esports</span>
          </h1>
          <p className="text-lg text-zinc-300 mt-4 max-w-2xl">
            The premier esports organization dedicated to excellence and
            innovation
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text content */}
            <div>
              <h2 className="text-3xl font-bold uppercase mb-6">
                OUR <span className="text-red-600">STORY</span>
              </h2>
              <div className="space-y-4 text-zinc-300">
                <p>
                  Founded in 2013, FasterUI has grown from a small group of
                  passionate gamers to one of the most recognized names in
                  esports. Our journey began with a simple mission: to create a
                  platform where talented players could showcase their skills
                  and compete at the highest level.
                </p>
                <p>
                  Over the years, we've expanded our reach across multiple game
                  titles, built state-of-the-art training facilities, and
                  developed a comprehensive support system for our athletes. Our
                  teams have competed in major tournaments worldwide, bringing
                  home numerous championships and establishing FasterUI as a
                  dominant force in competitive gaming.
                </p>
                <p>
                  Today, we continue to push the boundaries of what's possible
                  in esports, investing in emerging talent, innovative
                  technologies, and community engagement initiatives that bring
                  fans closer to the action than ever before.
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="relative h-[400px] overflow-hidden">
              <Image
                src="/placeholder.svg?height=400&width=600"
                alt="Our Story"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-16 bg-zinc-950">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold uppercase mb-12 text-center">
            OUR <span className="text-red-600">VALUES</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Excellence */}
            <div className="bg-zinc-900 p-8 rounded-lg">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Excellence"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-xl font-bold mb-4">EXCELLENCE</h3>
              <p className="text-zinc-400">
                We strive for excellence in everything we do, from competition
                and training to content creation and fan engagement.
              </p>
            </div>

            {/* Innovation */}
            <div className="bg-zinc-900 p-8 rounded-lg">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Innovation"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-xl font-bold mb-4">INNOVATION</h3>
              <p className="text-zinc-400">
                We embrace new technologies and approaches, constantly seeking
                better ways to train, compete, and connect with our community.
              </p>
            </div>

            {/* Community */}
            <div className="bg-zinc-900 p-8 rounded-lg">
              <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mb-6">
                <Image
                  src="/placeholder.svg?height=32&width=32"
                  alt="Community"
                  width={32}
                  height={32}
                />
              </div>
              <h3 className="text-xl font-bold mb-4">COMMUNITY</h3>
              <p className="text-zinc-400">
                We believe in the power of community and work to create
                inclusive spaces where all gamers feel welcome and valued.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Leadership Section */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold uppercase mb-12 text-center">
            OUR <span className="text-red-600">LEADERSHIP</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-8">
            {/* Team members */}
            {[
              { name: "Alex Johnson", role: "Founder & CEO" },
              { name: "Sarah Chen", role: "Chief Operating Officer" },
              { name: "Marcus Williams", role: "Head Coach" },
              { name: "Elena Rodriguez", role: "Technical Director" },
            ].map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative h-[300px] w-full mb-4 overflow-hidden rounded-lg">
                  <Image
                    src={`/placeholder.svg?height=300&width=250`}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <h3 className="text-xl font-bold">{member.name}</h3>
                <p className="text-red-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
