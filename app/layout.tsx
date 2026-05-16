import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import {
  MailIcon,
  LinkedinIcon,
  FacebookIcon,
  InstagramIcon,
  XIcon,
  WhatsAppIcon,
  GithubIcon,
} from "@/components/icons";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} · Civil and Rural Engineer`,
    template: `%s · ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: [
      { url: "/CIMG1439.JPG", type: "image/jpeg" },
    ],
    apple: [{ url: "/CIMG1439.JPG", type: "image/jpeg" }],
    shortcut: ["/CIMG1439.JPG"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <div className="relative flex flex-col min-h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl pt-4 sm:pt-6 px-4 sm:px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full border-t border-default-200 mt-12">
              <div className="container mx-auto max-w-7xl px-4 sm:px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-default-500 text-center md:text-left">
                <p>
                  © {new Date().getFullYear()} {siteConfig.name}. Built
                  with Next.js and HeroUI.
                </p>
                <div className="flex items-center gap-4">
                  <Link
                    isExternal
                    aria-label="Email"
                    className="text-default-500 hover:text-primary"
                    href={siteConfig.links.email}
                    title="Email"
                  >
                    <MailIcon size={18} />
                  </Link>
                  <Link
                    isExternal
                    aria-label="LinkedIn"
                    className="text-default-500 hover:text-primary"
                    href={siteConfig.links.linkedin}
                    title="LinkedIn"
                  >
                    <LinkedinIcon size={18} />
                  </Link>
                  <Link
                    isExternal
                    aria-label="Facebook"
                    className="text-default-500 hover:text-primary"
                    href={siteConfig.links.facebook}
                    title="Facebook"
                  >
                    <FacebookIcon size={18} />
                  </Link>
                  <Link
                    isExternal
                    aria-label="Instagram"
                    className="text-default-500 hover:text-primary"
                    href={siteConfig.links.instagram}
                    title="Instagram"
                  >
                    <InstagramIcon size={18} />
                  </Link>
                  <Link
                    isExternal
                    aria-label="X"
                    className="text-default-500 hover:text-primary"
                    href={siteConfig.links.x}
                    title="X"
                  >
                    <XIcon size={18} />
                  </Link>
                  <Link
                    isExternal
                    aria-label="WhatsApp"
                    className="text-default-500 hover:text-primary"
                    href={siteConfig.links.whatsapp}
                    title="WhatsApp"
                  >
                    <WhatsAppIcon size={18} />
                  </Link>
                  <Link
                    isExternal
                    aria-label="GitHub"
                    className="text-default-500 hover:text-primary"
                    href={siteConfig.links.github}
                    title="GitHub"
                  >
                    <GithubIcon size={18} />
                  </Link>
                </div>
                <Link
                  isExternal
                  className="text-default-500 hover:text-primary"
                  href={siteConfig.links.mansangkot}
                  size="sm"
                  title="Mansangkot"
                >
                  Mansangkot ↗
                </Link>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
