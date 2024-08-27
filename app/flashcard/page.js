'use client';

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { Container, Box, Typography, Card, CardActionArea, CardContent, Grid } from '@mui/material';
import { collection, doc, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';
import { useSearchParams } from 'next/navigation';

export default function Flashcard() {
    const { isLoaded, isSignedIn, user } = useUser();
    const [flashcards, setFlashcards] = useState([]);
    const [flipped, setFlipped] = useState([]);

    const searchParams = useSearchParams();
    const search = searchParams.get('id');

    useEffect(() => {
        async function getFlashcard() {
            if (!search || !user) return;

            const colRef = collection(doc(collection(db, 'users'), user.id), search);
            const docSnap = await getDocs(colRef);
            const flashcards = [];

            docSnap.forEach((doc) => {
                flashcards.push({ id: doc.id, ...doc.data() });
            });
            setFlashcards(flashcards);
        }
        getFlashcard();
    }, [user, search]);

    const handleCardClick = (id) => {
        setFlipped((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    if (!isLoaded || !isSignedIn) {
        return <></>;
    }

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Grid container spacing={4}>
                {flashcards.map((flashcard, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <Card
                            sx={{
                                boxShadow: '0 6px 10px rgba(0, 0, 0, 0.1)',
                                transition: 'transform 0.3s ease',
                                borderRadius: 2,
                                '&:hover': {
                                    transform: 'scale(1.03)',
                                },
                            }}
                        >
                            <CardActionArea onClick={() => handleCardClick(index)}>
                                <CardContent>
                                    <Box
                                        sx={{
                                            perspective: '1000px',
                                            '& > div': {
                                                transition: 'transform 0.6s ease',
                                                transformStyle: 'preserve-3d',
                                                position: 'relative',
                                                width: '100%',
                                                height: '250px',
                                                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                                                transform: flipped[index] ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                                borderRadius: 1,
                                                backgroundColor: '#fff',
                                            },
                                            '& > div > div': {
                                                position: 'absolute',
                                                width: '100%',
                                                height: '100%',
                                                backfaceVisibility: 'hidden',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                padding: 2,
                                                boxSizing: 'border-box',
                                            },
                                            '& > div > div:nth-of-type(2)': {
                                                transform: 'rotateY(180deg)',
                                            },
                                        }}
                                    >
                                        <div>
                                            <Typography variant='h6' component='div' sx={{ color: '#333' }}>
                                                {flashcard.front}
                                            </Typography>
                                        </div>
                                        <div>
                                            <Typography variant='h6' component='div' sx={{ color: '#333' }}>
                                                {flashcard.back}
                                            </Typography>
                                        </div>
                                    </Box>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
}
