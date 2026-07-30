export type NavigationItem = {
  href: string;
  label: string;
};

export const primaryNavigation: NavigationItem[] = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/rooms", label: "Our Rooms" },
  { href: "/reservation", label: "Reservation" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" }
];

export const footerNavigation = [
  {
    title: "Explore",
    links: [
      { href: "/", label: "Home" },
      { href: "/about-us", label: "About Us" },
      { href: "/villa", label: "About Villa" },
      { href: "/rooms", label: "Rooms" },
      { href: "/services", label: "Services" },
      { href: "/blog", label: "Blog" },
      { href: "/gallery", label: "Gallery" },
      { href: "/contact", label: "Contact" }
    ]
  },
  {
    title: "Stay",
    links: [
      { href: "/reservation", label: "Reservation" },
      { href: "/rooms/island-suite", label: "Island Suite" },
      { href: "/rooms/garden-villa", label: "Garden Villa" },
      { href: "/rooms/family-stay", label: "Family Stay" }
    ]
  },
  {
    title: "Concierge",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "mailto:hello@villaceningan.com", label: "Email" },
      { href: "tel:+6282386357012", label: "Call" }
    ]
  }
];
