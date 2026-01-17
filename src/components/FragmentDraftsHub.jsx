import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Lucide from 'lucide-react';
import clsx from 'clsx';
import { SECTIONS, FRAGMENT_STATUSES } from '../data/sections.js';
import { getActiveFragments, searchFragments } from '../utils/fragmentHelpers.js';
import { getSectionClasses } from '../utils/sectionColors.js';

export function FragmentDraftsHub({
  isOpen,
  onClose,
  fragments,
  writings,
  onUpdateFragment
}) {
  const [filterSection, setFilterSection] = useState('All');
  const [filterBook, setFilterBook] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterSourceType, setFilterSourceType] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'
  const [selectedFragment, setSelectedFragment] = useState(null);

  // Get all unique books from fragments
  const books = useMemo(() => {
    const bookSet = new Set(Object.values(fragments).map(f => f.sourceBook));
    return ['All', ...Array.from(bookSet).sort()];
  }, [fragments]);

  // Filter fragments
  const filteredFragments = useMemo(() => {
    let result = searchQuery.trim()
      ? searchFragments(fragments, searchQuery)
      : getActiveFragments(fragments);

    if (filterSection !== 'All') {
      result = result.filter(f => f.sectionTag === filterSection);
    }

    if (filterBook !== 'All') {
      result = result.filter(f => f.sourceBook === filterBook);
    }

    if (filterStatus !== 'All') {
      result = result.filter(f => f.status === filterStatus);
    }

    if (filterSourceType !== 'All') {
      result = result.filter(f => f.sourceType === filterSourceType);
    }

    return result;
  }, [fragments, filterSection, filterBook, filterStatus, filterSourceType, searchQuery]);

  const handleUpdateStatus = (fragmentId, newStatus) => {
    onUpdateFragment(fragmentId, { status: newStatus, updatedAt: new Date().toISOString() });
  };

  const handleEditFragment = (fragment) => {
    setSelectedFragment(fragment);
  };

  if (!isOpen) return null;

  const sectionKeys = Object.keys(SECTIONS);
  const totalCount = Object.values(fragments).filter(f => f.status !== 'Discard').length;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-black">
      {/* Header */}
      <div className="border-b border-white/20 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
                <Lucide.FileEdit className="h-6 w-6 text-white/50" />
                Fragment Drafts
              </h1>
              <p className="text-white/60 text-sm mt-1">
                {totalCount} {totalCount === 1 ? 'fragment' : 'fragments'} in your archive
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* View Mode Toggle */}
              <div className="flex items-center gap-1 rounded-lg bg-black p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={clsx(
                    'p-2 rounded transition',
                    viewMode === 'grid'
                      ? 'bg-white/[0.03] text-white'
                      : 'text-white/40 hover:text-white/60'
                  )}
                  aria-label="Grid view"
                >
                  <Lucide.LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={clsx(
                    'p-2 rounded transition',
                    viewMode === 'list'
                      ? 'bg-white/[0.03] text-white'
                      : 'text-white/40 hover:text-white/60'
                  )}
                  aria-label="List view"
                >
                  <Lucide.List className="h-4 w-4" />
                </button>
              </div>

              {/* Close Button */}
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/[0.03] text-white/60 hover:text-white transition"
                aria-label="Close fragments view"
              >
                <Lucide.X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-3">
            {/* Search */}
            <div className="relative flex-1 min-w-[200px]">
              <Lucide.Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search fragments..."
                className="w-full pl-10 pr-4 py-2 rounded-lg bg-black border border-white/20 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
              />
            </div>

            {/* Section Filter */}
            <select
              value={filterSection}
              onChange={(e) => setFilterSection(e.target.value)}
              className="px-3 py-2 rounded-lg bg-black border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Sections</option>
              {sectionKeys.map(key => (
                <option key={key} value={key}>{SECTIONS[key].label}</option>
              ))}
            </select>

            {/* Book Filter */}
            <select
              value={filterBook}
              onChange={(e) => setFilterBook(e.target.value)}
              className="px-3 py-2 rounded-lg bg-black border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              {books.map(book => (
                <option key={book} value={book}>{book}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 rounded-lg bg-black border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Status</option>
              {FRAGMENT_STATUSES.map(status => (
                <option key={status.id} value={status.id}>{status.label}</option>
              ))}
            </select>

            {/* Source Type Filter */}
            <select
              value={filterSourceType}
              onChange={(e) => setFilterSourceType(e.target.value)}
              className="px-3 py-2 rounded-lg bg-black border border-white/20 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <option value="All">All Sources</option>
              <option value="fiction">Fiction</option>
              <option value="nonfiction">Nonfiction</option>
            </select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {filteredFragments.length === 0 ? (
            <div className="text-center py-16">
              <Lucide.FileText className="h-16 w-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60 text-lg mb-2">
                {searchQuery ? 'No fragments found' : 'Your fragment archive awaits'}
              </p>
              <p className="text-white/40 text-sm">
                {searchQuery
                  ? 'Try a different search or clear your filters'
                  : 'Capture your first insight today — polish it into a fragment'}
              </p>
            </div>
          ) : (
            <div className={clsx(
              viewMode === 'grid'
                ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'
                : 'space-y-3'
            )}>
              {filteredFragments.map((fragment) => (
                <FragmentCard
                  key={fragment.id}
                  fragment={fragment}
                  viewMode={viewMode}
                  onEdit={() => handleEditFragment(fragment)}
                  onUpdateStatus={handleUpdateStatus}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FragmentCard({ fragment, viewMode, onEdit, onUpdateStatus }) {
  const section = SECTIONS[fragment.sectionTag];
  const Icon = section ? Lucide[section.icon] : Lucide.FileText;
  const statusColor = FRAGMENT_STATUSES.find(s => s.id === fragment.status)?.color || 'gray';
  const sectionColorClasses = getSectionClasses(section?.color);
  const statusColorClasses = getSectionClasses(statusColor);

  const preview = fragment.content.length > 150
    ? fragment.content.slice(0, 150) + '...'
    : fragment.content;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={clsx(
        'rounded-xl border border-white/20 bg-black p-4 hover:border-white/20 transition group cursor-pointer',
        'border-l-4',
        sectionColorClasses.borderLeft
      )}
      onClick={onEdit}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-wrap">
          {Icon && <Icon className="h-4 w-4 text-white/60" />}
          <span className="text-xs text-white/60">{section?.label}</span>
          {fragment.sourceType && (
            <span className={clsx(
              'text-[10px] px-2 py-0.5 rounded-full',
              fragment.sourceType === 'fiction'
                ? 'bg-emerald-500/20 text-emerald-300'
                : 'bg-emerald-500/20 text-emerald-300'
            )}>
              {fragment.sourceType === 'fiction' ? 'Fiction' : 'Nonfiction'}
            </span>
          )}
        </div>
        <span className={clsx(
          'text-xs px-2 py-0.5 rounded-full',
          statusColorClasses.bg,
          statusColorClasses.text
        )}>
          {fragment.status}
        </span>
      </div>

      {/* Content Preview */}
      <p className="text-white/80 text-sm leading-relaxed mb-3 line-clamp-4">
        {preview}
      </p>

      {/* Footer */}
      <div className="flex flex-col gap-1 text-xs text-white/40">
        <div className="flex items-center justify-between">
          <span className="truncate">{fragment.sourceBook}</span>
          <span>Week {fragment.weekId}</span>
        </div>
        {(fragment.sourceChapter || fragment.sourcePage) && (
          <div className="flex items-center gap-2 text-[11px] text-white/30">
            {fragment.sourceChapter && <span>{fragment.sourceChapter}</span>}
            {fragment.sourceChapter && fragment.sourcePage && <span>•</span>}
            {fragment.sourcePage && <span>{fragment.sourcePage}</span>}
          </div>
        )}
      </div>
    </motion.div>
  );
}
