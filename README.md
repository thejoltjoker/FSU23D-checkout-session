# FSU23D-checkout-session

### Todo

**General Requirements:**

1. **API Development:**
   - [x] Create a user registration endpoint in the API.
   - [x] Develop a user login endpoint in the API.
   - [x] Implement endpoints to handle product listing, adding to cart, and placing orders.
   - [x] Integrate Stripe API for product management and payment processing.
   - [ ] Implement validation endpoint for payment validation.
   - [x] Integrate PostNord API for retrieving pickup locations.
   - [ ] Set up endpoint for saving orders to a JSON file.

2. **Frontend Development:**
   - [ ] Design and implement a registration form for users.
   - [x] Create a login form for user authentication.
   - [x] Develop pages to display products and allow adding them to the cart.
   - [ ] Implement a checkout process to finalize orders.
   - [ ] Design user interface components for displaying order history and pickup location selection.
   - [ ] Develop user profile section for viewing past orders.

3. **Authentication and Security:**
   - [x] Implement user authentication using cookies in the frontend.
   - [x] Encrypt passwords before saving them in the JSON file on the server.
   - [x] Validate user input to prevent security vulnerabilities like SQL injection and XSS attacks.
   - [x] Secure API endpoints using authentication tokens or session management.

4. **Integration:**
   - [x] Set up Stripe integration for product listing, payment processing, and order validation.

5. **Version Control and Deployment:**
   - [x] Initialize Git repository and set up version control.
   - [x] Push code to GitHub repository for collaboration and backup.
   - [ ] Deploy backend API and frontend application to a hosting service like Heroku or AWS.

**Submission Requirements:**

6. **Documentation:**
   - [ ] Create a detailed README.md file with project title, description, and instructions for building and running the project.
   - [ ] Include a list of fulfilled requirements in the README.md file.
   - [ ] Provide a link to the GitHub repository for easy access to the codebase.

7. **Cleanup:**
   - [ ] Remove the "node_modules" folder from the project directory before submission.
   - [ ] Ensure all dependencies are properly listed in the package.json file.

**Functional Requirements for Approval:**

8. **Product Management:**
   - [x] Display products on a webpage fetched from Stripe.
   - [x] Enable users to add products to the shopping cart.

9. **Order Placement:**
   - [ ] Implement a checkout process allowing users to place orders through Stripe.
   - [ ] Save orders to a JSON file upon successful payment validation.

10. **User Management:**
    - [ ] Enable user registration resulting in a creation of a "Customer" in Stripe.
    - [ ] Implement user login functionality, utilizing the logged-in customer profile from Stripe.

**Additional Requirements for High Approval:**

11. **Discount Code Handling:**
    - [ ] Allow users to enter a discount code for purchase discounts, processed through Stripe.

12. **Order Management:**
    - [ ] Enable logged-in users to view their past orders in the user profile section.

13. **Address and Pickup Location Handling:**
    - [ ] Require users to provide their address before payment.
    - [ ] Implement functionality for users to select a pickup location based on the address using PostNord API.

14. **Email Notification:**
    - [ ] Send an email to the customer upon order confirmation using SendGrid Email API.