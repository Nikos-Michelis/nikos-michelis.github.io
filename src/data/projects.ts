import { asset } from "@/lib/asset"
import type { Project } from "@/types/cv"

export const PROJECTS: Project[] = [
  {
    id: "moonkeyeu",
    name: "MoonkeyEU",
    type: "Fullstack",
    status: "in-progress",
    href: "https://www.moonkeyeu.com",
    image: "https://cdn.moonkeyeu.com/media/assets/logo/moonkeyeu-logo.png",
    imageCaption: "MoonkeyEU — a space launch tracker for past and upcoming launches",
    gallery: [
      { src: asset("projects/moonkeyeu/aws-frontend.gif"), caption: "Frontend infrastructure — S3, CloudFront, Route 53, ACM and Lambda@Edge" },
      { src: asset("projects/moonkeyeu/aws-backend.gif"), caption: "Backend infrastructure — Nginx, Spring Boot core & ETL APIs, MySQL and monitoring" },
      { src: asset("projects/moonkeyeu/github-actions.gif"), caption: "Automated deployment with GitHub Actions" },
      { src: asset("projects/moonkeyeu/security.gif"), caption: "Security implementation — authentication flow" },
    ],
    description:
      "A space launch tracker for past and upcoming launches, astronauts and programs — built for my Master's. Spring Boot core & ETL APIs, a React frontend, MySQL, and a full AWS deployment automated with Docker, Ansible and GitHub Actions.",
    tags: ["Spring Boot", "React", "MySQL", "Docker", "Ansible", "AWS"],
  },
  {
    id: "payment-service-provider",
    name: "Payment Service Provider",
    type: "Fullstack",
    status: "in-progress",
    href: "https://github.com/Nikos-Michelis/payment-service-provider",
    image: asset("projects/payment-service-provider/payment-process-high-level.gif"),
    imageCaption: "Payment process — Stripe checkout, webhooks via the outbox pattern, and async consumers over a message queue",
    gallery: [
      {
        src: asset("projects/payment-service-provider/handling-failed-payments.gif"),
        caption: "Handling failed payments — retry queue, dead-letter queue and a failed-payments consumer",
      },
    ],
    description:
      "A payment service provider powered by Stripe — one-time payments, subscriptions and refunds. Spring Boot backend with Kafka and MySQL, React + TypeScript frontend.",
    tags: ["Spring Boot", "Kafka", "React", "TypeScript", "Stripe"],
  },
  {
    id: "weather-widget",
    name: "Weather Widget",
    type: "Fullstack",
    status: "completed",
    href: "https://github.com/Nikos-Michelis/weather-widget",
    image: asset("projects/weather-widget/cover.gif"),
    imageCaption: "The widget in action — current conditions and the weekly forecast",
    gallery: [
      { src: asset("projects/weather-widget/redis-caching.webp"), caption: "Redis caching — check the cache first, fall back to the database" },
    ],
    description:
      "A reusable weather widget. Spring Boot with WebClient fetches data from the OpenWeather API, cached in Redis; the frontend is built with React.",
    tags: ["Spring Boot", "Redis", "React", "Docker"],
  },
  {
    id: "infrastructure-suite",
    name: "Infrastructure Suite",
    type: "DevOps",
    status: "completed",
    href: "https://github.com/Nikos-Michelis/infrastructure-suite",
    icon: "monitoring",
    description:
      "Reusable, ready-to-run monitoring setups with Grafana Alloy, Prometheus and Loki — covering Nginx logs, Linux hosts, Docker containers and MySQL.",
    tags: ["Docker", "Grafana", "Prometheus", "Loki", "Nginx"],
  },
  {
    id: "dish-discovery",
    name: "Dish Discovery",
    type: "Fullstack",
    status: "completed",
    href: "https://github.com/Nikos-Michelis/dish-discovery",
    image: asset("projects/dish-discovery/database.png"),
    imageCaption: "MySQL schema — users, OTP & token authentication, recipes and ingredients",
    gallery: [
      { src: asset("projects/dish-discovery/architecture.webp"), caption: "Application architecture" },
      { src: asset("projects/dish-discovery/ui.webp"), caption: "Application UI/UX" },
      { src: asset("projects/dish-discovery/login-register.webp"), caption: "Scenario 1 — Login / Register" },
      { src: asset("projects/dish-discovery/forgot-password.webp"), caption: "Scenario 2 — Forgot password" },
      { src: asset("projects/dish-discovery/bookmark.webp"), caption: "Scenario 3 — Bookmark a recipe" },
    ],
    description:
      "A recipes app: a Vanilla JavaScript single-page frontend on top of a Jakarta EE 10 REST API with JWT authentication, MySQL and Docker Compose.",
    tags: ["Jakarta EE", "JavaScript", "MySQL", "Docker"],
  },
  {
    id: "space-dwh",
    name: "Space Launches Data Warehouse",
    type: "Database",
    status: "completed",
    href: "https://github.com/Nikos-Michelis/space-launches-dw",
    image: asset("projects/space-dwh/star-schema.webp"),
    imageCaption: "Star schema of the space missions data warehouse",
    description:
      "A data warehouse spanning nearly a century of space missions (1957–2039): a MySQL star schema, analytical SQL queries and a Java ETL pipeline.",
    tags: ["MySQL", "Star Schema", "Java"],
  },
  {
    id: "cardshop",
    name: "CardShop",
    type: "Android",
    status: "completed",
    href: "https://github.com/Nikos-Michelis/CardShop",
    image: asset("projects/cardshop/cover.png"),
    imageCaption: "CardShop — e-commerce Android app",
    gallery: [
      { src: asset("projects/cardshop/ui.webp"), caption: "UI/UX — screen flow of every activity" },
      { src: asset("projects/cardshop/stripe-1.webp"), caption: "Stripe dashboard — test payments from the app" },
      { src: asset("projects/cardshop/stripe-2.webp"), caption: "Stripe dashboard — payment details" },
    ],
    description:
      "An e-commerce Android app in Java with Firebase authentication and storage, and Stripe payments backed by a Node.js/Express payment server.",
    tags: ["Android", "Java", "Firebase", "Stripe"],
  },
  {
    id: "rental-app",
    name: "Rental App",
    type: "Console",
    status: "completed",
    href: "https://github.com/Nikos-Michelis/Multi-Client-Rental-App",
    icon: "terminal",
    description: "A multi-client Java socket server and client that communicate using JSON requests.",
    tags: ["Java", "Sockets", "JSON"],
  },
  {
    id: "robotic-vehicle",
    name: "Autonomous Robotic Vehicle",
    type: "Arduino",
    status: "completed",
    href: "https://github.com/Nikos-Michelis/autonomous-robotic-vehicle",
    image: asset("projects/robotic-vehicle/front.webp"),
    imageCaption: "Wall-E — the finished autonomous vehicle",
    gallery: [
      { src: asset("projects/robotic-vehicle/circuit.webp"), caption: "Circuit" },
    ],
    description:
      "Wall-E: an Arduino-based vehicle that detects and avoids obstacles using an ultrasonic sensor and IR infrared sensors.",
    tags: ["Arduino", "C++", "Sensors"],
  },
]
