# Project Prerequisites & Setup Guide

## Directory Structure
Ensure your projects are organized as sibling directories within a common root (e.g., `simflo-app/`). This structure is critical for the local file dependencies (`file:../xxx`) to resolve correctly.

```
simflo-app/
├── syncflo/           # Shared Real-time Framework & Library
├── simflo-backend/    # Backend Server (depends on syncflo)
└── simflo/            # Mobile App (depends on syncflo & simflo-backend)
```

## Setup 

## Git Version Control
**Current Working Branches:**

| Project | Branch |
| :--- | :--- |
| `simflo` (App) | `backend-integration` |
| `simflo-backend` | `master` |
| `syncflo` | `messaging` |

Please ensure you are checked out to these specific branches to ensure compatibility.

### 1. Syncflo (Shared Library)
This represents the core shared logic.

```bash
cd syncflo
git checkout messaging
npm install
```

### 2. Simflo Backend
The backend server must be running for the app to connect.

```bash
cd simflo-backend
git checkout master
npm install
npm run server  # Starts the API server (default: http://localhost:3001)
```

### 3. Simflo App (Mobile/Web)
The Expo React Native application.

**Installation:**
```bash
cd simflo
git checkout backend-integration
npm install
```

**Running:**
```bash

npm run start 
```


## Daily Workflow
1. **Terminal 1**: Start the Backend
   ```bash
   cd simflo-backend
   git checkout master
   npm run server
   ```
2. **Terminal 2**: Start the App
   ```bash
   cd simflo
   git checkout backend-integration
   npm run start
   ```
