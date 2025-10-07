import express from 'express'
import 'dotenv/config'
import authRoutes from './routes/authRoutes.js'
import messageRoutes from './routes/messageRoutes.js'


const app = express();
app.use(express.json())

const PORT = process.env.PORT ?? 3000;

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(PORT , () => {
    console.log(`Server is running on port: ${PORT}`)
})