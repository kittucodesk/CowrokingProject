## Packages
react-countup | Animated counters for the "Why Choose Us" statistics
clsx | Utility for constructing className strings conditionally
tailwind-merge | Utility for merging tailwind classes

## Notes
Tailwind Config - extend fontFamily and colors:
theme: {
  extend: {
    fontFamily: {
      sans: ["var(--font-sans)"],
      serif: ["var(--font-serif)"],
    },
    colors: {
      charcoal: {
        DEFAULT: "#121212",
        light: "#1A1A1A",
      },
      gold: {
        DEFAULT: "#D4AF37",
        light: "#F3E5AB",
      },
      beige: {
        DEFAULT: "#F9F9F7",
        dark: "#E8E8E3",
      }
    }
  }
}
