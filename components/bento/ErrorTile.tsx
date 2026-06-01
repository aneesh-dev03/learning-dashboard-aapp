// shows when supabase fetch returns null - happens when env vars are wrong
// or if the table doesn't exist yet

import { AlertTriangle } from 'lucide-react'

export default function ErrorTile() {
  return (
    <article className="rounded-2xl border border-red-500/20 bg-red-950/20 p-5 flex items-start gap-4">
      <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0 mt-0.5">
        <AlertTriangle size={17} className="text-red-400" />
      </div>
      <div>
        <h3 className="text-sm font-semibold text-white mb-1">Couldn&apos;t load courses</h3>
        <p className="text-xs text-slate-500 leading-relaxed">
          Database connection failed. Make sure your <code className="text-slate-300 bg-white/5 px-1 py-0.5 rounded text-[11px]">NEXT_PUBLIC_SUPABASE_URL</code> and anon key are set in <code className="text-slate-300 bg-white/5 px-1 py-0.5 rounded text-[11px]">.env.local</code>.
        </p>
      </div>
    </article>
  )
}
