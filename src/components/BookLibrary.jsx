import { useState, useMemo } from 'react';
import * as Lucide from 'lucide-react';
import { DOMAIN } from '../data/plan.js';

function formatWeeks(sections) {
  const weeks = [...new Set(sections.map(s => s.week))].sort((a, b) => a - b);
  if (weeks.length === 1) return `Week ${weeks[0]}`;
  if (weeks.length === weeks[weeks.length - 1] - weeks[0] + 1) {
    // Consecutive range
    return `Weeks ${weeks[0]}-${weeks[weeks.length - 1]}`;
  }
  return weeks.map(w => `W${w}`).join(', ');
}

function BookCard({ book }) {
  const domain = DOMAIN[book.domain];
  const Icon = domain?.icon || Lucide.Book;
  const domainLabel = book.domain.split('/')[0]; // "Systems" instead of "Systems/Tech"

  return (
    <div className="rounded-xl border border-white/20 bg-black p-4 hover:border-white/20 transition group">
      {/* Domain Icon + Label */}
      <div className="flex items-center gap-2 mb-3">
        <div className="rounded-lg bg-white/[0.03] p-2">
          <Icon className="h-4 w-4 text-white/50" />
        </div>
        <span className="text-xs uppercase tracking-wider text-white/40">
          {domainLabel}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-white font-semibold text-sm line-clamp-2 mb-3 min-h-[40px]">
        {book.title}
      </h3>

      {/* Weeks badge */}
      <div className="flex items-center gap-2 text-xs text-white/60 mb-2">
        <Lucide.Calendar className="h-3 w-3 text-white/40" />
        <span>{formatWeeks(book.sections)}</span>
      </div>

      {/* Section count */}
      <div className="flex items-center gap-2 text-xs text-white/40">
        <Lucide.Layers className="h-3 w-3" />
        <span>
          {book.sections.length} {book.sections.length === 1 ? 'section' : 'sections'}
        </span>
      </div>
    </div>
  );
}

function FictionCard({ book }) {
  return (
    <div className="rounded-xl border border-white/20 bg-black p-4 hover:border-white/20 transition group">
      {/* Fiction Icon */}
      <div className="flex items-center gap-2 mb-3">
        <div className="rounded-lg bg-white/[0.03] p-2">
          <Lucide.BookOpen className="h-4 w-4 text-white/50" />
        </div>
        <span className="text-xs uppercase tracking-wider text-white/40">
          Fiction
        </span>
      </div>

      {/* Title + Author */}
      <h3 className="text-white font-semibold text-sm mb-1">
        {book.title}
      </h3>
      <p className="text-xs text-white/50 mb-3">by {book.author}</p>

      {/* Description */}
      {book.desc && (
        <p className="text-xs text-white/60 line-clamp-2">
          {book.desc}
        </p>
      )}
    </div>
  );
}

function PhaseSection({ phase, books }) {
  if (books.length === 0) return null;

  return (
    <div className="mb-10">
      {/* Phase Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-white">{phase.title}</h2>
          <p className="text-sm text-white/50">{phase.subtitle}</p>
        </div>
        <span className="text-xs text-white/40">
          {books.length} {books.length === 1 ? 'book' : 'books'}
        </span>
      </div>

      {/* Book Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {books.map((book) => (
          <BookCard key={book.title} book={book} />
        ))}
      </div>
    </div>
  );
}

function FictionTierSection({ tier, books }) {
  return (
    <div className="mb-6">
      {/* Tier Header */}
      <div className="mb-3">
        <h3 className="font-semibold text-white/80">{tier.tier}</h3>
        <p className="text-xs text-white/50">{tier.description}</p>
      </div>

      {/* Fiction Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {books.map((book) => (
          <FictionCard key={book.title} book={book} />
        ))}
      </div>
    </div>
  );
}

export function BookLibrary({ isOpen, onClose, books, phases, fictionLibrary = [] }) {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter books by search query
  const filteredBooks = useMemo(() => {
    if (!searchQuery.trim()) return books;
    const lowered = searchQuery.toLowerCase();
    return books.filter(book =>
      book.title.toLowerCase().includes(lowered) ||
      book.domain.toLowerCase().includes(lowered)
    );
  }, [books, searchQuery]);

  // Filter fiction books by search query
  const filteredFiction = useMemo(() => {
    if (!searchQuery.trim()) return fictionLibrary;
    const lowered = searchQuery.toLowerCase();
    return fictionLibrary.map(tier => ({
      ...tier,
      books: tier.books.filter(book =>
        book.title.toLowerCase().includes(lowered) ||
        book.author.toLowerCase().includes(lowered)
      )
    })).filter(tier => tier.books.length > 0);
  }, [fictionLibrary, searchQuery]);

  // Group books by phase
  const booksByPhase = useMemo(() => {
    return phases.map(phase => ({
      ...phase,
      books: filteredBooks.filter(book => phase.weeks.includes(book.firstWeek))
    }));
  }, [filteredBooks, phases]);

  if (!isOpen) return null;

  const totalCount = filteredBooks.length;
  const fictionCount = filteredFiction.reduce((acc, tier) => acc + tier.books.length, 0);
  const grandTotal = totalCount + fictionCount;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* Header */}
      <div className="border-b border-white/20 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
                <Lucide.Library className="h-6 w-6 text-white/50" />
                Book Library
              </h1>
              <p className="text-white/60 text-sm mt-1">
                {totalCount} reading plan {totalCount === 1 ? 'book' : 'books'}
                {fictionCount > 0 && ` + ${fictionCount} fiction ${fictionCount === 1 ? 'option' : 'options'}`}
              </p>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-white/[0.03] text-white/60 hover:text-white transition"
            >
              <Lucide.X className="h-5 w-5" />
            </button>
          </div>

          {/* Search */}
          <div className="relative">
            <Lucide.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books by title, author, or domain..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg bg-black border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
            />
          </div>
        </div>
      </div>

      {/* Content - Scrollable */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Phase Sections */}
          {booksByPhase.map((phase) => (
            <PhaseSection key={phase.id} phase={phase} books={phase.books} />
          ))}

          {/* Fiction Library Section */}
          {filteredFiction.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="rounded-xl bg-white/[0.03] p-3">
                  <Lucide.Sparkles className="h-6 w-6 text-white/50" />
                </div>
                <div>
                  <h2 className="text-2xl font-semibold text-white">Fiction Library</h2>
                  <p className="text-white/60">Optional books for joy, rest, and imagination</p>
                </div>
              </div>

              {filteredFiction.map((tier) => (
                <FictionTierSection key={tier.tier} tier={tier} books={tier.books} />
              ))}
            </div>
          )}

          {/* No Results */}
          {grandTotal === 0 && (
            <div className="text-center py-16 text-white/50">
              <Lucide.Search className="h-12 w-12 mx-auto mb-3 opacity-20" />
              <p>No books found matching "{searchQuery}"</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
