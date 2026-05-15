import { Mail, Instagram, Linkedin, Twitter, LucideIcon } from "lucide-react";

type SocialLink = {
  icon: LucideIcon;
  url: string;
};

interface FooterLink {
  label: string;
  href: string;
}

const footerLinks: Record<string, FooterLink[]> = {
  About: [
    { label: "Our Story", href: "#" },
    { label: "Team", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Research", href: "#" },
  ],
  Solutions: [
    { label: "Security", href: "#" },
    { label: "CLOS-AI", href: "#" },
    { label: "Governance", href: "#" },
    { label: "Deepfake Detection", href: "#" },
    { label: "Compliance", href: "#" },
    { label: "Post Your Ad", href: "/advertise" },
  ],
  Tools: [
    { label: "Web Search", href: "#" },
    { label: "App Builder", href: "/dashboard/app-builder" },
    { label: "Database", href: "#" },
    { label: "Security", href: "#" },
    { label: "Audio Lab", href: "/dashboard/audio-lab" },
    { label: "RivinityLM", href: "/dashboard/rivinity-lm" },
    { label: "Image Enhancer", href: "/dashboard/image-enhancer" },
  ],
  "Other Links": [
    { label: "Documentation", href: "#" },
    { label: "API Status", href: "#" },
    { label: "Terms & Conditions", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
};

const socialLinks: SocialLink[] = [
  {
    icon: Linkedin,
    url: "https://www.linkedin.com/company/bharatartificialintelligence/",
  },
  {
    icon: Instagram,
    url: "https://www.instagram.com/rivinityai/",
  },
  {
    icon: Twitter,
    url: "https://x.com/rivinityai",
  },
];

export function Footer() {
  return (
    <footer
      className="relative pt-40 px-4 bg-background transition-colors duration-300 overflow-hidden"
      style={{ paddingBottom: 0 }}
    >
      {/* Watermark */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center"
      >
        <div
          className="flex justify-between w-full max-w-[100vw] mx-auto font-black select-none pointer-events-none items-end h-full"
          style={{
            fontSize: "clamp(80px, 16vw, 520px)",
            opacity: 0.06,
            letterSpacing: "0.08em",
            lineHeight: 1,
            background:
              "linear-gradient(90deg, var(--accent), var(--highlight), var(--accent))",
            WebkitBackgroundClip: "text",
            color: "transparent",
            whiteSpace: "nowrap",
          }}
        >
          {"RIVINITY".split("").map((char, i) => (
            <span key={i} className="flex-1 text-center">
              {char}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 px-4">
        <div className="relative">
          {/* Gradient glow border */}
          <div
            aria-hidden
            className="absolute -inset-[2px] rounded-[3rem] pointer-events-none"
            style={{
              zIndex: 0,
              filter: "blur(32px)",
              opacity: 0.2,
              background:
                "linear-gradient(135deg, var(--accent), var(--highlight))",
            }}
          />

          {/* Card */}
          <div className="relative z-[1] bg-card border border-border rounded-[3rem] p-10 shadow-sm transition-colors duration-300">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12">
              <div className="flex flex-col gap-8">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>A product by</span>
                  <div className="flex items-center gap-1.5">
                    <div className="w-4 h-4 rounded-sm bg-accent/80" />
                    <span className="font-bold tracking-tight text-foreground">
                      BharatTech
                    </span>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-bold text-foreground mb-3 tracking-wide uppercase">
                    Support Inquiries:
                  </p>
                  <a
                    href="mailto:support@rivinity.in"
                    className="flex items-center gap-2.5 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                      <Mail size={14} className="text-foreground" />
                    </div>
                    <span className="text-sm">support@rivinity.in</span>
                  </a>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  {/* ISO 9001:2015 */}
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full border-2 border-accent/30 bg-card"
                    title="ISO 9001:2015"
                  >
                    <div className="text-center leading-none">
                      <div className="text-[8px] font-extrabold text-accent tracking-tight">
                        ISO
                      </div>
                      <div className="text-[7px] font-bold text-foreground tracking-tight mt-0.5">
                        9001
                      </div>
                      <div className="text-[5px] text-muted-foreground tracking-tight mt-0.5">
                        :2015
                      </div>
                    </div>
                  </div>

                  {/* GDPR */}
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-[#003399]"
                    title="GDPR Compliant"
                  >
                    <div className="text-center leading-none">
                      <div className="flex justify-center mb-0.5">
                        {[...Array(6)].map((_, i) => (
                          <svg
                            key={i}
                            className="h-1.5 w-1.5 -mx-px fill-[#FFCC00]"
                            viewBox="0 0 10 10"
                          >
                            <path d="M5 0l1.2 3.5H10L7 5.7l1.2 3.5L5 7l-3.2 2.2L3 5.7 0 3.5h3.8z" />
                          </svg>
                        ))}
                      </div>
                      <div className="text-[9px] font-extrabold text-white tracking-tight">
                        GDPR
                      </div>
                    </div>
                  </div>

                  {/* SOC 2 */}
                  <div
                    className="flex items-center justify-center w-12 h-12 rounded-full bg-foreground"
                    title="SOC 2 Type II"
                  >
                    <div className="text-center leading-none">
                      <div className="text-[6px] font-bold text-background/60 tracking-[0.1em]">
                        AICPA
                      </div>
                      <div className="text-[10px] font-extrabold text-background tracking-tight mt-0.5">
                        SOC
                      </div>
                      <div className="text-[8px] font-bold text-accent tracking-tight">
                        2
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Link columns */}
              {Object.entries(footerLinks).map(([category, links]) => (
                <div key={category}>
                  <h4 className="font-bold text-foreground text-sm tracking-widest uppercase mb-6">
                    {category}
                  </h4>
                  <ul className="space-y-4">
                    {links.map((link) => (
                      <li key={link.label}>
                        <a
                          href={link.href}
                          className="text-sm text-muted-foreground hover:text-foreground transition duration-300"
                        >
                          {link.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="flex flex-col gap-6">
                <div>
                  <h4 className="font-bold text-foreground text-sm tracking-widest uppercase mb-2">
                    Get in touch
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    We don&apos;t send spam so don&apos;t worry.
                  </p>
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-secondary border border-border rounded-full px-6 py-3.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent/20 text-foreground placeholder:text-muted-foreground transition-colors"
                />

                <div className="flex items-center gap-5 pt-2">
                  {socialLinks.map(({ icon: Icon, url }, i) => (
                    <a
                      key={i}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Icon size={18} strokeWidth={1.5} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{
            height: "clamp(80px, 16vw, 520px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <p className="text-sm text-muted-foreground font-medium tracking-wide">
            © 2026 BharatTech Origin Pvt. Ltd. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
