# Devine Rituals Component System

A comprehensive UI component library built on the Footer theme, providing consistent design and functionality across all pages.

## 🎨 Theme System

### Colors
- **Primary**: Orange palette (`orange-400`, `orange-500`, `orange-600`)
- **Background**: Gray gradients (`gray-900` to `gray-800`)
- **Text**: White, gray-300, gray-400 for hierarchy

### Design Patterns
- Consistent spacing with `container mx-auto px-6`
- Hover effects with color transitions
- Rounded corners (`rounded-lg`)
- Shadow effects for depth

## 📦 Component Structure

```
components/
├── ui/                    # Basic UI components
│   ├── Button.tsx        # Reusable button with variants
│   ├── Card.tsx          # Card with header, body, footer
│   ├── Input.tsx         # Input and Textarea components
│   ├── Badge.tsx         # Status badges
│   ├── SocialLink.tsx    # Social media links
│   ├── Section.tsx       # Page sections
│   └── theme.ts          # Theme constants and utilities
├── common/               # Business-specific components
│   ├── ServiceCard.tsx   # Service display card
│   ├── TrustBadge.tsx    # Trust indicators
│   ├── NewsletterForm.tsx # Email subscription
│   └── ContactInfo.tsx   # Contact information
├── layout/               # Layout components
│   ├── Header.tsx        # Page headers
│   └── PageLayout.tsx    # Main page wrapper
├── templates/            # Page templates
│   └── ServicePage.tsx   # Service page template
└── index.ts              # Barrel exports
```

## 🧩 UI Components

### Button
```tsx
import { Button } from '@/components';

<Button variant="primary" size="md" loading={false}>
  Click me
</Button>
```

**Variants**: `primary`, `secondary`, `outline`, `ghost`
**Sizes**: `sm`, `md`, `lg`

### Card
```tsx
import { Card, CardHeader, CardBody, CardFooter } from '@/components';

<Card variant="hover">
  <CardHeader title="Title" subtitle="Subtitle" />
  <CardBody>Content</CardBody>
  <CardFooter>Footer content</CardFooter>
</Card>
```

**Variants**: `default`, `hover`, `interactive`, `glass`

### Input
```tsx
import { Input, Textarea } from '@/components';

<Input label="Email" type="email" error="Invalid email" />
<Textarea label="Message" rows={4} />
```

## 🎯 Common Components

### ServiceCard
```tsx
import { ServiceCard } from '@/components';

<ServiceCard 
  service={serviceData} 
  onBook={(service) => handleBooking(service)} 
/>
```

### TrustBadge
```tsx
import { TrustBadge } from '@/components';

<TrustBadge icon="✓" text="Verified Pandits" />
```

## 🏗️ Layout Components

### PageLayout
```tsx
import { PageLayout } from '@/components';

<PageLayout title="Page Title" subtitle="Page subtitle" gradient>
  <div>Page content</div>
</PageLayout>
```

### Section
```tsx
import { Section } from '@/components';

<Section title="Section Title" subtitle="Section subtitle" centered>
  <div>Section content</div>
</Section>
```

## 🎨 Theme Usage

```tsx
import { cn, theme } from '@/components';

// Use predefined class combinations
<div className={cn.button.primary}>Button</div>
<div className={cn.card.hover}>Card</div>

// Use theme colors
<div style={{ backgroundColor: theme.colors.primary[500] }}>
  Themed element
</div>
```

## 📄 Page Templates

### ServicePage
```tsx
import { ServicePage } from '@/components';

<ServicePage
  title="Service Title"
  subtitle="Service description"
  sections={[
    {
      title: "Overview",
      content: <div>Overview content</div>
    },
    {
      title: "Benefits",
      content: <div>Benefits content</div>
    }
  ]}
/>
```

## 🔄 Migration Guide

### Before (Old Pattern)
```tsx
<div className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-lg transition-colors">
  Button
</div>
```

### After (New Pattern)
```tsx
<Button variant="primary" size="sm">Button</Button>
```

## 🚀 Usage in Pages

1. **Import components**:
   ```tsx
   import { Button, Card, PageLayout } from '@/components';
   ```

2. **Use PageLayout for consistent structure**:
   ```tsx
   <PageLayout title="Title" subtitle="Subtitle">
     <Section>
       <Card>Content</Card>
     </Section>
   </PageLayout>
   ```

3. **Apply theme consistently**:
   ```tsx
   <div className={cn.text.heading}>Heading</div>
   <div className={cn.layout.grid}>Grid layout</div>
   ```

## 🎯 Benefits

- **Consistency**: All pages follow the same design system
- **Maintainability**: Centralized theme and components
- **Reusability**: Components can be used across pages
- **Scalability**: Easy to add new components and pages
- **Type Safety**: Full TypeScript support

## 📝 Best Practices

1. Always use `PageLayout` as the root component
2. Use `Section` for major page divisions
3. Apply theme colors via `cn` utilities
4. Keep components small and focused
5. Use proper TypeScript types
6. Follow the established naming conventions
