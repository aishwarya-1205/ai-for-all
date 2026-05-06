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

export default function DashboardLayout({
  children,
  rightPanel,
  navTitle,
  showModelSelector = false,
}: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

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
    <div className="h-screen flex bg-background overflow-hidden relative">
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
          "shrink-0 transition-all duration-300 ease-in-out fixed inset-y-0 left-0 z-40 lg:relative lg:inset-auto lg:z-auto border-r border-border/40 bg-background",
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
        {/*
          Floating sidebar toggle:
          - On desktop: hidden when sidebar is already open
          - On mobile: hidden whenever the sidebar OR right panel is open
            (user should use the in-panel X button to close instead)
        */}
        <button
          onClick={() => {
            if (isMobile && rightPanelOpen) setRightPanelOpen(false);
            setSidebarOpen((v) => !v);
          }}
          className={cn(
            "absolute top-3 left-3 z-50 w-8 h-8 rounded-xl glass border border-glass shadow-float flex items-center justify-center text-muted-foreground/60 hover:text-foreground/80 hover:shadow-glow-accent transition-all duration-200",
            // Desktop: hide when sidebar is open
            sidebarOpen && "lg:hidden",
            // Mobile: hide when either panel is open
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

          {/* Right Panel Container — desktop only inline, mobile overlay */}
          {rightPanel && (
            <motion.div
              className={cn(
                "bg-background z-40 transition-all duration-300 overflow-hidden shrink-0",
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
