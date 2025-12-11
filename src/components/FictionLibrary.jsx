import * as Lucide from 'lucide-react';
import { FICTION_LIBRARY } from '../data/plan.js';

export function FictionLibrary() {
    return (
        <div className="mt-16 space-y-8">
            <div className="flex items-center gap-3">
                <div className="rounded-xl bg-white/[0.03] p-3 text-white/50">
                    <Lucide.Gift className="h-6 w-6" />
                </div>
                <div>
                    <h2 className="text-2xl font-semibold text-white">Fiction Reward Zone</h2>
                    <p className="text-white/60">Optional deep dives for joy, rest, and imagination.</p>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {FICTION_LIBRARY.map((tier) => (
                    <div key={tier.tier} className="group relative overflow-hidden rounded-xl border border-white/20 bg-white/[0.02] p-6 transition hover:bg-white/[0.04]">
                        <div className="mb-4">
                            <h3 className="font-semibold text-white/60">{tier.tier}</h3>
                            <p className="text-xs text-white/50">{tier.description}</p>
                        </div>

                        <ul className="space-y-3">
                            {tier.books.map((book) => (
                                <li key={book.title} className="flex items-start gap-3">
                                    <div className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/20 group-hover:bg-white/40" />
                                    <div>
                                        <p className="text-sm font-medium text-white/90">
                                            {book.title} <span className="text-white/40">by {book.author}</span>
                                        </p>
                                        {book.desc && <p className="text-xs text-white/50">{book.desc}</p>}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>
    );
}
