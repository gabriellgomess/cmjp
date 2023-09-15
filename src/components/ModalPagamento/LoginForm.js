import { TextField, Button, Box } from "@mui/material";

const LoginForm = ({ handleLogin, handleChangeLogin, handleShowRegister }) => {
  return (
    <form onSubmit={handleLogin}>
      <Box sx={{display: 'flex', flexDirection: 'column', width: {xs: '100%', sm: '100%', md: '50%'}, margin: '0 auto', gap: '20px'}}>
        <TextField
          name="email"
          label="Username"
          onChange={(e) => handleChangeLogin(e)}
        />
        <TextField
          type="password"
          name="password"
          label="Password"
          onChange={(e) => handleChangeLogin(e)}
        />
        <Button variant='contained' type="submit">Entrar</Button>
        <Button variant='outlined' onClick={handleShowRegister}>Cadastrar</Button>

      </Box>
    </form>
  );
};

export default LoginForm;
