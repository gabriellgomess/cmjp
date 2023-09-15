import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography } from "@mui/material";

const RecurrentForm = ({ theme }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [theUser, setTheUser] = useState(null);

  useEffect(() => {
    isLoggedIn();
  }, []);

  const isLoggedIn = async () => {
    const loginToken = localStorage.getItem("loginToken");
    if (loginToken) {
      axios.defaults.headers.common["Authorization"] = "bearer " + loginToken;
      try {
        const { data } = await axios.get(
          "https://amigosdacasa.org.br/gerenciador-doacoes-amigosdacasa/login_site/user-info.php"
        );
        if (data.success && data.user) {
          setIsAuth(true);
          setTheUser(data.user);
        } else {
          setIsAuth(false);
        }
      } catch (error) {
        console.error("Erro ao buscar informações do usuário:", error);
        setIsAuth(false);
      }
    }
  };

  return (
    <Box>
      <Typography sx={{ color: "black" }} variant="h6" gutterBottom>
        Doação Recorrente
      </Typography>
      {isAuth && (
        <>
          <Typography sx={{ color: "black" }} variant="body1">
            Bem-vindo, {theUser.name}!
          </Typography>
          <Typography sx={{ color: "black" }} variant="caption">
            {theUser.customer_id}
          </Typography>
        </>
      )}
    </Box>
  );
};

export default RecurrentForm;
