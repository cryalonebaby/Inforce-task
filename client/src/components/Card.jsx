import {Box, Typography} from '@mui/material'

const Card = ({nickname, isLoading}) => {
  return (
    <Box>
      {isLoading ? (
        <Typography variant='h5'>Loading...</Typography>
      ) : (
        <Typography variant='h5'>{nickname}</Typography>
      )}
    </Box>
  )
}

export default Card