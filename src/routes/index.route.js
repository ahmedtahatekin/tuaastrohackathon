import express from "express";
const app = express();

const router = express.Router();

router.get("/", (req, res) => {
    res.json({status: 200, message: "yönlendirme başarılı"});
})

export default router;