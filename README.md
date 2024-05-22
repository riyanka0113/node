# Google Drive Risk Report Web Application

This project is a web application that provides analytics for a user's Google Drive. Users can connect their Google Drive account, view analytics such as file type distribution, file size and unique people who have access to their files. Users can also revoke access to their Google Drive if they no longer wish to use the application.

## Features

- **Link Google Drive**: Connect to a Google Drive account and access files.
- **Get Analytics**: Retrieve and display data such as file type, file size, files list and count of unique people with access.
- **Revoke Google Drive Access**: Revoke access to the Google Drive account.
- **Responsive UI/UX**: Landing page and dashboard with a clean and responsive design using React and a CSS framework of choice (e.g., Material UI).

## Tech Stack

- **Frontend**:
  - React
  - React Router
  - React ApexCharts
  - Axios
  - mui

- **Backend**:
  - Node.js
  - Express
  - Mongoose
  - Google APIs
  - Nodemon

- **Database**:
  - MongoDB

## Getting Started

### Prerequisites

- Node.js and npm installed
- MongoDB database
- Google Cloud Project with OAuth 2.0 credentials

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/Riyanka139/gdrive-mb-riyanka-challenge-full-stack.git
    cd gdrive-mb-riyanka-challenge-full-stack
    ```

2. **Backend Setup**:

    - Navigate to the backend directory:
      ```bash
      cd server
      ```
      
    - Create a `.env` file in the `backend` directory and add the following environment variables:
      ```env
      CLIENT_ID=your-google-client-id
      CLIENT_SECRET=your-google-client-secret
      REDIRECT_URL=http://localhost:5000/auth/google/callback
      DB_URL=your-mongodb-connection-string
      PORT=5000
      CLIENT_URL=http://localhost:3000
      ```
      
    - Install backend dependencies:
      ```bash
      npm install
      ```
      
    - Start the backend server:
      ```bash
      node index.js or npm start
      ```

3. **Frontend Setup**:

    - Navigate to the frontend directory:
      ```bash
      cd client
      ```
      
    - Install frontend dependencies:
      ```bash
      npm install
      ```
      
    - Start the frontend development server:
      ```bash
      npm start
      ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Click on the "Link Google Drive" button to authenticate and connect your Google Drive account.
3. View the analytics on the dashboard including file types, file sizes, file list, and unique people with access.
4. To revoke access, click on the "Revoke Access" button.

## Folder Structure
 ```bash
gdrive-mb-riyanka-challenge-full-stack/
├── server/
│ ├── index.js
│ ├── models/
│ │ └── user.model.js
│ ├── controller/
│ │ └── drive.js
│ └── .env
│ ├── package.json
│ └── .gitignore
├── client/
│ ├── public/
│ │ └── index.html
│ ├── src/
│ │ ├── component/ # Component files
│ │ ├── utils/ # API and format files
│ │ ├── App.js
│ │ ├── index.js
│ │ ├── index.css
│ └── theme.js
├── .gitignore
├── package.json
└── README.md
```

## Acknowledgements

- [Google Drive API](https://developers.google.com/drive)
- [React](https://reactjs.org/)
- [Express](https://expressjs.com/)
- [Mongoose](https://mongoosejs.com/)
- [ApexCharts](https://apexcharts.com/)


