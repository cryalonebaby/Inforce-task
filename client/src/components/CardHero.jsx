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

const CardHero = ({hero, isLoading}) => {
  return (
    // <Box>
    //   {isLoading ? (
    //     <Typography variant='h5'>Loading...</Typography>
    //   ) : (
    //     <Typography variant='h5'>{nickname}</Typography>
    //   )}
    // </Box>
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
        <Card sx={{ maxWidth: 345}}>
          <CardMedia
            component="img"
            height="240"
            image={hero.images[0]}
            alt="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div" textAlign={'center'}>
              {hero.nickname}
            </Typography>
          </CardContent>
          <CardActions sx={{display: 'flex', justifyContent: 'space-between'}}>
            <Button size="small">Learn More</Button>
            <Box display={'flex'}>
              <IconButton size="small" sx={{display: 'flex'}}>
                <EditIcon/>
              </IconButton >
              <IconButton size="small" sx={{display: 'flex'}}>
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