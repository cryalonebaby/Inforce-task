import { deleteHero, fetchHeroes } from '../redux/slices/heroes.js'
import React from 'react'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

const CardHero = ({hero, isLoading}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleDelete = () => {
    dispatch(deleteHero(hero._id))
    dispatch(fetchHeroes(1))
  }

  return (
    <Box>
      {isLoading ? (
          <Card sx={{ width: 345 }}>
          <CardMedia
            component="img"
            height="140"
            image=""
            alt="Loading"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Loading...
            </Typography>
            <Typography variant="body2" color="text.secondary">
              ...
            </Typography>
          </CardContent>
          <CardActions></CardActions>
        </Card>
      ) : (
        <Card sx={{ width: 345}}>
          <CardMedia
            component="img"
            height="240"
            image={hero.images[0]}
            alt="hero"
          />
          <CardContent>
            <Typography 
              gutterBottom 
              variant="h5" 
              component="div" 
              textAlign={'center'}
              data-testid="nickname"
            >
              {hero.nickname}
            </Typography>
          </CardContent>
          <CardActions sx={{
              display: 'flex', 
              justifyContent: 'space-between'
            }}>
            <Button 
              size="small" 
              onClick={() => navigate(`/hero:${hero._id}`)}
            >
              Learn More
            </Button>
            <Box display={'flex'}>
              <IconButton 
                onClick={() => navigate(`/edit:${hero._id}`)} 
                size="small" 
                sx={{display: 'flex'}}
              >
                <EditIcon/>
              </IconButton >
              <IconButton 
                onClick={handleDelete} 
                size="small" 
                sx={{display: 'flex'}}
              >
                <DeleteIcon sx={{color: 'darkred'}}/>
              </IconButton >
            </Box>
          </CardActions>
        </Card>
      )}
    </Box>
  )
}

export default CardHero