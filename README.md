# AutoList — React Edition

A React + TypeScript app that turns one set of car details into polished, ready-to-paste listings for major marketplaces, in **English, Chinese (简体), and French**.

## Modern Black & White Glass Design

Clean, minimal interface with glassmorphism effects and a monochrome color scheme.

## Features

- 🌐 **Multilingual**: English, Chinese, French
- 🤖 **AI-Powered**: Claude generates tailored listings
- 📋 **Multi-Platform**: Facebook Marketplace, Craigslist, Kijiji, AutoTrader.ca, Cars.com
- 🎨 **Modern Glass UI**: Black & white glassmorphism design
- 💾 **Local Storage**: All data stays in your browser

## Setup

```bash
npm install

# Create .env.local and add your API key
echo "VITE_ANTHROPIC_API_KEY=your-sk-ant-key-here" > .env.local

# Optional: use custom base URL
echo "VITE_ANTHROPIC_BASE_URL=https://your-proxy.com" >> .env.local

npm run dev
```

## Environment Variables

- `VITE_ANTHROPIC_API_KEY` - Your Anthropic API key (required)
- `VITE_ANTHROPIC_BASE_URL` - Custom API endpoint (optional)
- `VITE_ANTHROPIC_MODEL` - Model to use (default: claude-sonnet-4-6)

## Build for Production

```bash
npm run build
npm run preview  # Test production build locally
```

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Anthropic AI SDK** - AI generation
- **CSS Variables** - Theming

## Project Structure

```
src/
  components/        React components
  lib/              Utilities and types
  services/         API integration
  App.tsx           Main application
  App.css           Glass design styles
```

## Security

The API key is used client-side with `dangerouslyAllowBrowser: true`. For production, consider using a backend proxy to keep your API key secure.

## License

MIT
