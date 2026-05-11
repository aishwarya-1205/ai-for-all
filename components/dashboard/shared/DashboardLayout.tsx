"use client";

import React, { useState, useEffect } from "react";
import CanvasSidebar from "@/components/dashboard/canvas/CanvasSidebar";
import CanvasNav from "@/components/dashboard/canvas/CanvasNav";
import { PanelLeft } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface DashboardLayoutProps {
  children: React.ReactNode;
  rightPanel?: React.ReactNode;
  navTitle?: string;
  showModelSelector?: boolean;
}

import { SafeModeProvider, useSafeMode } from "@/lib/safe-mode-context";

export default function DashboardLayout(props: DashboardLayoutProps) {
  return (
    <SafeModeProvider>
      <DashboardLayoutInner {...props} />
    </SafeModeProvider>
  );
}

function DashboardLayoutInner({
  children,
  rightPanel,
  navTitle,
  showModelSelector = false,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const { incognitoMode } = useSafeMode();

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 1024;
      setIsMobile(mobile);
      if (mobile) {
        setSidebarOpen(false);
        setRightPanelOpen(false);
      }
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div className={cn(
      "h-screen flex transition-colors duration-500 overflow-hidden relative",
      incognitoMode ? "bg-[#0a0510] text-slate-300" : "bg-background"
    )}>
      {/* Mobile Sidebar Overlay backdrop */}
      <AnimatePresence>
        {isMobile && sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Mobile Right Panel Overlay backdrop */}
      <AnimatePresence>
        {isMobile && rightPanelOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/40 backdrop-blur-sm"
            onClick={() => setRightPanelOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar Container */}
      <motion.div
        className={cn(
          "shrink-0 transition-all duration-500 ease-in-out fixed inset-y-0 left-0 z-40 lg:relative lg:inset-auto lg:z-auto border-r",
          incognitoMode ? "border-purple-500/10 bg-[#0a0510]" : "border-border/40 bg-background",
          !sidebarOpen && "lg:border-none",
        )}
        animate={{
          width: sidebarOpen ? 260 : 0,
          x: isMobile && !sidebarOpen ? -260 : 0,
        }}
      >
        <div className="w-[260px] h-full">
          <CanvasSidebar onClose={() => setSidebarOpen(false)} />
        </div>
      </motion.div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col min-w-0 relative overflow-hidden">
        <button
          onClick={() => {
            if (isMobile && rightPanelOpen) setRightPanelOpen(false);
            setSidebarOpen((v) => !v);
          }}
          className={cn(
            "absolute top-3 left-3 z-50 w-8 h-8 rounded-xl glass border shadow-float flex items-center justify-center transition-all duration-200",
            incognitoMode ? "border-purple-500/20 text-purple-400 hover:bg-purple-500/10" : "border-glass text-muted-foreground/60 hover:text-foreground/80 hover:shadow-glow-accent",
            sidebarOpen && "lg:hidden",
            isMobile && (sidebarOpen || rightPanelOpen) && "hidden",
          )}
        >
          <PanelLeft className="w-4 h-4" />
        </button>

        <CanvasNav
          rightPanelOpen={rightPanelOpen}
          setRightPanelOpen={(open) => {
            if (isMobile && open) setSidebarOpen(false);
            setRightPanelOpen(open);
          }}
          title={navTitle}
          showModelSelector={showModelSelector}
        />

        <div className="flex-1 flex overflow-hidden">
          {/* Main Content Area */}
          <main className="flex-1 overflow-y-auto no-scrollbar relative min-w-0">
            {children}
          </main>

          {/* Right Panel Container */}
          {rightPanel && (
            <motion.div
              className={cn(
                "z-40 transition-all duration-500 overflow-hidden shrink-0",
                incognitoMode ? "bg-[#0a0510] border-l border-purple-500/10" : "bg-background border-l border-border/40",
                isMobile
                  ? "fixed right-0 top-0 bottom-0 shadow-2xl"
                  : "relative h-full",
              )}
              animate={{
                width: rightPanelOpen ? 260 : 0,
                x: isMobile && !rightPanelOpen ? "100%" : 0,
              }}
            >
              <div className="h-full w-[260px]">
                {React.cloneElement(
                  rightPanel as React.ReactElement<{
                    isOpen?: boolean;
                    onClose?: () => void;
                  }>,
                  {
                    isOpen: rightPanelOpen,
                    onClose: () => setRightPanelOpen(false),
                  },
                )}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
