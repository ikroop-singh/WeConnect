import React from 'react';
import { Avatar, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const UsersList = ({ user, setDrawerOpen }) => {
  const dispatch =useDispatch();
  const navigate = useNavigate();
  const handleFunction = () => {
    navigate(`/profile/${user._id}`);
    setDrawerOpen(false);
    dispatch({ type: 'CLEAR_SEARCH' })
  }
  return (
    <div style={{ marginTop: '10px' }}>
      <Box
        onClick={handleFunction}

        sx={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          color: "black",
          paddingX: '3px',
          paddingY: '2px',
          marginBottom: '2px',
          borderRadius: "6px",
          cursor: "pointer",
          background: "#E8E8E8",
          '&:hover': {

            background: "#38B2AC",
            color: "white",
          }
        }}

      >
        <Avatar
          sx={{
            margin: '2px',
            height: '40px',
            width: '40px',
            cursor: "pointer"
          }}
          name={user.name}
          src={user.profilePic.url}
        />
        <Box>
          <Typography>{user.name}</Typography>
          <Typography fontSize="xs">
            <b>Email : </b>
            {user.email}
          </Typography>
        </Box>
      </Box>
    </div>
  )
}

export default UsersList
