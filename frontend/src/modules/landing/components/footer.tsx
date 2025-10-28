// Frontend/src/modules/landing/components/footer.tsx
import { Github } from 'lucide-react'

/**
 * Minimal footer for landing page with useful links and information.
 */
export function Footer() {
  return (
    <footer className="w-full bg-transparent">
      <div className="container py-12 px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand + Description */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">S</span>
              </div>
              <span className="font-semibold text-lg">Synapse BMS</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Open-source platform for advanced Building Automation System.
              Real-time monitoring, predictive analytics, and intelligent control.
            </p>
          </div>

          {/* Product Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#features" className="hover:text-foreground transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#protocols" className="hover:text-foreground transition">
                  Protocols
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-foreground transition">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="#tech-stack" className="hover:text-foreground transition">
                  Tech Stack
                </a>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-3">
            <h3 className="font-semibold text-sm">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a
                  href="https://github.com/synapse-bms"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-foreground transition inline-flex items-center gap-1"
                >
                  <Github className="h-3.5 w-3.5" />
                  GitHub
                </a>
              </li>
              <li>
                <a href="/docs" className="hover:text-foreground transition">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/privacy" className="hover:text-foreground transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="hover:text-foreground transition">
                  Terms of Service
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Synapse BMS. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with ❤️ for the open-source community
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
