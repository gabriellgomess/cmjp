import React, { useContext } from "react";
import UserContext from "../../components/Context";

import { Typography } from "@mui/material";

export function GerenciarCobranca() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Typography color="primary">Olá {user}</Typography>

      <Typography color="primary">Gerenciar Cobrança</Typography>
    </div>
  );
}
