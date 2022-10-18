import UndoIcon from "@mui/icons-material/Undo";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Container, Typography } from "@mui/material";

const NotFound404 = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <Container maxWidth="md">
          <img
            src="/image/404Page.png"
            alt="404Image"
            style={{ maxWidth: "100%", height: "auto" }}
          />
          <Typography variant="h4" sx={{ mt: 4 }}>
            {location.pathname}
          </Typography>
          <Typography variant="h5">
            The page you're looking for doesn't exist.
          </Typography>
          <Button
            sx={{ mt: 2 }}
            variant="contained"
            onClick={() => navigate(-1)}
            startIcon={<UndoIcon />}
          >
            Back
          </Button>
        </Container>
      </Box>
    </>
  );
};

export default NotFound404;
