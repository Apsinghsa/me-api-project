
# Me-API Playground (Track A Assessment)

A basic "Me-API" playground that stores candidate profile information in a MongoDB database and exposes it via a REST API with a minimal React frontend.

## Architecture

*   **Frontend**: React (Vite) + TypeScript
    *   Minimal, monochromatic design.
    *   Responsive layout for viewing profile, skills, and projects.
*   **Backend**: Node.js + Express + TypeScript
    *   RESTful API endpoints.
    *   Mongoose for MongoDB object modeling.
*   **Database**: MongoDB
    *   Stores profile data, projects, and skills.
    *   Uses text indexes for search functionality.

## Setup Instructions

### Prerequisites
*   Node.js (v18+ recommended)
*   MongoDB (Local or Atlas URI)

### Local Setup

1.  **Clone the repository**
    ```bash
    git clone <repository-url>
    cd intern-project
    ```

2.  **Backend Setup**
    ```bash
    cd server
    npm install
    
    # Create .env file
    cp .env.example .env
    # Edit .env and provide your MONGO_URI
    ```
    
    **Seed Database** (Populate with initial data)
    ```bash
    npm run seed
    ```

    **Start Server**
    ```bash
    npm run dev
    ```
    Server will run on `http://localhost:5000` (or configured PORT).

3.  **Frontend Setup**
    ```bash
    cd ../client
    npm install
    npm run dev
    ```
    Frontend will run on `http://localhost:5173`.

## Architecture & Schema

### Database Schema (MongoDB)

**Candidate Collection**
```typescript
{
  name: String,       // "Arvind Pratap Singh"
  email: String,      // Unique, lowercase
  phone: String,
  education: {
    degree: String,
    institution: String,
    cgpa: Number
  },
  skills: [String],   // Indexed for search
  projects: [{
    title: String,
    description: String,
    stack: [String],
    links: {
      github: String,
      demo: String
    }
  }],
  links: Map<String, String> // github, linkedin, portfolio
}
```

### API Endpoints

| Method | Endpoint | Description | Query Params |
| :--- | :--- | :--- | :--- |
| `GET` | `/health` | Server health check | - |
| `GET` | `/api/profile` | Get full candidate profile | - |
| `POST` | `/api/profile` | Create/Update profile | - |
| `GET` | `/api/projects` | List projects | `skill`, `keyword` |
| `GET` | `/api/search` | Search candidates | `q` (required) |

### Sample CURL Requests

**Get Profile**
```bash
curl http://localhost:5000/api/profile
```

**Search Projects by Skill**
```bash
curl "http://localhost:5000/api/projects?skill=React"
```

**Global Search**
```bash
curl "http://localhost:5000/api/search?q=AI"
```

## Known Limitations

*   **Authentication**: The API currently allows unrestricted read/write access to the profile via `POST /api/profile`. Basic auth is not yet implemented.
*   **Rate Limiting**: No rate limiting is enforced on the API.
*   **Search**: Uses MongoDB text search which provides basic matching but may not handle complex fuzzy queries as robustly as elastic search.

## Resume

[Link to Resume](https://drive.google.com/file/d/14E0FlbPJW0wF3WJksvUtd4ui-dH1yATg/view?usp=sharing)
