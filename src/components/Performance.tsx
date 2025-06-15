import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Grid, CircularProgress } from '@mui/material';

const Performance = () => {
    const [metrics, setMetrics] = useState({
        bandwidth: 0,
        latency: 0,
        memory: 0,
    });

    useEffect(() => {
        const updateMetrics = () => {
            // Simulate metrics for now
            setMetrics({
                bandwidth: Math.random() * 100,
                latency: Math.random() * 1000,
                memory: Math.random() * 1000,
            });
        };

        const interval = setInterval(updateMetrics, 2000);
        return () => clearInterval(interval);
    }, []);

    const MetricCard = ({ title, value, unit }: { title: string; value: number; unit: string }) => (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                textAlign: 'center',
                background: 'linear-gradient(to bottom, #FFF8E7, #FFFFFF)',
                border: '1px solid #DAA520',
                height: '100%'
            }}
        >
            <Typography
                variant="h6"
                gutterBottom
                sx={{
                    color: 'primary.main',
                    fontFamily: 'Times New Roman',
                    fontWeight: 'bold'
                }}
            >
                {title}
            </Typography>
            <Box sx={{ position: 'relative', display: 'inline-flex' }}>
                <CircularProgress
                    variant="determinate"
                    value={value}
                    size={80}
                    thickness={4}
                    sx={{
                        color: 'primary.main',
                        '& .MuiCircularProgress-circle': {
                            strokeLinecap: 'round',
                        },
                    }}
                />
                <Box
                    sx={{
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        position: 'absolute',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}
                >
                    <Typography
                        variant="caption"
                        component="div"
                        sx={{
                            color: 'primary.main',
                            fontFamily: 'Times New Roman',
                            fontSize: '1rem',
                            fontWeight: 'bold'
                        }}
                    >
                        {`${Math.round(value)}${unit}`}
                    </Typography>
                </Box>
            </Box>
        </Paper>
    );

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            <Typography
                variant="h5"
                gutterBottom
                sx={{
                    mb: 4,
                    color: 'primary.main',
                    fontFamily: 'Times New Roman',
                    fontWeight: 'bold',
                    textAlign: 'center'
                }}
            >
                Performance Metrics
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                    <MetricCard
                        title="Bandwidth"
                        value={metrics.bandwidth}
                        unit=" Mbps"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MetricCard
                        title="Latency"
                        value={metrics.latency}
                        unit=" ms"
                    />
                </Grid>
                <Grid item xs={12} md={4}>
                    <MetricCard
                        title="Memory Usage"
                        value={metrics.memory}
                        unit=" MB"
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default Performance; 