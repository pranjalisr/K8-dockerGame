import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function FileContents() {
  return (
    <Tabs defaultValue="readme" className="w-full">
      <TabsList>
        <TabsTrigger value="readme">README.md</TabsTrigger>
        <TabsTrigger value="server">server.py</TabsTrigger>
        <TabsTrigger value="kubernetes">kubernetes_bot.py</TabsTrigger>
        <TabsTrigger value="swarm">swarm_bot.py</TabsTrigger>
        <TabsTrigger value="html">index.html</TabsTrigger>
        <TabsTrigger value="dockerfile">Dockerfile</TabsTrigger>
        <TabsTrigger value="compose">docker-compose.yml</TabsTrigger>
      </TabsList>
      <TabsContent value="readme">
        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96">
          {`# 🐳 Docker Game: Kubernetes vs. Docker Swarm

Welcome to the ultimate container orchestration showdown! In this exciting real-time strategy game, Kubernetes and Docker Swarm go head-to-head in a battle of containerized might!

## 🎮 Game Overview

Two teams, representing Kubernetes and Docker Swarm, compete to manage the best containerized infrastructure. Players face challenges testing their uptime, efficiency, and resilience in a fast-paced, container-deploying frenzy!

## 🚀 Features

- Real-time strategy gameplay
- AI-powered bots for Kubernetes and Docker Swarm
- Web-based user interface for game visualization
- Challenges including service deployment, scaling, and fault tolerance

## 🛠 Tech Stack

- Python (Game server and AI bots)
- HTML/CSS/JavaScript (Frontend)
- Docker (Containerization)

## 🏁 Quick Start

1. Clone this repository
2. Run \`docker-compose up\`
3. Open your browser and navigate to \`http://localhost:8080\`
4. Watch the container battle unfold!

## 🤝 Contributing

We'd love your input! Feel free to open issues, submit PRs, or suggest new game features.

## 📜 License

This project is licensed under the MIT License - see the \`LICENSE\` file for details.

May the best container orchestrator win! 🏆`}
        </pre>
      </TabsContent>
      <TabsContent value="server">
        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96">
          {`import asyncio
import websockets
import json
from game_logic import GameState
from kubernetes_bot import KubernetesBot
from swarm_bot import SwarmBot

class GameServer:
    def __init__(self):
        self.game_state = GameState()
        self.k8s_bot = KubernetesBot()
        self.swarm_bot = SwarmBot()

    async def game_loop(self):
        while True:
            # Update game state
            k8s_action = self.k8s_bot.get_action(self.game_state)
            swarm_action = self.swarm_bot.get_action(self.game_state)
            
            self.game_state.update(k8s_action, swarm_action)
            
            # Send updated state to all connected clients
            await self.broadcast(json.dumps(self.game_state.to_dict()))
            
            # Pause for a moment to control game speed
            await asyncio.sleep(1)

    async def handle_client(self, websocket, path):
        try:
            await websocket.send(json.dumps(self.game_state.to_dict()))
            async for message in websocket:
                # Handle any client messages here (e.g., start game, pause)
                pass
        finally:
            print("Client disconnected")

    async def broadcast(self, message):
        if self.clients:  # Check if there are any connected clients
            await asyncio.wait([client.send(message) for client in self.clients])

    async def main(self):
        server = await websockets.serve(self.handle_client, "localhost", 8765)
        await asyncio.gather(server.wait_closed(), self.game_loop())

if __name__ == "__main__":
    game_server = GameServer()
    asyncio.run(game_server.main())

# This server is like the referee of our container battle.
# It keeps track of the game state, tells the bots when to make their moves,
# and keeps all the spectators (our web clients) updated on the action.
# It's making sure our container showdown is fair and exciting!`}
        </pre>
      </TabsContent>
      <TabsContent value="kubernetes">
        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96">
          {`import random

class KubernetesBot:
    def __init__(self):
        self.deployed_services = {}

    def get_action(self, game_state):
        # Let's think about our next move...
        if self.should_deploy_new_service(game_state):
            return self.deploy_service()
        elif self.should_scale_service(game_state):
            return self.scale_service()
        elif self.should_heal_service(game_state):
            return self.heal_service()
        else:
            return self.optimize_resources()

    def should_deploy_new_service(self, game_state):
        # Are we falling behind in service count?
        return len(self.deployed_services) < game_state.swarm_services

    def deploy_service(self):
        service_name = f"k8s-service-{len(self.deployed_services) + 1}"
        self.deployed_services[service_name] = 1
        return {"action": "deploy", "service": service_name}

    def should_scale_service(self, game_state):
        # Is there a sudden spike in traffic?
        return game_state.traffic > len(self.deployed_services) * 10

    def scale_service(self):
        service_to_scale = random.choice(list(self.deployed_services.keys()))
        self.deployed_services[service_to_scale] += 1
        return {"action": "scale", "service": service_to_scale}

    def should_heal_service(self, game_state):
        # Do we have any unhealthy services?
        return game_state.k8s_unhealthy_services > 0

    def heal_service(self):
        # Find an unhealthy service and heal it
        unhealthy_service = next(service for service, count in self.deployed_services.items() if count == 0)
        self.deployed_services[unhealthy_service] = 1
        return {"action": "heal", "service": unhealthy_service}

    def optimize_resources(self):
        # Let's do some housekeeping
        return {"action": "optimize", "target": "resources"}

# This Kubernetes bot is like a diligent container captain.
# It's always on the lookout for ways to improve its fleet of services.
# Whether it's launching new ships (services), reinforcing the crew (scaling),
# patching up damaged vessels (healing), or making sure everything runs smoothly (optimizing),
# this bot is determined to prove Kubernetes is the ultimate container admiral!`}
        </pre>
      </TabsContent>
      <TabsContent value="swarm">
        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96">
          {`import random

class SwarmBot:
    def __init__(self):
        self.services = {}

    def get_action(self, game_state):
        # Time to plan our swarm strategy!
        if self.need_more_services(game_state):
            return self.create_service()
        elif self.should_we_scale(game_state):
            return self.scale_service()
        elif self.any_services_down(game_state):
            return self.resurrect_service()
        else:
            return self.balance_swarm()

    def need_more_services(self, game_state):
        # Are we keeping up with Kubernetes in service count?
        return len(self.services) < game_state.k8s_services

    def create_service(self):
        service_name = f"swarm-service-{len(self.services) + 1}"
        self.services[service_name] = 1
        return {"action": "create", "service": service_name}

    def should_we_scale(self, game_state):
        # Can we handle the current traffic?
        return game_state.traffic > sum(self.services.values()) * 5

    def scale_service(self):
        service = random.choice(list(self.services.keys()))
        self.services[service] += 1
        return {"action": "scale", "service": service}

    def any_services_down(self, game_state):
        # Do we need to bring any services back online?
        return game_state.swarm_unhealthy_services > 0

    def resurrect_service(self):
        # Find a service that's down and bring it back up
        down_service = next(service for service, count in self.services.items() if count == 0)
        self.services[down_service] = 1
        return {"action": "resurrect", "service": down_service}

    def balance_swarm(self):
        # Let's make sure our swarm is working at peak efficiency
        return {"action": "balance", "target": "swarm"}

# Our Docker Swarm bot is like a master beekeeper.
# It's constantly tending to its hive of containers, making sure the swarm is healthy and productive.
# Whether it's spawning new worker bees (services), growing the hive (scaling),
# reviving fallen comrades (resurrecting), or ensuring the swarm works in perfect harmony (balancing),
# this bot is buzzing with determination to prove Swarm's worth!`}
        </pre>
      </TabsContent>
      <TabsContent value="html">
        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96">
          {`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Docker Game: Kubernetes vs. Docker Swarm</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="game-container">
        <div id="kubernetes-side" class="team-side">
            <h2>Kubernetes</h2>
            <div id="k8s-services"></div>
            <div id="k8s-stats"></div>
        </div>
        <div id="swarm-side" class="team-side">
            <h2>Docker Swarm</h2>
            <div id="swarm-services"></div>
            <div id="swarm-stats"></div>
        </div>
        <div id="game-stats">
            <h3>Battle Stats</h3>
            <p>Traffic: <span id="traffic"></span></p>
            <p>Uptime: <span id="uptime"></span></p>
            <p>Efficiency: <span id="efficiency"></span></p>
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>

<!-- This HTML is like the arena for our epic container battle.
     It sets up the stage where Kubernetes and Docker Swarm will duke it out,
     complete with scoreboards (stats) and a play-by-play announcer (game stats).
     It's going to be a showdown for the ages! -->
`}
        </pre>
      </TabsContent>
      <TabsContent value="dockerfile">
        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96">
          {`# Start with a Python base image
FROM python:3.9-slim

# Set up our workshop
WORKDIR /app

# Bring in the tools we need
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy our game files
COPY src/ .
COPY web/ ./web/

# Open up port 8080 for the world to see our game
EXPOSE 8080

# Start the game server when the container launches
CMD ["python", "server.py"]

# This Dockerfile is like a recipe for our game's home.
# It sets up a cozy Python environment, brings in all our game files,
# and makes sure the game is ready to play as soon as the container starts.
# It's creating a perfect little world for our container battle to unfold!`}
        </pre>
      </TabsContent>
      <TabsContent value="compose">
        <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-auto max-h-96">
          {`version: '3'
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

# This docker-compose file is like a stage manager for our container showdown.
# It sets up the game server and a web server to display the action.
# With just a simple 'docker-compose up', we can bring this entire 
# container battle arena to life! It's containerception at its finest!`}
        </pre>
      </TabsContent>
    </Tabs>
  )
}

