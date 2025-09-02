# Leave Management System - Frontend

This repository contains the frontend for a modern Leave Management System, built with React (Vite) and styled with Tailwind CSS. It provides a clean, responsive, and user-friendly interface for both employees and managers.

The Spring Boot backend for this project can be found here:
**[leave-management-system](https://github.com/Sanjal28/leave-management-system)**

---

## ✨ Key Features

The system supports two distinct user roles with specific functionalities:

### 👨‍💼 Manager
-   A modern dashboard with team leave analytics.
-   A dedicated page to view and manage their team members, including updating leave balances.
-   An intuitive interface to view, **approve**, or **reject** leave requests.

### 👷 Employee
-   A personalized dashboard showing their available leave balance and recent activity.
-   An easy-to-use form to apply for new leave.
-   A comprehensive history page to track the status of all their requests.

---

## 🛠️ Tech Stack

-   **React:** For building the user interface.
-   **Vite:** As the fast, modern build tool.
-   **Redux Toolkit:** For efficient and predictable state management.
-   **React Router:** For client-side routing and navigation.
-   **Tailwind CSS:** For utility-first styling and responsive design.
-   **Axios:** For making requests to the backend API.

---

## 🚀 Getting Started

Follow these steps to get the frontend running locally.

### Prerequisites

-   Node.js (v18 or newer recommended)
-   npm or yarn

### Installation & Setup

1.  **Important:** Make sure the [backend server](https://github.com/Sanjal28/leave-management-system) is running first!

2.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Sanjal28/leave-management-frontend.git](https://github.com/Sanjal28/leave-management-frontend.git)
    cd leave-management-frontend
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Configure Environment Variables:**
    -   Create a file named `.env` in the root of the project.
    -   Copy the contents from `.env.example`. This file tells the frontend where to find the backend API.

    ```env
    # .env file content
    VITE_API_BASE_URL=http://localhost:8080/api
    ```

5.  **Run the Development Server:**
    ```bash
    npm run dev
    ```

6.  **App is Live!**
    -   Open your browser and navigate to `http://localhost:5173`.
    -   You can now use the application.
