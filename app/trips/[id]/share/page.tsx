import { Navbar } from "@/components/layout/Navbar";
import { TripSidebar } from "@/components/layout/TripSidebar";

interface Props {
  params: Promise<{ id: string }>;
}

// TODO: Fetch trip members + shared links
// const { data: members } = await supabase.from('trip_members').select('*, profile:profiles(*)').eq('trip_id', params.id)
// const { data: links } = await supabase.from('shared_links').select('*').eq('trip_id', params.id)

export default async function TripSharePage({ params: paramsPromise }: Props) {
  const params = await paramsPromise;
  return (
    <>
      <Navbar />
      <div className="flex">
        <TripSidebar tripId={params.id} activeTab="share" />
        <main className="flex-1 max-w-3xl mx-auto px-6 py-8">
          <h1 className="font-display text-3xl font-bold text-sand-900 mb-1">
            Sharing & Collaboration
          </h1>
          <p className="text-sand-400 text-sm mb-8">
            Invite friends and family to view or edit this trip
          </p>

          {/* 
            Person 3: Build sharing features here
            
            Sections:
            
            1. Invite by email
               - Input + role selector (editor/viewer) + "Send Invite" button
               - Creates trip_member row + sends email via Supabase edge function or Resend
            
            2. Share link
               - Generate public link via shared_links table
               - Toggle: allow suggestions (viewers can add suggestion-status items)
               - Copy link button
               - QR code (use a lightweight lib like qrcode.react)
            
            3. Current members list
               - Avatar, name, role badge
               - Owner can change roles or remove members
               - Show online status using Supabase Presence (real-time)
            
            4. Real-time collaboration
               - Subscribe to changes:
                 supabase.channel('trip:' + tripId)
                   .on('postgres_changes', { event: '*', schema: 'public', table: 'itinerary_items', filter: 'trip_id=eq.' + tripId }, handleChange)
                   .subscribe()
               - Show toast when someone adds/edits an item
               - Presence: show who's currently viewing the trip
          */}

          {/* Invite section */}
          <div className="card p-6 mb-6 animate-slide-up">
            <h3 className="font-display text-lg font-semibold mb-4">Invite People</h3>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="friend@email.com"
                className="input flex-1"
              />
              <select className="input w-32">
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
              <button className="btn-primary whitespace-nowrap">Send Invite</button>
            </div>
          </div>

          {/* Share link section */}
          <div className="card p-6 mb-6 animate-slide-up stagger-1">
            <h3 className="font-display text-lg font-semibold mb-4">Share Link</h3>
            <div className="flex gap-3">
              <div className="input flex-1 bg-sand-50 text-sand-400 font-mono text-sm flex items-center">
                trvl.ai/s/your-trip-slug
              </div>
              <button className="btn-primary">Copy Link</button>
            </div>
          </div>

          {/* Members */}
          <div className="card p-6 animate-slide-up stagger-2">
            <h3 className="font-display text-lg font-semibold mb-4">Trip Members</h3>
            <p className="text-sand-400 text-sm">
              Members will appear here once you connect to Supabase.
            </p>
          </div>
        </main>
      </div>
    </>
  );
}
