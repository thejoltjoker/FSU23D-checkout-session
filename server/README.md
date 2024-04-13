# Express Server for Bananza

Express server that performs banana searches, stores users, and manages their favorite bananas in a JSON file. This project is designed to demonstrate the integration of these technologies for a basic web application for a banana web shop.

## Getting Started

### Prerequisites

Before you begin, make sure you have the following installed:

- Node.js and npm

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/thejoltjoker/FSU23D-checkout-session.git
   cd FSU23D-checkout-session/server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add the following:

   ```env
   PORT=3000
   SESSION_SECRET=my-session-secret
   STRIPE_API_KEY=sk_test_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   POSTNORD_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   RESEND_API_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```

4. Start the server with the following command:

   ```bash
   npm run start
   ```

## API Endpoints

### User authentication

- `POST http://localhost:3000/api/user/register`
- `POST http://localhost:3000/api/user/login`
- `POST http://localhost:3000/api/user/logout`
- `GET http://localhost:3000/api/user/authorize`

### Checkout session

- `GET http://localhost:3000/api/checkout/session/:sessionId`
- `POST http://localhost:3000/api/checkout/session/create`

### Orders

- `POST http://localhost:3000/api/orders/save`
- `GET http://localhost:3000/api/orders/:orderId`

### Products

- `GET http://localhost:3000/api/products/`
- `GET http://localhost:3000/api/products/:productId`
- `GET http://localhost:3000/api/products/promotions/check/:promoCode`

### Shipping

- `GET http://localhost:3000/api/shipping/service-points/45330`
