import { Router } from "express";
import { libro } from "./controller.js";

export const router = Router();

router.get('/libros', libro.getAll);
router.post('/libro', libro.add);
router.delete('/libros', libro.delete);
router.put('/libros', libro.update);
router.get('/libro/:id', libro.getOne);
//router.get('/libro', libro.getOne);

