# Milestone 2: Project Setup and Login Page

## Overview
This milestone focuses on creating a responsive and user-friendly **Login Page** with modern React components. The page includes essential features such as email and password input fields, a password visibility toggle, and options for user account management.

---

## Login Page Features
### 1. **Responsive Form Layout**
- A fully responsive login form with a clean and minimal design.
- The page uses **Tailwind CSS** for styling and utility classes to ensure responsiveness across devices.

### 2. **Email Input Field**
- Styled with Tailwind utility classes.
- Includes proper validation (`required` attribute) and placeholder for improved usability.

### 3. **Password Input with Visibility Toggle**
- The password field includes an **eye icon toggle** to show or hide the password.
- The functionality is implemented using the `useState` hook in React.
- The icons dynamically switch between visible and hidden states:
  - **Eye Open** icon: Displays the password as plain text.
  - **Eye Slash** icon: Masks the password.

### 4. **"Forgot Password" Link**
- Provides a clickable link to handle password recovery.

### 5. **Remember Me Option**
- Includes a **checkbox** for the "Remember Me" feature, allowing users to save their login session.
- Styled for accessibility and responsiveness.

### 6. **Sign-In Button**
- A fully responsive button with hover effects for enhanced interactivity.
- Designed with Tailwind classes to ensure clarity and focus.

### 7. **Sign-Up Redirect**
- Includes a "Don’t have an account?" section with a link to redirect users to the sign-up page.

---

## Installation and Usage

### Installation:
1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

### Usage:
- Navigate to the **Login Page** to view the implemented features.
- Test the **password visibility toggle**, "Remember Me," and other features to ensure functionality.

---

## Key Code Highlights

### Password Visibility Toggle
The password visibility toggle is implemented using React's `useState` hook:
```javascript
const [showPassword, setShowPassword] = useState(false);
```

A dynamic icon toggles between the **Eye** and **Eye Slash** states:
```jsx
<div
  onClick={() => setShowPassword(!showPassword)}
  className="absolute inset-y-0 right-0 flex items-center pr-3 text-white hover:text-gray-300 cursor-pointer"
>
  {showPassword ? (
    <EyeIcon className="h-5 w-5" />
  ) : (
    <EyeSlashIcon className="h-5 w-5" />
  )}
</div>
```

---

## Dependencies
This milestone uses the following:
1. **React**: For building reusable UI components.
2. **Tailwind CSS**: For responsive and utility-first styling.
3. **SVG Icons**: Used to toggle password visibility.
4. **Mongoose**: Used to connect to DB
5. **Dotenv**: Used to access environment variables.
---
## Milestone 3

## Created Backend Server with a Database connection with MongoDB using Mongoose while using Dotenv to Access Environment Variables.

## db.js
Connects to the MongoDB

## Error.js && ErrorHandler.js
Used to Handle Errors

