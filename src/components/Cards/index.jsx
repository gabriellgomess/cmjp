import { useEffect, useState } from 'react';
import { Button, CardActions, Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import axios from 'axios';


import PaginaCampanha from '../PaginaCampanha/PaginaCampanha'

function Cards() {
    const [campanhas, setCampanhas] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [currentData, setCurrentData] = useState(null);

    useEffect(() => {
        try {
            axios.get('https://strapi-production-c201.up.railway.app/api/campanhas?populate=*').then((response) => {
                setCampanhas(response.data.data)
                console.log(response.data.data)
            })
        } catch (error) {
            console.log(error);
        }

    }, []);

    const handleOpenModal = (data) => {
        setCurrentData(data);
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setCurrentData(null);
        setOpenModal(false);
    };




    return (
        <Box sx={{ width: "100%", display: "flex", gap: "15px", flexWrap: "wrap", justifyContent: 'center', marginBottom: '50px' }}>
            {campanhas.map((data) => (
                <Card sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }} elevation={0} key={data.attributes.id}>
                    <CardContent sx={{ maxWidth: "350px", display: "flex", flexDirection: "column" }}>
                        <CardMedia
                            component="img"
                            width="100%"
                            height="auto"
                            image={`https://strapi-production-c201.up.railway.app${data.attributes.imagem.data.attributes.formats.thumbnail.url}`}
                            alt="Imagem da campanha"
                            onClick={() => handleOpenModal(data)}
                            sx={{cursor: 'pointer'}}
                        />
                        <Typography variant="h5" >{data.attributes.titulo}</Typography>
                        <Typography variant="body1" >{data.attributes.descricao}</Typography>
                    </CardContent>
                    <CardActions sx={{ display: "flex" }}>
                        <Button sx={{ padding: "10px" }} variant="contained" size="small" color="primary">
                            Doar
                        </Button>
                        <Button sx={{ padding: "10px" }} variant="contained" size="small" color="primary">
                            Doar por boleto
                        </Button>
                    </CardActions>
                </Card>
            ))}
            <PaginaCampanha open={openModal} onClose={handleCloseModal} data={currentData} />

        </Box>
    )
}

export default Cards;