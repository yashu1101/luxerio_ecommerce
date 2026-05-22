import { Chat } from "../controllers/chat.controller.js";

import { Router } from "express";
import { Protect } from "../middleware/protect.middleware.js";

const route = Router()
route.post('/api/chat', Chat)

export { route as chatRoute }