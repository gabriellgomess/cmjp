import React, { useContext } from "react";
import UserContext from "../../components/Context";

import { Typography } from "@mui/material";

export function GerarCobrancaEmLote() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Typography color="primary">Olá {user}</Typography>

      <Typography color="primary">Gerar Cobrança em lote</Typography>
    </div>
  );
}
