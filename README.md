<h1 align="center">
  <img src="client/public/screenshot_01.png" alt="Screenshot">
  <br/>
  King Kong's Banana Kingdom
</h1>

<h4 align="center">Fullstack Banana Web Shop with Custom Login, Stripe Integration, and PostNord API</h4>
<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#installation">Installation</a> •
  <a href="#api-endpoints">API Endpoints</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

## Key Features

- Custom login using cookie-session for user authentication.
- Integration with Stripe API for product management and payments.
- Utilization of PostNord API to provide service points for delivery.
- Backend built with Express and TypeScript.
- Client built with React and Tailwind.

## How To Use

### Installation

1. Clone the repository from [GitHub](https://github.com/thejoltjoker/FSU23D-checkout-session).
2. Navigate to the project directory.
3. Follow instructions to set up [client](./client/README.md) and [server](./server/README.md).
4. Run `npm run dev` in the `server` directory.
5. Open a new terminal and run `npm run dev` in the `client` directory.
6. Navigate to <http://localhost:5173> in your favorite browser to use the app.

#### Client Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/thejoltjoker/FSU23D-checkout-session.git
   cd FSU23D-checkout-session/client
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server with the following command:

   ```bash
   npm run dev
   ```

#### Server Setup

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
   ```

4. Start the server with the following command:

   ```bash
   npm run start
   ```

## Related

- [FSU23D-the-restaurant](https://github.com/thejoltjoker/FSU23D-the-restaurant) - Second group assignment in the full stack course at Medieinstitutet.

### You may also like...

- [Picterest](https://github.com/thejoltjoker/picterest) - Full-stack app integrating Google Custom Search and Auth0 for user login, image search, and saving favorites. First assignment of FSU23D Integration course.
- [SnapCat](https://github.com/thejoltjoker/snapcat) - Mock Social Media for Cats, Powered by React, TypeScript, React Router, Vite, and Tailwind CSS.

## License

This project is licensed under the [MIT License](LICENSE).
