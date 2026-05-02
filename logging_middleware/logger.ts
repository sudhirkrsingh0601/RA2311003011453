// logging_middleware/logger.ts

const LOG_API = "http://20.207.122.201/evaluation-service/logs";

export async function Log(
  stack: "frontend" | "backend",
  level: "debug" | "info" | "warn" | "error" | "fatal",
  pkg:
    | "api"
    | "component"
    | "hook"
    | "page"
    | "state"
    | "style"
    | "auth"
    | "config"
    | "middleware"
    | "utils",
  message: string
) {
  try {
    const token = localStorage.getItem("access_token");

    await fetch(LOG_API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg,
        message,
      }),
    });
  } catch (error) {
    console.error("Logging failed:", error);
  }
}