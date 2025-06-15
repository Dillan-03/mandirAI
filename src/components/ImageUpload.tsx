import { useState, useRef } from 'react';
import { Box, Button, Card, CardMedia, Typography, Paper } from '@mui/material';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const ImageUpload = () => {
    const [image, setImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleCapture = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleCameraClick = () => {
        fileInputRef.current?.click();
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
                    capture="environment"
                    onChange={handleCapture}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                />

                <Button
                    variant="contained"
                    startIcon={<CameraAltIcon />}
                    onClick={handleCameraClick}
                    sx={{
                        mb: 4,
                        px: 4,
                        py: 1.5,
                        fontSize: '1.1rem',
                        backgroundColor: 'primary.main',
                        '&:hover': {
                            backgroundColor: 'primary.dark',
                        }
                    }}
                >
                    Take Picture
                </Button>

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