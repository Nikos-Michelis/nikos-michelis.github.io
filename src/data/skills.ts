import { asset } from "@/lib/asset"
import type { Skill } from "@/types/cv"

/**
 * `description` and `proof` are optional and shown in the skill modal.
 * `proof.ref` is the id of a project (data/projects.ts), job (data/experience.ts)
 * or degree (data/education.ts) — `detail` says what you did with the skill there.
 * Order proof from strongest to weakest.
 */
export const SKILLS: Skill[] = [
  {
    name: "Java",
    level: 75,
    category: "Backend",
    icon: "java",
    description: "My main language — professionally, in Spring Boot and Jakarta EE backends, Android and plain socket servers.",
    proof: [
      { ref: "ed-fullstack", detail: "Developing and maintaining Java applications for a European Union agency in the financial sector." },
      { ref: "moonkeyeu", detail: "Java 17 core API and ETL API, with unit and integration tests (JUnit, Testcontainers)." },
      { ref: "dish-discovery", detail: "REST API in Jakarta EE 10 with JWT authentication and CRUD operations." },
      { ref: "cardshop", detail: "Native Android e-commerce app written in Java." },
      { ref: "rental-app", detail: "Multi-client socket server and client exchanging JSON requests." },
      { ref: "space-dwh", detail: "ETL programs that fetch, clean and load space-mission data." },
    ],
  },
  {
    name: "Spring Boot",
    level: 70,
    category: "Backend",
    icon: "spring",
    description: "My go-to framework for backend services and REST APIs.",
    proof: [
      { ref: "ed-fullstack", detail: "Developing and maintaining Java applications for a European Union agency in the financial sector." },
      { ref: "kepyes-fullstack", detail: "Developing and maintaining web applications with Spring Boot, in an Agile team with code reviews." },
      { ref: "moonkeyeu", detail: "Core API with Spring Security (JWT), Data JPA and Caffeine caching, plus an ETL API built on Spring Batch." },
      { ref: "payment-service-provider", detail: "Stripe payments, subscriptions and refunds, with Kafka messaging and Spring Security." },
      { ref: "weather-widget", detail: "WebClient integration with the OpenWeather API and Redis caching." },
    ],
  },
  {
    name: "Jakarta EE",
    level: 70,
    category: "Backend",
    image: asset("skills/jakarta-ee.svg"),
    description: "Enterprise Java standards — JAX-RS REST APIs, CDI and Bean Validation.",
    proof: [
      {
        ref: "dish-discovery",
        detail: "Jakarta EE 10 REST API with JAX-RS (Jersey), CDI (Weld), Bean Validation and JWT authentication.",
      }
    ],
  },
  {
    name: "MySQL - PostgreSQL",
    level: 80,
    category: "Backend",
    icon: "database",
    description: "Relational databases: schema design, SQL queries, migrations and data modelling.",
    proof: [
      { ref: "space-dwh", detail: "Designed a MySQL star schema and wrote analytical queries over ~80 years of space missions." },
      { ref: "moonkeyeu", detail: "MySQL database with Flyway migrations, running in production." },
      { ref: "dish-discovery", detail: "Designed the MySQL schema for recipes, users and authentication." },
      { ref: "payment-service-provider", detail: "MySQL with Flyway migrations for payments and subscriptions." },
    ],
  },
  {
    name: "React",
    level: 70,
    category: "Frontend",
    icon: "react",
    description: "My frontend library of choice for modern, responsive interfaces.",
    proof: [
      { ref: "ed-fullstack", detail: "Developing and maintaining Java applications for a European Union agency in the financial sector." },
      { ref: "kepyes-fullstack", detail: "Developing and maintaining web applications with React." },
      { ref: "moonkeyeu", detail: "Full React frontend: TanStack Query, React Router, React Hook Form and Leaflet maps." },
      { ref: "payment-service-provider", detail: "React + TypeScript frontend with shadcn/ui and Stripe Elements." },
      { ref: "weather-widget", detail: "Reusable React widget fetching data with TanStack Query." },
    ],
  },
  {
    name: "JavaScript",
    level: 70,
    category: "Frontend",
    icon: "javascript",
    description: "The language of the web — from Vanilla JS to React and Node.js.",
    proof: [
      { ref: "kepyes-fullstack", detail: "Developing and maintaining web applications with Spring Boot, in an Agile team with code reviews." },
      { ref: "cchbc-intern", detail: "Built a digital signage broadcasting platform with HTML5, CSS and JavaScript." },
      { ref: "dish-discovery", detail: "Single-page application in Vanilla JavaScript — dynamic rendering without page reloads." },
      { ref: "moonkeyeu", detail: "The React frontend is written in JavaScript." },
      { ref: "cardshop", detail: "Node.js / Express backend handling Stripe payments for the Android app." }
    ],
  },
  {
    name: "TypeScript",
    level: 70,
    category: "Frontend",
    icon: "typescript",
    description: "Typed JavaScript for safer, more maintainable frontend code.",
    proof: [
      { ref: "ed-fullstack", detail: "Developing and maintaining Java applications for a European Union agency in the financial sector." },
      { ref: "payment-service-provider", detail: "The frontend is written in TypeScript with React, TanStack Query/Form and Zod validation." }
    ],
  },
  {
    name: "HTML",
    level: 90,
    category: "Frontend",
    icon: "html",
    description: "Semantic, accessible markup — the base of every page I build.",
    proof: [
      { ref: "cchbc-intern", detail: "Built a digital signage broadcasting platform with HTML5, CSS and JavaScript." },
      { ref: "dish-discovery", detail: "Markup for the Vanilla JS single-page application." },
    ],
  },
  {
    name: "CSS",
    level: 75,
    category: "Frontend",
    icon: "css",
    description: "Layouts, responsive design and animation — with SASS and Tailwind CSS.",
    proof: [
      { ref: "moonkeyeu", detail: "Responsive styling of the whole frontend in SCSS." },
      { ref: "weather-widget", detail: "Widget styling in SCSS." },
      { ref: "payment-service-provider", detail: "Styled with Tailwind CSS." },
    ],
  },
  {
    name: "Tailwind CSS",
    level: 70,
    category: "Frontend",
    icon: "tailwind",
    description: "Utility-first styling for fast, consistent and responsive UIs.",
    proof: [
      { ref: "kepyes-fullstack", detail: "Developing and maintaining web applications with Spring Boot, in an Agile team with code reviews." },
      { ref: "payment-service-provider", detail: "Styled the whole React + TypeScript frontend with Tailwind CSS, shadcn/ui components and tw-animate-css animations.", },
    ],
  },
  {
    name: "Linux",
    level: 70,
    category: "DevOps",
    icon: "linux",
    description: "Working on the command line, managing servers and deploying applications.",
    proof: [
      { ref: "kepyes-fullstack", detail: "Developing and maintaining web applications with Spring Boot, in an Agile team with code reviews." },
      { ref: "moonkeyeu", detail: "Provisioning and running the production VPS: packages, sudo users and cron jobs (via Ansible)." },
      { ref: "infrastructure-suite", detail: "Linux host monitoring of resource consumption with Grafana Alloy." },
    ],
  },
  {
    name: "Docker",
    level: 70,
    category: "DevOps",
    icon: "docker",
    description: "Containerising applications for consistent development and deployment.",
    proof: [
      { ref: "kepyes-fullstack", detail: "Developing and maintaining web applications with Spring Boot, in an Agile team with code reviews." },
      { ref: "moonkeyeu", detail: "Production stack in Docker Compose — APIs, MySQL, Nginx, Certbot and monitoring — with images in AWS ECR." },
      { ref: "infrastructure-suite", detail: "Docker container metrics and log monitoring." },
      { ref: "dish-discovery", detail: "First containerised app — images, containers and Docker Compose." },
      { ref: "weather-widget", detail: "Backend and Redis orchestrated with Docker Compose." },
    ],
  },
  {
    name: "Ansible",
    level: 70,
    category: "DevOps",
    icon: "ansible",
    description: "Automating server configuration and deployments with playbooks.",
    proof: [
      { ref: "kepyes-fullstack", detail: "Developing and maintaining web applications with Spring Boot, in an Agile team with code reviews." },
      { ref: "moonkeyeu", detail: "Provision and deploy playbooks with roles (common, docker, aws), Ansible Vault secrets and staging/production inventories — run from GitHub Actions.",},
    ],
  },
  {
    name: "AWS",
    level: 60,
    category: "DevOps",
    icon: "aws",
    description: "Cloud services for hosting and running applications.",
    proof: [
      { ref: "moonkeyeu", detail: "Frontend on S3 + CloudFront with Route 53, ACM and Lambda@Edge; backend images in ECR, running on a Lightsail VPS.", },
    ],
  },
  {
    name: "Networking",
    level: 60,
    category: "DevOps",
    icon: "satellite",
    description: "Network infrastructure, servers and client/server communication.",
    proof: [
      {
        ref: "cchbc-intern",
        detail: "Configured and programmed network switches, worked with server racks, and streamed advertising content across the facility over NGINX RTMP.",
      },
      { ref: "rental-app", detail: "TCP socket server handling multiple concurrent clients." },
      { ref: "moonkeyeu", detail: "Nginx reverse proxy with Certbot TLS certificates." },
    ],
  },
  {
    name: "System Design",
    level: 65,
    category: "Other",
    icon: "system_design",
    description: "Designing how the pieces of an application fit together — services, data and scalability.",
    proof: [
      { ref: "moonkeyeu", detail: "Split into core and ETL services behind an Nginx proxy, with caching, monitoring and a documented AWS architecture." },
      { ref: "payment-service-provider", detail: "Event-driven payment flows with Kafka." },
      { ref: "weather-widget", detail: "Cache-aside pattern with Redis to cut external API calls." },
      { ref: "space-dwh", detail: "Star-schema data warehouse design for analytics." },
    ],
  },
  {
    name: "UI/UX Design",
    level: 65,
    category: "Other",
    icon: "ui_ux",
    description: "Designing clear, user-friendly interfaces.",
    proof: [
      { ref: "kepyes-fullstack", detail: "Developing and maintaining web applications with Spring Boot, in an Agile team with code reviews." },
      { ref: "cardshop", detail: "Designed the UI/UX of the e-commerce Android app." },
      { ref: "dish-discovery", detail: "Designed the application's UI/UX and user flows." },
    ],
  },
]
