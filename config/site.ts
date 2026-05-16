export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Sandeep Kafle",
  description:
    "Civil and Rural Engineer from Pokhara University. Engineers Without Borders Nepal volunteer working on community engineering projects across Nepal.",
  navItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
  ],
  tools: [
    {
      label: "Date Converter",
      href: "/dateconverter",
      description: "Convert between Bikram Sambat and Gregorian dates.",
      external: false,
    },
    {
      label: "Valuation Report Generator",
      href: "https://valuation.sandeepkafle.com.np/",
      description: "Generate property valuation reports.",
      external: true,
    },
    {
      label: "Water Supply M&E (KPI)",
      href: "https://kpi.sandeepkafle.com.np/",
      description: "Monitoring and evaluation for water supply projects.",
      external: true,
    },
    {
      label: "Kundali",
      href: "https://astro.sandeepkafle.com.np/",
      description: "Vedic astrology birth chart generator.",
      external: true,
    },
    {
      label: "Engineering Calculator",
      href: "https://calculator.sandeepkafle.com.np/",
      description: "Quick calculations for everyday engineering tasks.",
      external: true,
    },
  ],
  maps: {
    label: "Maps",
    href: "https://maps.sandeepkafle.com.np",
    title: "Nepal Administrative Map",
  },
  navMenuItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Gallery", href: "/gallery" },
    { label: "Date Converter", href: "/dateconverter" },
    {
      label: "Valuation Report Generator",
      href: "https://valuation.sandeepkafle.com.np/",
    },
    {
      label: "Water Supply M&E (KPI)",
      href: "https://kpi.sandeepkafle.com.np/",
    },
    {
      label: "Kundali",
      href: "https://astro.sandeepkafle.com.np/",
    },
    {
      label: "Engineering Calculator",
      href: "https://calculator.sandeepkafle.com.np/",
    },
    {
      label: "Maps (Nepal Administrative Map)",
      href: "https://maps.sandeepkafle.com.np",
    },
    { label: "Request CV access", href: "/cv" },
  ],
  links: {
    email: "mailto:sandeepkafle31@gmail.com",
    cvRequestEmail: "sandeepkafle31@gmail.com",
    linkedin: "https://www.linkedin.com/in/31sandeep31",
    github: "https://github.com/31sandeep31",
    facebook: "https://www.facebook.com/31sandeep31/",
    instagram: "https://www.instagram.com/31sandeep31/",
    x: "https://x.com/31sandeep31",
    whatsapp: "https://wa.me/9779847513054",
    cv: "/cv",
    mansangkot: "http://mansangkot.sandeepkafle.com.np",
  },
};
