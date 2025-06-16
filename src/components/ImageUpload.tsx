import { useState, useRef } from 'react';
import { Box, Button, Card, CardMedia, Typography, Paper, IconButton } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import UploadFileIcon from '@mui/icons-material/UploadFile';

const ImageUpload = () => {
    const [image, setImage] = useState<string | null>(null);
    const [showCamera, setShowCamera] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const streamRef = useRef<MediaStream | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
        // Reset the file input so the same file can be selected again
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const startCamera = async () => {
        try {
            // Stop any existing camera stream
            if (streamRef.current) {
                stopCamera();
            }
            const stream = await navigator.mediaDevices.getUserMedia({
                video: {
                    facingMode: 'user',
                    width: { ideal: 1280 },
                    height: { ideal: 720 }
                }
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;
            }
            setShowCamera(true);
        } catch (err) {
            console.error('Error accessing camera:', err);
            alert('Unable to access camera. Please make sure you have granted camera permissions.');
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
        }
        setShowCamera(false);
    };

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            if (ctx) {
                ctx.drawImage(videoRef.current, 0, 0);
                const imageUrl = canvas.toDataURL('image/jpeg');
                setImage(imageUrl); // This will replace any existing image
                stopCamera();
            }
        }
    };

    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    mb: 3,
                    background: 'linear-gradient(to bottom, #FFF8E7, #FFFFFF)',
                    border: '1px solid #DAA520'
                }}
            >
                <Typography
                    variant="h5"
                    gutterBottom
                    sx={{
                        color: 'primary.main',
                        fontFamily: 'Times New Roman',
                        fontWeight: 'bold',
                        mb: 2
                    }}
                >
                    Upload Your Image
                </Typography>
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{
                        mb: 4,
                        fontFamily: 'Times New Roman',
                        fontSize: '1.1rem'
                    }}
                >
                    Take a picture or upload an image to find matches
                </Typography>

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mb: 4 }}>
                    <Button
                        variant="contained"
                        startIcon={<PhotoCameraIcon />}
                        onClick={startCamera}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            }
                        }}
                    >
                        {showCamera ? 'Close Camera' : 'Open Camera'}
                    </Button>

                    <Button
                        variant="contained"
                        startIcon={<UploadFileIcon />}
                        onClick={() => fileInputRef.current?.click()}
                        sx={{
                            px: 4,
                            py: 1.5,
                            fontSize: '1.1rem',
                            backgroundColor: 'primary.main',
                            '&:hover': {
                                backgroundColor: 'primary.dark',
                            }
                        }}
                    >
                        Upload File
                    </Button>
                </Box>

                {showCamera && (
                    <Box sx={{ mb: 3 }}>
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            style={{
                                width: '100%',
                                maxWidth: '400px',
                                borderRadius: '8px',
                                border: '2px solid #DAA520'
                            }}
                        />
                        <Box sx={{ mt: 2 }}>
                            <IconButton
                                onClick={captureImage}
                                sx={{
                                    backgroundColor: 'primary.main',
                                    color: 'white',
                                    '&:hover': {
                                        backgroundColor: 'primary.dark',
                                    },
                                    width: 56,
                                    height: 56
                                }}
                            >
                                <CameraAltIcon />
                            </IconButton>
                        </Box>
                    </Box>
                )}

                {image && (
                    <Card
                        sx={{
                            maxWidth: 400,
                            mx: 'auto',
                            border: '2px solid #DAA520',
                            borderRadius: 2,
                            overflow: 'hidden'
                        }}
                    >
                        <CardMedia
                            component="img"
                            image={image}
                            alt="Captured"
                            sx={{
                                height: 300,
                                objectFit: 'cover',
                                border: '1px solid #DAA520'
                            }}
                        />
                    </Card>
                )}
            </Paper>
        </Box>
    );
};

export default ImageUpload; 