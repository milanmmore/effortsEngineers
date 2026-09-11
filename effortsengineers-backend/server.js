import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import authRoutes from "./routes/auth.routes.js";
import catalogRoutes from "./routes/catalog.routes.js";
import quotationRoutes from "./routes/quotation.routes.js";
import ordersRoutes from "./routes/orders.routes.js";
import adminRoutes from "./routes/admin.routes.js";
import clientRoutes from "./routes/clients.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import inventoryRoutes from "./routes/inventory.routes.js";

import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);
app.use("/api/catalog", catalogRoutes);
app.use("/api/quotation", quotationRoutes);
app.use("/api/orders", ordersRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/inventory", inventoryRoutes);

app.use(notFound);
app.use(errorHandler);

// Only start the server if run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`API listening on port ${PORT}`));
}

export default app; // <-- ESM default export
