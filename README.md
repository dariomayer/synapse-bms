# Synapse Building Cloud

> 🌐 **Unified Smart Building & Digital Twin Platform**  
> Monitor, simulate and control BACnet, KNX, Modbus and MQTT devices through a modern, role-based web interface.

---

### Overview

**Synapse Building Cloud** is a modular, full-stack platform designed to bridge traditional Building Management Systems (BMS) with cloud-ready technologies.  
Built with a **TypeScript Node.js backend** and a **React + Shadcn UI frontend**, it enables the simulation, visualization and control of smart building devices in real time.

Each module is built to reflect real-world BMS architectures — from field devices to digital twin visualization.

---

### 🔧 Key Features

- **Multi-Protocol Gateway**: BACnet/IP, Modbus TCP, KNX (simulated or live)
- **Real-Time Dashboard**: visualize, control and trend building points
- **3D Digital Twin**: interactive floor plan built with React + Three.js
- **MQTT / REST API Layer**: for IoT and cloud integration
- **Role-Based Access Control**: authentication via BetterAuth
- **Docker-Ready**: easily deploy on CapRover or local environment

---

### 🧭 Roadmap (Milestones)
1. Core Platform & Visual Dashboard  
2. BACnet Integration  
3. Modbus & KNX Gateway  
4. Digital Twin Visualization  
5. Cloud Integration & Analytics  

---

### 💡 Vision
**Synapse Building Cloud** aims to demonstrate how industrial protocols and modern cloud software can converge into a single, scalable ecosystem — turning building automation into data-driven intelligence.

---

**Built by Dario Pratola using React & TypeScript with AI pair programming, continuously deployed to CapRover from GitHub.**

---


### 📝 How to Get Started:

#### 1. Fork or Clone the Repository
```bash
# Option A: Fork on GitHub (recommended)
# Click the "Fork" button at the top of this repository

# Option B: Clone directly
git clone https://github.com/dariopratola/synapse-bms.git
cd synapse-bms
```

#### 2. Install Dependencies
```bash
pnpm install
```

#### 3. Test Locally
```bash
pnpm dev
```
Open `http://localhost:5173` to see the app in action

#### 4. Deploy to Docker
to be added

## Technologies

This project leverages modern web technologies to build a fast, scalable, and maintainable full‑stack platform. The stack is grouped by area to avoid repetition.

### Backend
- **Node.js + TypeScript** — typed runtime for reliability and maintainability
- **Express** — REST services
- **WebSocket** — real-time data streaming
- **MongoDB** — device/points/config storage

### Protocols & Messaging
- **BACnet/IP** via `node-bacstack`
- **Modbus TCP** via `modbus-serial`
- **KNX** via `knx.js`
- **MQTT** (Mosquitto/EMQX)
- **REST API** for integrations

### Frontend
- **React 18 + Vite + TypeScript**
- **Redux** — state management and role-based UI rendering
- **i18next**, **react-i18next**, **browser-languagedetector** — internationalization

### Visualization & Charts
- **Three.js** or **Babylon.js** — 3D Digital Twin
- **Recharts** or **Chart.js** — live trends
- **Framer Motion** — smooth UI transitions

### UI & Styling
- **Tailwind CSS v4**
- **PostCSS**
- **shadcn/ui** components
- **Lucide React** icons

### Developer Experience & Docs
- **pnpm** — package manager
- **ESLint** — linting
- **Swagger/OpenAPI** — API documentation

### Deployment & Analytics
- **Docker Compose** — container orchestration
- **CapRover** — app deployment
- **InfluxDB + Grafana** — historical data & dashboards


## License
- MIT © Dario Pratola (see `LICENSE`).
