import { FolderTreeIcon as FileTree } from "lucide-react"

export default function DockerGameStructure() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Docker Game: Kubernetes vs. Docker Swarm</h1>
      <div className="bg-gray-100 p-4 rounded-lg">
        <FileTree className="mb-2" />
        <pre className="text-sm">
          {`docker-game/
├── src/
│   ├── server.py
│   ├── kubernetes_bot.py
│   ├── swarm_bot.py
│   └── game_logic.py
├── web/
│   ├── index.html
│   ├── styles.css
│   └── script.js
├── Dockerfile
├── docker-compose.yml
└── README.md`}
        </pre>
      </div>
    </div>
  )
}

