# Next.js 15 Project Structure

This project has been updated to follow Next.js 15 best practices and standards.

## Directory Structure

```
├── src/                          # Source code directory (Next.js 15 standard)
│   ├── app/                      # App Router (Next.js 15 routing)
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── (private)/           # Route group for authenticated routes
│   │   │   ├── assessments/
│   │   │   ├── home/
│   │   │   ├── settings/
│   │   │   ├── students/
│   │   │   └── workouts/
│   │   ├── (public)/            # Route group for public routes
│   │   │   ├── request-reset-password/
│   │   │   ├── reset-password/
│   │   │   ├── sign-in/
│   │   │   └── sign-up/
│   │   └── api/                 # API routes
│   │       ├── assessments/
│   │       ├── auth/
│   │       ├── lead/
│   │       ├── stripe/
│   │       └── webhook/
│   ├── components/              # Component organization
│   │   ├── ui/                  # Basic UI components (buttons, inputs, etc.)
│   │   │   ├── ButtonAccount.tsx
│   │   │   ├── ButtonCheckout.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── index.ts         # Export barrel
│   │   ├── layout/              # Layout components (header, footer, etc.)
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Sidebar.tsx
│   │   │   └── index.ts         # Export barrel
│   │   ├── features/            # Feature-specific components
│   │   │   ├── Hero.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── Testimonials1.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── index.ts         # Export barrel
│   │   └── index.ts             # Main component export barrel
│   ├── lib/                     # External service integrations & complex logic
│   │   ├── api.ts               # API client configuration
│   │   ├── stripe.ts            # Stripe integration
│   │   ├── mailgun.ts           # Email service
│   │   ├── gpt.ts               # AI service integration
│   │   ├── schema.ts            # Validation schemas
│   │   ├── seo.tsx              # SEO utilities
│   │   ├── enums/               # Type enums
│   │   │   ├── assessment-type-enum.ts
│   │   │   ├── gender-enum.ts
│   │   │   └── index.ts
│   │   └── index.ts             # Export barrel
│   ├── utils/                   # Pure utility functions
│   │   ├── format-birth-date.ts
│   │   ├── validate-date.ts
│   │   └── index.ts             # Export barrel
│   ├── types/                   # TypeScript type definitions
│   │   └── index.ts
│   └── styles/                  # Global styles
│       └── globals.css
├── public/                      # Static assets
│   ├── images/
│   └── favicon.ico
├── package.json                 # Dependencies (Next.js 15)
├── next.config.js               # Next.js configuration (ES modules)
├── tsconfig.json                # TypeScript configuration (src-based paths)
└── tailwind.config.js           # Tailwind CSS configuration
```

## Key Next.js 15 Updates

### 1. **Source Directory Structure**
- All source code is now in the `src/` directory for better organization
- Clear separation between source code and configuration files

### 2. **Component Organization**
- **`ui/`**: Basic building blocks (buttons, inputs, modals)
- **`layout/`**: Structural components (header, footer, sidebar)
- **`features/`**: Business logic components (hero, pricing, testimonials)

### 3. **Library vs Utils Separation**
- **`lib/`**: External service integrations, database connections, complex business logic
- **`utils/`**: Pure utility functions with no side effects

### 4. **Export Barrels**
All directories have `index.ts` files for clean imports:
```typescript
// Instead of:
import Header from '../../../components/layout/Header'
import Footer from '../../../components/layout/Footer'

// You can now do:
import { Header, Footer } from '@/components/layout'
```

### 5. **TypeScript Path Mapping**
Updated `tsconfig.json` with Next.js 15 standards:
```json
{
  "paths": {
    "@/*": ["./src/*"],
    "@/components/*": ["./src/components/*"],
    "@/lib/*": ["./src/lib/*"],
    "@/utils/*": ["./src/utils/*"]
  }
}
```

### 6. **Next.js 15 Configuration**
- Updated to use ES modules (`export default`)
- Using `remotePatterns` instead of deprecated `domains`
- Enabled `typedRoutes` for better type safety

## Import Examples

```typescript
// UI Components
import { ButtonAccount, Input, Modal } from '@/components/ui'

// Layout Components  
import { Header, Footer } from '@/components/layout'

// Feature Components
import { Hero, Pricing, FAQ } from '@/components/features'

// Libraries
import { apiClient, stripeConfig } from '@/lib'

// Utils
import { formatBirthDate, validateDate } from '@/utils'

// Types
import type { User, Assessment } from '@/types'
```

## Best Practices

1. **Component Co-location**: Keep related files close together
2. **Consistent Naming**: Use PascalCase for components, kebab-case for files
3. **Export Barrels**: Use index files for clean imports
4. **Type Safety**: Leverage TypeScript with strict mode enabled
5. **Performance**: Use dynamic imports for code splitting when needed

## Migration Notes

- All import paths need to be updated to use the new `src/` structure
- Component imports should use the new barrel exports
- Utilities moved from `libs/date/` to `utils/`
- Next.js configuration updated for version 15 compatibility 