# 🐳 Docker Game: Kubernetes vs. Docker Swarm

> A real-time strategy game where AI-powered bots representing **Kubernetes** and **Docker Swarm** battle it out in a containerized infrastructure showdown — visualized through a modern Next.js 14 dashboard.

---

## 🎮 Game Overview

Two teams — **Team Kubernetes** and **Team Docker Swarm** — go head-to-head in a live, browser-based strategy game. Each team is controlled by an AI bot that autonomously makes decisions about deploying, scaling, healing, and optimizing containerized services. The team with the best uptime, efficiency, and resilience wins.

The game backend is written in **Python** using `asyncio` and **WebSockets**, while the game visualization dashboard is built with **Next.js 14**, **shadcn/ui**, and **Tailwind CSS**. The entire stack is containerized with **Docker** and deployable via **Docker Compose**, with **Terraform** configs for cloud infrastructure provisioning and **GitHub Actions** for CI/CD.

---

## ✨ Features

- **Live AI Bots** — Kubernetes and Docker Swarm bots make autonomous, real-time decisions every second
- **WebSocket Game Server** — Python `asyncio` + `websockets` broadcast live game state to all connected clients
- **4 Game Actions per Bot** — deploy/create, scale, heal/resurrect, and optimize/balance
- **Real-time Battle Stats** — Track traffic, uptime, and efficiency as the battle unfolds
- **Next.js 14 Dashboard** — Beautiful, interactive visualization of the game built with App Router and shadcn/ui
- **Fully Containerized** — Dockerfile + Docker Compose for one-command startup
- **Terraform IaC** — Cloud infrastructure configuration for production deployment
- **CI/CD Pipeline** — GitHub Actions workflow for automated testing and deployment
- **Dark Mode Support** — Themed UI via `next-themes`
- **Responsive UI** — Fully mobile-friendly dashboard

---

## 🏗️ Architecture

```
┌──────────────────────────────────────────────────────────┐
│                    Browser (Port 80)                      │
│           Next.js 14 Dashboard / index.html               │
└─────────────────────┬────────────────────────────────────┘
                      │ WebSocket (ws://localhost:8765)
                      │
┌─────────────────────▼────────────────────────────────────┐
│                  server.py (Port 8080)                    │
│           AsyncIO WebSocket Game Server                   │
│                                                           │
│   ┌───────────────────┐   ┌────────────────────────┐     │
│   │  KubernetesBot    │   │      SwarmBot           │     │
│   │  kubernetes_bot.py│   │      swarm_bot.py       │     │
│   └───────────────────┘   └────────────────────────┘     │
│                    ┌──────────────┐                       │
│                    │  game_logic.py                       │
│                    │  (GameState) │                       │
│                    └──────────────┘                       │
└──────────────────────────────────────────────────────────┘
                      │
┌─────────────────────▼────────────────────────────────────┐
│               nginx:alpine (Port 80)                      │
│          Serves static web/ files                         │
└──────────────────────────────────────────────────────────┘
```

---

## 📁 Project Structure

```
K8-dockerGame/
│
├── .github/
│   └── workflows/              # GitHub Actions CI/CD pipeline
│
├── app/                        # Next.js 14 App Router pages & layouts
├── components/                 # Reusable React components (shadcn/ui)
├── hooks/                      # Custom React hooks
├── lib/                        # Utility functions (cn, etc.)
├── styles/                     # Global stylesheets
├── public/                     # Static assets
│
├── docker/                     # Docker configuration files
│
├── terraform/                  # Terraform IaC for cloud deployment
│
├── scripts/                    # Utility/setup scripts
│
├── src/                        # Python game backend (inside container)
│   ├── server.py               # AsyncIO WebSocket game server
│   ├── kubernetes_bot.py       # Kubernetes AI bot logic
│   ├── swarm_bot.py            # Docker Swarm AI bot logic
│   └── game_logic.py          # GameState management
│
├── web/                        # Static HTML frontend (inside container)
│   ├── index.html              # Game visualization UI
│   ├── styles.css              # Game UI styles
│   └── script.js              # WebSocket client + UI updates
│
├── file-contents.tsx           # Tabbed source viewer component (Next.js)
├── project-structure.tsx       # Project file tree component (Next.js)
├── Dockerfile                  # Python 3.9 game server container
├── docker-compose.yml          # Orchestrates game-server + nginx
├── components.json             # shadcn/ui configuration
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS configuration
├── tsconfig.json               # TypeScript config
├── postcss.config.mjs          # PostCSS config
└── package.json                # Node.js dependencies & scripts
```

---

## 🤖 AI Bots

### Kubernetes Bot (`kubernetes_bot.py`)

The Kubernetes bot acts as a diligent container fleet captain. Every turn it evaluates the game state and picks the best move:

| Action | Trigger Condition | What It Does |
|---|---|---|
| `deploy` | Behind Swarm in service count | Launches a new `k8s-service-N` |
| `scale` | Traffic > (deployed services × 10) | Scales up a random service |
| `heal` | Any unhealthy services detected | Restores a failed service to 1 replica |
| `optimize` | No urgent issues | Performs resource housekeeping |

```python
def get_action(self, game_state):
    if self.should_deploy_new_service(game_state):
        return self.deploy_service()
    elif self.should_scale_service(game_state):
        return self.scale_service()
    elif self.should_heal_service(game_state):
        return self.heal_service()
    else:
        return self.optimize_resources()
```

---

### Docker Swarm Bot (`swarm_bot.py`)

The Docker Swarm bot operates like a master beekeeper — tending to its hive of containers constantly:

| Action | Trigger Condition | What It Does |
|---|---|---|
| `create` | Behind Kubernetes in service count | Creates a new `swarm-service-N` |
| `scale` | Traffic > (total replicas × 5) | Scales up a random service |
| `resurrect` | Any services with 0 replicas | Brings a dead service back to 1 replica |
| `balance` | No urgent issues | Balances workload across the swarm |

```python
def get_action(self, game_state):
    if self.need_more_services(game_state):
        return self.create_service()
    elif self.should_we_scale(game_state):
        return self.scale_service()
    elif self.any_services_down(game_state):
        return self.resurrect_service()
    else:
        return self.balance_swarm()
```

---

## 🔌 Game Server (`server.py`)

The WebSocket game server is the referee. It:
- Runs an async game loop that ticks every **1 second**
- Asks each bot for its action on every tick
- Updates the `GameState` with both actions
- Broadcasts the new state as JSON to **all connected clients**
- Listens on **port 8765** for WebSocket connections
- Serves the game on **port 8080**

```python
async def game_loop(self):
    while True:
        k8s_action  = self.k8s_bot.get_action(self.game_state)
        swarm_action = self.swarm_bot.get_action(self.game_state)
        self.game_state.update(k8s_action, swarm_action)
        await self.broadcast(json.dumps(self.game_state.to_dict()))
        await asyncio.sleep(1)
```

---

## 🎯 Game Metrics (Battle Stats)

The real-time dashboard tracks three core stats:

| Stat | Description |
|---|---|
| **Traffic** | Current load the infrastructure must handle |
| **Uptime** | Percentage of services running without failure |
| **Efficiency** | How well resources are being utilized |

---

## 🛠️ Tech Stack

### Game Backend (Python)
| Component | Technology |
|---|---|
| Language | Python 3.9 |
| Async Runtime | `asyncio` |
| Real-time Comms | `websockets` |
| Data Format | JSON |
| Web Server | Built-in HTTP (port 8080) |
| Static Serving | Nginx (Alpine) |

### Dashboard Frontend (Next.js)
| Component | Technology |
|---|---|
| Framework | Next.js 14.2.16 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3, tailwindcss-animate |
| UI Library | shadcn/ui + Radix UI |
| Icons | lucide-react |
| Forms | react-hook-form + zod |
| Theming | next-themes |
| Charts | recharts |
| Toasts | sonner |

### Infrastructure & DevOps
| Component | Technology |
|---|---|
| Containerization | Docker (Python 3.9-slim base) |
| Orchestration | Docker Compose v3 |
| IaC | Terraform |
| CI/CD | GitHub Actions |
| Static Hosting | Nginx Alpine |

---

## 🚀 Quick Start

### Option 1 — Docker Compose (Recommended)

The fastest way. Starts the game server + nginx in one command.

```bash
# Clone the repository
git clone https://github.com/pranjalisr/K8-dockerGame.git
cd K8-dockerGame

# Start everything
docker-compose up

# Open the game in your browser
open http://localhost:8080
```

To run in the background:
```bash
docker-compose up -d
```

To stop:
```bash
docker-compose down
```

---

### Option 2 — Run Locally (Python)

```bash
# Install Python dependencies
pip install websockets asyncio

# Start the game server
cd src
python server.py
```

Then open `web/index.html` in your browser and watch the battle unfold.

---

### Option 3 — Next.js Dashboard

```bash
# Install Node.js dependencies
npm install

# Run the development server
npm run dev

# Open http://localhost:3000
```

---

## 🐋 Docker Configuration

### Dockerfile

The game server runs on a minimal `python:3.9-slim` image:

```dockerfile
FROM python:3.9-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY src/ .
COPY web/ ./web/

EXPOSE 8080

CMD ["python", "server.py"]
```

### docker-compose.yml

Two services — game server + nginx static file host:

```yaml
version: '3'

services:
  game-server:
    build: .
    ports:
      - "8080:8080"
    volumes:
      - ./src:/app/src
      - ./web:/app/web
    environment:
      - PYTHONUNBUFFERED=1

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
    volumes:
      - ./web:/usr/share/nginx/html
    depends_on:
      - game-server
```

**Ports at a glance:**

| Port | Service | Purpose |
|---|---|---|
| `80` | nginx | Serves HTML/CSS/JS frontend |
| `8080` | game-server | Game server HTTP endpoint |
| `8765` | game-server | WebSocket connection for live updates |

---

## ⚙️ CI/CD Pipeline (`.github/workflows/`)

The repository includes a GitHub Actions workflow that runs automatically on push/PR to `master`. The pipeline typically handles:

- Dependency installation and linting
- Docker image build verification
- Automated testing
- Deployment to target environment (configured via repository secrets)

---

## 🌍 Terraform (Infrastructure as Code)

The `terraform/` directory contains configurations for provisioning cloud infrastructure to run this game at scale. This enables deploying the game server to a cloud provider (AWS, GCP, Azure) with infrastructure defined as code rather than manually configured.

To apply Terraform configs:

```bash
cd terraform
terraform init
terraform plan
terraform apply
```

> **Note:** Configure your cloud provider credentials before running Terraform.

---

## 📜 Available Scripts

### Next.js
| Command | Description |
|---|---|
| `npm run dev` | Start development server at `localhost:3000` |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

### Docker
| Command | Description |
|---|---|
| `docker-compose up` | Start all services |
| `docker-compose up -d` | Start in detached mode |
| `docker-compose down` | Stop and remove containers |
| `docker-compose logs -f` | Follow service logs |
| `docker build -t k8-docker-game .` | Build image manually |

---

## 🧩 Next.js Components

### `file-contents.tsx`
A tabbed viewer component (`shadcn/ui` Tabs) that renders the actual game source files as syntax-highlighted code blocks. Tabs include: `README.md`, `server.py`, `kubernetes_bot.py`, `swarm_bot.py`, `index.html`, `Dockerfile`, and `docker-compose.yml`.

### `project-structure.tsx`
A component that renders the game's internal file tree using `lucide-react`'s `FolderTree` icon alongside a `<pre>` block showing the directory layout.

---

## 🤝 Contributing

Contributions, ideas, and new challenge types are very welcome!

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/new-challenge`
3. Commit your changes: `git commit -m "feat: add new challenge type"`
4. Push to the branch: `git push origin feature/new-challenge`
5. Open a Pull Request

**Ideas for contributions:**
- Add new game challenge types (network partitions, rolling updates, etc.)
- New metrics to the battle stats dashboard
- Leaderboard / game history tracking
- Add more AI bot strategies
- Improve Terraform configs for multi-region deployment

---

## 📄 License

This project is licensed under the **MIT License** — see the `LICENSE` file for details.

---

> 🏆 May the best container orchestrator win!
