const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const cors = require('cors');
const morgan = require('morgan');
const jwt = require('jsonwebtoken');
const ffmpeg = require('fluent-ffmpeg');
const authRoutes = require('./routes/authRoutes');
const db = require('./utils/db');

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/auth', authRoutes);


app.get('/stream', (req, res) => {
    const { streamId } = req.query;
    res.setHeader('Content-Type', 'video/mp4');
    ffmpeg(`path/to/your/video/stream/${streamId}`)
        .format('mp4')
        .pipe(res, { end: true });
});

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });



const streams = new Map();
const secret = process.env.JWT_SECRET;
const port = process.env.PORT || 8000;


wss.on('connection', (ws, req) => {
    const token = req.url.split('token=')[1];
    if (!token) {
        ws.close();
        return;
    }

    try {
        const { username } = jwt.verify(token, secret);
        console.log('New client connected:', username);

        ws.on('message', (message) => {
            const { type, id, data } = JSON.parse(message);
            if (type === 'start') {
                streams.set(id, ws);
                ws.send(JSON.stringify({ type: 'status', message: 'Streaming started' }));
            } else if (type === 'stream' && streams.has(id)) {
                const stream = streams.get(id);
                ffmpeg(data)
                    .inputFormat('mpegts')
                    .videoCodec('libx264')
                    .format('flv')
                    .on('error', (err) => console.error('FFmpeg error:', err))
                    .pipe(stream, { end: false });
            } else if (type === 'stop' && streams.has(id)) {
                const stream = streams.get(id);
                stream.end();
                streams.delete(id);
                ws.send(JSON.stringify({ type: 'status', message: 'Streaming stopped' }));
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected');
            streams.forEach((stream, id) => {
                if (stream === ws) {
                    streams.delete(id);
                }
            });
        });
    } catch (err) {
        ws.close();
    }
});

server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
