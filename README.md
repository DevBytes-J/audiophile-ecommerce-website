# 🎧 Audiophile E-Commerce

A pixel-perfect, full-stack e-commerce platform for premium audio equipment, built with Next.js, Convex, and modern web technologies.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://your-deployed-url.vercel.app)

## ✨ Features

- 🎨 **Pixel-Perfect Design** - Faithfully implements the Audiophile Figma design across all breakpoints
- 📱 **Fully Responsive** - Optimized for mobile (375px), tablet (768px), and desktop (1440px+)
- 🛒 **Complete Shopping Cart** - Add, remove, and adjust quantities with persistent state
- ✅ **Robust Checkout Flow** - Multi-step form with real-time validation and error handling
- 💾 **Backend Integration** - Orders stored in Convex with full CRUD operations
- 📧 **Transactional Emails** - Beautiful, responsive order confirmation emails via Resend
- ♿ **Accessible** - WCAG compliant with keyboard navigation and screen reader support
- 🔒 **Edge Case Handling** - Comprehensive validation and error recovery

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Convex account ([sign up free](https://www.convex.dev/))
- A Resend account ([sign up free](https://resend.com/))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/audiophile-ecommerce.git
cd audiophile-ecommerce
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
# Convex
CONVEX_DEPLOYMENT=your_deployment_name
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud

# Resend (for emails)
RESEND_API_KEY=re_your_api_key
RESEND_FROM_EMAIL=orders@yourdomain.com

# App URL (for emails)
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

4. **Initialize Convex**
```bash
npx convex dev
```

This will:
- Create your Convex project
- Set up the database schema
- Start the development server

5. **Run the development server**
```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## 📁 Project Structure

```
audiophile-ecommerce/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── layout.tsx           # Root layout
│   │   ├── page.tsx             # Home page
│   │   ├── products/            # Product pages
│   │   │   └── [slug]/          # Dynamic product details
│   │   ├── checkout/            # Checkout flow
│   │   └── confirmation/        # Order confirmation
│   │
│   ├── components/               # React components
│   │   ├── ui/                  # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │ 
│   │   │  
│   │   ├── layout/              # Layout components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── hero-section.tsx
│   │   ├── product/             # Product components
│   │   │   ├── ProductCard.tsx
│   │   │   ├── ProductGallery.tsx
│   │   │   └── ProductDetail.tsx
│   │   ├── cart/                # Shopping cart
│   │   │   ├── CartModal.tsx
│   │   │
│   │   └── checkout/            # Checkout components
│   │       ├── CustomRadio.tsx
│   │       ├── CheckOutSummary.tsx
|.  |       |__ form-input.tsx
│   │       └─- CashOnDeliveryMessage.tsx
│   │
│   ├── lib/                     # Utilities and helpers
│   │   ├── utils.ts            # Helper functions
│   │   ├── validations.ts      # Zod schemas
│   │ 
│   │
│   ├── hooks/                   # Custom React hooks
│   │   ├── useCart.ts
│   │ 
│   │
│   ├── store/                   # State management
│   │   └── cartStore.ts        # Zustand cart store
│   │
│   └── styles/                  # Global styles
│       └── globals.css
│
├── convex/                      # Convex backend
│   ├── schema.ts               # Database schema
│   ├── orders.ts               # Order mutations/queries
│   └── products.ts             # Product data
│
├── emails/                      # Email templates
│   └── OrderConfirmation.tsx   # Resend React Email
│
└── public/                      # Static assets
    ├── assets/
    
```

## 🗄️ Database Schema

The Convex database uses the following schema:

```typescript
orders: defineTable({     //unique order identifier
    orderId: v.string(),

    customerDetails: v.object({
      name: v.string(),
      email: v.string(),
      phone: v.string(),
    }),

    shippingDetails: v.object({
      address: v.string(),
      zipCode: v.string(),
      city: v.string(),
      country: v.string(),
    }),

    items: v.array(
      v.object({
        id: v.string(),
        name: v.string(),
        slug: v.string(),
        price: v.number(),
        quantity: v.number(),
        image: v.string(),
      })
    ),

    totals: v.object({
      subtotal: v.number(),
      shipping: v.number(),
      vat: v.number(),
      grandTotal: v.number(),
    }),

    paymentMethod: v.string(),
    eMoneyDetails: v.optional(
      v.object({
        eMoneyNumber: v.string(),
        eMoneyPin: v.string(),
      })
    ),

    status: v.string(),
    timestamp: v.number(),
    emailSent: v.optional(v.boolean()),
  })
    .index("by_order_id", ["orderId"])
    .index("by_timestamp", ["timestamp"])
    .index("by_status", ["status"]),
```

## 🎨 Design Implementation

### Breakpoints
- **Mobile**: 375px - 767px
- **Tablet**: 768px - 1439px
- **Desktop**: 1440px+

### Color Palette
```css
--primary: #D87D4A;        /* Audiophile Orange */
--primary-hover: #FBAF85;
--dark: #101010;           /* Almost Black */
--light: #F1F1F1;          /* Off White */
--white: #FFFFFF;
--error: #CD2C2C;
```

### Typography
- **Headings**: Manrope Bold
- **Body**: Manrope Regular/Medium
- **Weights**: 400, 500, 700

## 📧 Email Configuration

### Setting up Resend

1. Sign up at [resend.com](https://resend.com/)
2. Verify your domain (or use the sandbox for testing)
3. Generate an API key
4. Add to `.env.local` as `RESEND_API_KEY`

### Email Features
- ✅ Responsive HTML design
- ✅ Order summary with product images
- ✅ Itemized pricing breakdown
- ✅ Shipping information
- ✅ Brand-consistent styling
- ✅ Call-to-action button

## 🧪 Testing

### Checkout Testing Checklist

- [ ] Valid form submission creates order
- [ ] Invalid email shows error
- [ ] Missing required fields show errors
- [ ] Empty cart prevents checkout
- [ ] Duplicate submissions are prevented
- [ ] Order saves to Convex database
- [ ] Confirmation email is sent
- [ ] User redirects to confirmation page
- [ ] Back button doesn't resubmit order


## 🚢 Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git add .
git commit -m "Initial commit"
git push origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com/)
- Import your repository
- Add environment variables

3. **Configure Convex for Production**
```bash
npx convex deploy
```

Update `NEXT_PUBLIC_CONVEX_URL` in Vercel with your production URL.

4. **Update Resend domain**
- Add your production domain to Resend
- Update `NEXT_PUBLIC_APP_URL` environment variable

### Environment Variables for Production
Ensure all these are set in Vercel:
- `CONVEX_DEPLOYMENT`
- `NEXT_PUBLIC_CONVEX_URL`
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL`
- `NEXT_PUBLIC_APP_URL`

## 🔧 Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npx convex dev       # Start Convex development
npx convex deploy    # Deploy Convex to production
```

## ♿ Accessibility Features

- ✅ Semantic HTML structure
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ Focus visible states
- ✅ Screen reader announcements for cart updates
- ✅ Form error announcements
- ✅ Color contrast compliance (WCAG AA)
- ✅ Alt text for all images

## 🐛 Known Issues & Limitations

- Cart persistence uses localStorage (cleared on browser data reset)
- Email delivery depends on Resend service availability
- Image optimization requires manual asset preparation
- No payment gateway integration (cash on delivery only)

## 📝 Future Enhancements

- [ ] User authentication and order history
- [ ] Real payment gateway integration (Stripe)
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Advanced filtering and search
- [ ] Inventory management
- [ ] Order tracking system
- [ ] Admin dashboard

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Design by [Frontend Mentor](https://www.frontendmentor.io/)
- Built as part of the Frontend Wizards Stage 3 Challenge
- Backend powered by [Convex](https://convex.dev/)
- Emails by [Resend](https://resend.com/)

📬 Contact
Joanna Bassey - @Bassey_Joanna
Project Link: https://github.com/DevBytes-J/audiophile-ecommerce

---

**⭐ If you found this project helpful, please consider giving it a star!**