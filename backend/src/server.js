import express from 'express'
import 'dotenv/config'
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import path from 'path'

const app = express();
const __dirname = path.resolve();

app.use(express.json())

const PORT = process.env.PORT ?? 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (req,res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}

app.listen(PORT , () => {
    console.log(`Server is running on port: ${PORT}`)
})