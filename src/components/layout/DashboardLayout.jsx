import { AnimatePresence, motion } from 'framer-motion';
import * as Lucide from 'lucide-react';

export function DashboardLayout({ sidebar, sidebarOpen, onToggleSidebar, children }) {
  return (
    <>
      {/* Mobile Sidebar Drawer */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onToggleSidebar}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />

            {/* Drawer */}
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 bottom-0 left-0 z-50 w-[280px] border-r border-white/10 bg-black pt-[57px]"
            >
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <h2 className="text-lg font-semibold text-white">All Weeks</h2>
                <button
                  onClick={onToggleSidebar}
                  className="rounded-lg p-1.5 text-white/60 hover:bg-white/5 hover:text-white"
                >
                  <Lucide.X className="h-5 w-5" />
                </button>
              </div>
              {sidebar}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Layout: Sidebar + Content side by side */}
      <div className="hidden lg:grid lg:grid-cols-[200px_1fr] lg:min-h-screen">
        {/* Desktop Sidebar - Full height column with sticky content */}
        <div className="border-r border-white/10 bg-black">
          <div className="sticky top-[73px] h-[calc(100vh-73px)] overflow-y-auto">
            {sidebar}
          </div>
        </div>

        {/* Main Content Area with max width */}
        <div className="min-w-0">
          <main className="max-w-[1400px] mx-auto w-full">
            {children}
          </main>
        </div>
      </div>

      {/* Mobile Layout: Full width content */}
      <div className="lg:hidden">
        {children}
      </div>
    </>
  );
}
