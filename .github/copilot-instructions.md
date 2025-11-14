# Zero Error Esports - AI Coding Agent Instructions

## Project Overview
Next.js 15 esports website with dual focus: public-facing marketing site + authenticated **ZE Club** loyalty system (Discord OAuth, missions, points, rewards, leaderboards).

## Critical Architecture

### Tech Stack
- **Framework**: Next.js 15 App Router (React 19, TypeScript)
- **Auth**: NextAuth v5 beta with Discord provider + MongoDB adapter
- **Database**: MongoDB with Mongoose ODM
- **Storage**: AWS S3 for mission proof uploads
- **Styling**: Tailwind CSS + Shadcn UI (Radix primitives)
- **Package Manager**: `pnpm` (NOT npm/yarn)

### Directory Structure
```
app/
  ├── (marketing)/        # Public pages: home, about, services, events, teams
  ├── ze-club/           # Protected ZE Club pages (auth required)
  │   ├── page.tsx       # Dashboard
  │   ├── missions/      # Mission upload & submission history
  │   ├── leaderboard/   # User rankings
  │   └── rewards/       # Reward catalog & redemption
  ├── admin/ze-club/     # Admin verification panel (role check)
  └── api/
      ├── auth/[...nextauth]/ # NextAuth handlers
      ├── ze-club/       # User-facing ZE Club endpoints
      └── admin/         # Admin-only endpoints
models/         # Mongoose schemas (User, Mission, MissionSubmission, Reward)
components/
  ├── ui/              # Shadcn components
  ├── home/            # Landing page sections
  └── ze-club/         # ZE Club-specific components
contexts/       # AnimationContext (reduced motion support)
lib/            # mongodb.ts, s3.ts, uploadthing.ts, utils.ts
scripts/        # seed-missions.ts, make-admin.ts
```

## Key Conventions (from GEMINI.md)

### Code Style
- **Functions**: Use `function` keyword for components/pure functions (NOT `const`)
- **No semicolons**: Omit them consistently
- **TypeScript**: Prefer `interface` over `type`, avoid enums (use maps/objects)
- **File structure**: Export component → subcomponents → helpers → static content → types
- **Directories**: lowercase-with-dashes (e.g., `components/auth-wizard`)

### React/Next.js Patterns
- **Server-first**: Minimize `'use client'` - only for Web APIs, interactivity, or `useEffect`
- **Components**: Functional components with TypeScript interfaces
- **Forms**: Use `react-hook-form` + Zod validation
- **Error handling**: 
  - Server Actions: Return errors as values, use `useActionState`
  - Unexpected errors: Handle with `error.tsx` boundaries
- **Images**: WebP format, size data, lazy loading
- **Dynamic imports**: For non-critical components
- **Suspense**: Wrap client components with fallback

### Error Handling
- Handle errors/edge cases **at the beginning** of functions
- Use **early returns** for error conditions (avoid nested ifs)
- Place happy path **last** for readability
- Avoid unnecessary `else` (use if-return pattern)

## Authentication & Authorization

### NextAuth v5 Setup
```typescript
// Import auth helper from centralized location
import { auth } from '@/app/api/auth/[...nextauth]/route'

// Server component example
const session = await auth()
if (!session?.user) redirect('/join-us')
```

### Session Data Structure
```typescript
session.user = {
  id: string           // MongoDB _id
  email: string
  name: string
  image: string
  roles: string[]      // ['user'] or ['user', 'admin']
  points: number       // ZE Club points
  rank: string         // 'Rookie' | 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond'
  zeClubId: string     // Format: 'ZE-{nanoid(8)}'
  discordId: string    // Discord provider ID
}
```

### Admin Route Protection
```typescript
// Example: app/api/admin/submissions/verify/route.ts
export async function PATCH(req: Request) {
  const session = await auth()
  if (!session || !session.user.roles.includes('admin')) {
    return new NextResponse('Unauthorized', { status: 401 })
  }
  // ... admin logic
}
```

## Database Patterns

### MongoDB Connection
```typescript
import dbConnect from '@/lib/mongodb'

// Always call before Mongoose operations
await dbConnect()
const user = await User.findOne({ email: session.user.email })
```

### Model Exports (Avoid Duplicate Registration)
```typescript
// Correct pattern used in all models
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
```

### Rank System Logic
Ranks are **auto-calculated** in `/api/admin/submissions/verify`:
```typescript
const ranks = [
  { name: 'Rookie', points: 0 },
  { name: 'Bronze', points: 500 },
  { name: 'Silver', points: 1000 },
  { name: 'Gold', points: 5000 },
  { name: 'Platinum', points: 10000 },
  { name: 'Diamond', points: 20000 },
]
```
When a mission is approved, user points increase and rank is recalculated via `updateUserRank()`.

## ZE Club Workflows

### Mission Submission Flow
1. **User**: Selects mission at `/ze-club/missions`, uploads proof (S3)
2. **API**: `POST /api/ze-club/missions/upload` creates `MissionSubmission` with `status: 'pending'`
3. **Admin**: Reviews at `/admin/ze-club`, approves/rejects via `PATCH /api/admin/submissions/verify`
4. **Points**: On approval, user gets mission points + rank update + `revalidatePath('/ze-club/leaderboard')`

### File Upload Constraints
- **Max size**: 50MB
- **Allowed types**: JPG, PNG, MP4
- **S3 naming**: `{userId}-{missionId}-{timestamp}.{ext}`

## Developer Scripts

```bash
# Development
pnpm dev                      # Start Next.js dev server (localhost:3000)
pnpm build                    # Production build
pnpm start                    # Run production build

# Database utilities
pnpm db:seed-missions         # Populate Mission collection with default missions
pnpm db:make-admin <email>    # Grant admin role to user by email
```

## Environment Variables Required
```env
# MongoDB
MONGODB_URI=mongodb+srv://...

# NextAuth
AUTH_SECRET=                  # Generate: openssl rand -base64 32
NEXTAUTH_URL=http://localhost:3000
AUTH_URL=http://localhost:3000

# Discord OAuth
DISCORD_CLIENT_ID=
DISCORD_CLIENT_SECRET=

# AWS S3
AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_S3_BUCKET_NAME=
AWS_S3_REGION=us-east-1
```

## Animation System
Global `AnimationContext` provides `prefersReducedMotion` + manual toggle:
```tsx
import { useAnimation } from '@/contexts/AnimationContext'

function Component() {
  const { animationEnabled } = useAnimation()
  return animationEnabled ? <motion.div /> : <div />
}
```

## Common Pitfalls
1. **NextAuth import**: Always use `import { auth } from '@/app/api/auth/[...nextauth]/route'` (NOT `next-auth` package exports)
2. **Type suppressions**: NextAuth v5 beta has type conflicts with MongoDB adapter - `@ts-ignore` comments are intentional
3. **Build config**: `eslint.ignoreDuringBuilds` and `typescript.ignoreBuildErrors` are **enabled** to handle rapid iteration
4. **pnpm only**: Package manager is pnpm - do NOT use npm/yarn
5. **Server vs Client**: Pages in `app/ze-club/` are Server Components by default - wrap interactive parts in client components
6. **Revalidation**: After data mutations (mission approval, reward redemption), use `revalidatePath()` to refresh cached pages

## Testing User Journey
1. Visit `/join-us` → Sign in with Discord
2. Redirects to `/ze-club` (dashboard shows 100 starter points, Rookie rank)
3. `/ze-club/missions` → Upload proof for mission
4. Admin at `/admin/ze-club` → Approve submission
5. User sees updated points/rank at dashboard + `/ze-club/leaderboard`
6. `/ze-club/rewards` → Redeem reward (points deducted)

## Reference Files
- **Auth setup**: `app/api/auth/[...nextauth]/route.ts`
- **Rank calculation**: `app/api/admin/submissions/verify/route.ts`
- **Models**: `models/user.ts`, `models/mission.ts`, `models/missionSubmission.ts`, `models/reward.ts`
- **Docs**: `ZE_CLUB_DOCS.md`, `masterplan.md`, `GEMINI.md`
