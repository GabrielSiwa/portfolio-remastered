export interface GalaxyTheme {
  colors: {
    void: string;
    nebula: string;
    cosmic: string;
    starfield: string;
    violet: string;
    amethyst: string;
    plasma: string;
    aurora: string;
    stardust: string;
    moonbeam: string;
  };
  text: {
    primary: string;
    secondary: string;
    muted: string;
    accent: string;
  };
  interactive: {
    glow: string;
    highlight: string;
    border: string;
  };
}

export interface ThemeContextType {
  theme: GalaxyTheme;
  toggleTheme?: () => void;
}
