# xSaloon - Luxury Salon Experience

Welcome to the **xSaloon** frontend repository! This is a modern, fully responsive, and animated website built for a premium salon located on Vaghodia Road, Baroda. It features a complete showcase of services, special offers, customer testimonials, and an integrated booking form.

## 🌟 Features

-   **Modern Tech Stack:** Built with [Next.js](https://nextjs.org/) (App Router), TypeScript, and [Tailwind CSS v4](https://tailwindcss.com/).
-   **Smooth Animations:** Utilizes [Framer Motion](https://www.framer.com/motion/) for scroll-triggered fade-ins, parallax effects, and interactive hover states.
-   **Beautiful Icons:** Integrated with [Lucide React](https://lucide.dev/) for crisp, consistent iconography.
-   **Fully Responsive:** Designed to look stunning on mobile phones, tablets, and large desktop screens.
-   **Key Sections:**
    -   **Hero:** Captivating introduction with a clear Call to Action.
    -   **About Us:** Information about the salon's expertise and legacy.
    -   **Services:** Detailed grid of offerings (Haircut, Spa, Coloring, Bridal Makeup, etc.) with pricing.
    -   **Offers:** Highlighted deals and combos with discount codes.
    -   **Testimonials:** Real reviews from satisfied clients.
    -   **Booking Form:** A structured form for users to request appointments (currently frontend-only).
    -   **Location:** Contact details and an embedded Google Map for easy navigation to Vaghodia Road.

---

## 💻 For Developers

Follow these instructions to set up the project locally, modify code, and build for production.

### Prerequisites

-   [Node.js](https://nodejs.org/) (v18.17.0 or higher recommended)
-   [npm](https://www.npmjs.com/) (usually comes with Node.js)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-directory>
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Development Commands

-   **Start the development server:**
    Run this command to start a local server with Fast Refresh.
    ```bash
    npm run dev &
    ```
    *Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.*

-   **Lint the code:**
    Run ESLint to find and fix problematic patterns in the code.
    ```bash
    npm run lint
    ```

-   **Build for production:**
    Creates an optimized production build.
    ```bash
    npm run build
    ```

-   **Start the production server:**
    Starts a Next.js server based on the production build (must run \`npm run build\` first).
    ```bash
    npm start &
    ```

### Project Structure

-   \`src/app/\`: Contains the Next.js App Router layout, global styles (\`globals.css\`), and the main page (\`page.tsx\`).
-   \`src/components/\`: Reusable UI components.
    -   \`home/\`: Sections specific to the homepage (\`Hero.tsx\`, \`About.tsx\`, \`Booking.tsx\`, etc.).
    -   \`Navbar.tsx\` & \`Footer.tsx\`: Global navigation and footer.
-   \`src/lib/\`: Utility functions (like Tailwind \`cn\` merger).
-   \`public/\`: Static assets (images, icons).

---

## 👥 For Users / Clients

If you are a user looking to interact with the website or an admin wanting to understand how it works:

### How to Use the Website

1.  **Navigation:** Use the top menu bar to quickly jump to different sections of the website (Home, About, Services, Offers, Testimonials, Contact). On mobile devices, tap the menu icon (hamburger) in the top right to open the navigation menu.
2.  **Viewing Services:** Scroll down to the "Signature Services" section to see a list of treatments offered, along with starting prices and descriptions.
3.  **Finding Offers:** Check the "Current Offers" section for the latest discounts and promo codes. You can mention these codes during your visit.
4.  **Booking an Appointment:**
    -   Navigate to the "Book an Appointment" section.
    -   Fill in your **Full Name** and **Phone Number**.
    -   Select your desired **Service** from the dropdown menu.
    -   Choose a preferred **Date** and **Time Slot** (Morning, Afternoon, or Evening).
    -   Add any specific requests in the **Additional Notes** box.
    -   Click the **Confirm Booking** button. *(Note: Currently, this submits the request. In a fully connected system, this will notify the salon administration).*
5.  **Finding the Salon:** Scroll to the bottom of the page to the "Visit Our Saloon" section to see the exact address on Vaghodia Road, contact numbers, and an interactive Google Map. Click "Get Directions" to open the location in Google Maps on your device.

### Future Admin Capabilities (Planned)

In the future, a backend administration panel will be added, allowing you to:
-   Update the Google Map location dynamically.
-   Modify service names, descriptions, and prices.
-   Add or remove promotional offers.
-   View, accept, and manage customer booking requests directly.

---

Built with ❤️ for xSaloon.
