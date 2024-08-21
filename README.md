# Netra Healthcare Client

Frontend application for Netra Healthcare, a comprehensive telemedicine platform that connects patients with specialists.

## 🔗 Quick Links
- **Live Site**: [https://netra-health-care.vercel.app](https://netra-health-care.vercel.app)

- **Backend Repository**: [Netra Healthcare Server](https://github.com/jahid1971/Netra_Healthcare_server)

## ✨ Features

### For Patients
- Schedule and manage appointments with eye specialists
- Virtual consultations through video conferencing
- Secure medical record access and management
- Prescription viewing and refill requests
- Seamless payment processing via SSLCommerz

### For Doctors
- Patient management dashboard
- Appointment calendar and scheduling
- Video consultation tools with screen sharing
- Prescription creation and management
- Patient medical history access

### For Administrators
- User management (patients, doctors, staff)
- Analytics and reporting dashboard
- Content management for website
- System configuration and monitoring

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Language**: TypeScript
- **UI Library**: Material UI (MUI)
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form with Zod validation
- **Video Consultations**: Agora SDK
- **Real-time Communication**: Socket.IO client
- **API Communication**: Axios
- **Styling**: Emotion, Tailwind CSS
- **Deployment**: Vercel

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/netra-healthcare-client.git
cd netra-healthcare-client
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Configure environment variables
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. Start the development server
```bash
npm run dev
# or
yarn dev
```


## 🧩 Project Structure

```
/
├── app/                    # Next.js app directory
│   ├── (withLayout)/       # Pages with common layout
│   ├── (withoutLayout)/    # Pages without layout
│   ├── api/                # API routes
│   └── page.tsx            # Home page
├── components/             # React components
│   ├── common/             # Shared components
│   ├── dashboard/          # Dashboard-specific components
│   ├── ui/                 # UI components
│   └── layouts/            # Layout components
├── hooks/                  # Custom React hooks
├── lib/                    # Utility functions
├── public/                 # Static assets
├── services/               # API service layer
└── store/                  # Redux store
    ├── api/                # RTK Query API definitions
    └── features/           # Redux slices
```




