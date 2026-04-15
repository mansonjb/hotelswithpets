// Root layout — minimal passthrough. Locale layout in app/[locale]/layout.tsx handles html/body.
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children
}
