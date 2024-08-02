import React, { useState, useRef } from 'react';
import { Button, Container, Row, Col } from 'react-bootstrap';

function Streaming() {
    const [streaming, setStreaming] = useState(false);
    const videoRef = useRef(null);
    const mediaStreamRef = useRef(null);

    const startStreaming = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            mediaStreamRef.current = stream;
            videoRef.current.srcObject = stream;
            videoRef.current.play();
            setStreaming(true);
        } catch (err) {
            console.error('Error accessing media devices.', err);
        }
    };

    const stopStreaming = () => {
        if (mediaStreamRef.current) {
            mediaStreamRef.current.getTracks().forEach(track => track.stop());
            videoRef.current.srcObject = null;
            setStreaming(false);
        }
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col>
                    <video ref={videoRef} width="90%" height="auto" controls />
                </Col>
            </Row>
            <Row className="mt-3">
                <Col>
                    {!streaming ? (
                        <Button onClick={startStreaming} variant="primary">Start Streaming</Button>
                    ) : (
                        <Button onClick={stopStreaming} variant="danger">Stop Streaming</Button>
                    )}
                </Col>
            </Row>
        </Container>
    );
}

export default Streaming;
