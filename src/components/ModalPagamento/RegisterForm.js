import React, { useState } from "react";
import { TextField, Button, Typography, Card, Box, Container, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";

function RegisterForm({ handleShowLogin }) {
  const initialState = {
    userInfo: {
      name: "",
      email: "",
      password: "",
      cpfCnpj: "",
      address: "",
      addressNumber: "",
      complement: "",
      province: "",
      city: "",
      state: "",
      postalCode: "",
      phone: "",
      mobilePhone: "",
    },
    errorMsg: "",
    successMsg: "",
  };
  const [state, setState] = useState(initialState);

  const submitForm = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "https://amigosdacasa.org.br/gerenciador-doacoes-amigosdacasa/login_site/register.php",
        state.userInfo
      );
      if (response.data.success) {
        setState({
          ...initialState,
          successMsg: response.data.message,
        });
        swal({
          title: "Cadastro realizado com sucesso!",
          text: "Você será redirecionado para a página de login",
          icon: "success",
          button: "Ok",
        }).then(() => {
          handleShowLogin();
        });
      } else {
        setState({
          ...state,
          successMsg: "",
          errorMsg: response.data.message,
        });
        swal({
          title: "Erro ao cadastrar!",
          text: response.data.message,
          icon: "error",
          button: "Ok",
        });
      }
    } catch (error) {
      console.error("Error during registration:", error);
    }
  };

  const fetchAddressByCEP = async (cep) => {
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const {logradouro, bairro, localidade, uf} = response.data;
  
      setState((prevState) => ({
        ...prevState,
        userInfo: {
          ...prevState.userInfo,
          address: logradouro,
          province: bairro,
          city: localidade,
          state: uf,
        },
      }));
    } catch (error) {
      console.error("Could not fetch CEP:", error);
    }
  };
  

  return (
    <Container>
    <Card
      variant="outlined"
      sx={{
        width: { xs: "100%", sm: "100%", md: "100%" },
        padding: 3,
      }}
    >
      <Typography variant="h6" gutterBottom>
        Cadastro de Doador
      </Typography>
      <form
        style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}
        onSubmit={submitForm}
      >
        <TextField
        sx={{ width: {xs: "100%", sm: "100%", md: "100%"} }}
          label="Nome"
          name="name"
          required
          value={state.userInfo.name}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, name: e.target.value },
            })
          }
          placeholder="Digite seu nome completo"
        />
        <TextField
        sx={{ width: {xs: "100%", sm: "100%", md: "30%"} }}
          label="CPF"
          name="cpfCnpj"
          required
          value={state.userInfo.cpfCnpj}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, cpfCnpj: e.target.value },
            })
          }
          placeholder="Digite seu CPF"
        />

        <TextField
        sx={{ width: {xs: "100%", sm: "100%", md: "38%"} }}
          label="Usuário"
          name="email"
          required
          value={state.userInfo.email}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, email: e.target.value },
            })
          }
          placeholder="Digite seu usuário"
        />

        <TextField
        sx={{ width: {xs: "100%", sm: "100%", md: "30%"} }}
          type="password"
          label="Senha (8 dígitos)"
          name="password"
          required
          value={state.userInfo.password}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, password: e.target.value },
            })
          }
          placeholder="Digite sua senha"
        />
                <TextField
        sx={{ width: {xs: "100%", sm: "100%", md: "10%"} }}
        label="CEP"
        name="postalCode"
        required
        value={state.userInfo.postalCode}
        onChange={(e) => {
          const cep = e.target.value;
          setState({
            ...state,
            userInfo: { ...state.userInfo, postalCode: cep },
          });

          // Trigger address fetch when CEP is complete
          if (cep.length === 8) {
            fetchAddressByCEP(cep);
          }
        }}
        placeholder="Digite o CEP"
      />
        

        <TextField
        sx={{ width: {xs: "100%", sm: "100%", md: "49%"} }}
          label="Rua"
          name="address"
          value={state.userInfo.address}
          required
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, address: e.target.value },
            })
          }
          placeholder="Digite sua rua"
        />

        <TextField
        sx={{ width: {xs: "100%", sm: "100%", md: "20%"} }}
          label="Número"
          name="addressNumber"
          required
          value={state.userInfo.addressNumber}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, addressNumber: e.target.value },
            })
          }
          placeholder="Digite o número"
        />

        <TextField
        sx={{ width: {xs: "100%", sm: "100%", md: "18%"} }}
          label="Complemento"
          name="complement"
          value={state.userInfo.complement}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, complement: e.target.value },
            })
          }
          placeholder="Digite o complemento (opcional)"
        />

      <TextField
        sx={{ width: {xs: "100%", sm: "100%", md: "50%"} }}
          label="Cidade"
          name="city"
          required
          value={state.userInfo.city}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, city: e.target.value },
            })
          }
          placeholder="Digite a cidade"
        />
        <TextField
        sx={{ width: {xs: "100%", sm: "100%", md: "30%"} }}
          label="Bairro"
          name="province"
          required
          value={state.userInfo.province}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, province: e.target.value },
            })
          }
          placeholder="Digite o bairro"
        />
          <FormControl
            sx={{ width: { xs: "100%", sm: "100%", md: "18%" } }}
          >
            <InputLabel>Estado</InputLabel>
            <Select
              name="state"
              label="Estado"
              required
              value={state.userInfo.state}
              onChange={(e) =>
                setState({
                  ...state,
                  userInfo: { ...state.userInfo, state: e.target.value },
                })
              }
            >
              <MenuItem value="AC">AC</MenuItem>
              <MenuItem value="AL">AL</MenuItem>
              <MenuItem value="AP">AP</MenuItem>
              <MenuItem value="AM">AM</MenuItem>
              <MenuItem value="BA">BA</MenuItem>
              <MenuItem value="CE">CE</MenuItem>
              <MenuItem value="DF">DF</MenuItem>
              <MenuItem value="ES">ES</MenuItem>
              <MenuItem value="GO">GO</MenuItem>
              <MenuItem value="MA">MA</MenuItem>
              <MenuItem value="MT">MT</MenuItem>
              <MenuItem value="MS">MS</MenuItem>
              <MenuItem value="MG">MG</MenuItem>
              <MenuItem value="PA">PA</MenuItem>
              <MenuItem value="PB">PB</MenuItem>
              <MenuItem value="PR">PR</MenuItem>
              <MenuItem value="PE">PE</MenuItem>
              <MenuItem value="PI">PI</MenuItem>
              <MenuItem value="RJ">RJ</MenuItem>
              <MenuItem value="RN">RN</MenuItem>
              <MenuItem value="RS">RS</MenuItem>
              <MenuItem value="RO">RO</MenuItem>
              <MenuItem value="RR">RR</MenuItem>
              <MenuItem value="SC">SC</MenuItem>
              <MenuItem value="SP">SP</MenuItem>
              <MenuItem value="SE">SE</MenuItem>
              <MenuItem value="TO">TO</MenuItem>
            </Select>
          </FormControl>

      


        <TextField
        sx={{ width: { xs: "49%", sm: "49%", md: "35"} }}
          label="Telefone"
          name="phone"
          value={state.userInfo.phone}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, phone: e.target.value },
            })
          }
          placeholder="Digite o telefone"
        />

        <TextField
        sx={{ width: { xs: "48%", sm: "48%", md: "35"} }}
          label="Celular"
          name="mobilePhone"
          required
          value={state.userInfo.mobilePhone}
          onChange={(e) =>
            setState({
              ...state,
              userInfo: { ...state.userInfo, mobilePhone: e.target.value },
            })
          }
          placeholder="Digite o celular"
        />

        {state.errorMsg && (
          <Typography color="error">{state.errorMsg}</Typography>
        )}
        {state.successMsg && (
          <Typography color="success">{state.successMsg}</Typography>
        )}

        <Button variant="contained" type="submit" fullWidth>
          Cadastrar
        </Button>
      </form>
      <Button variant="outlined" fullWidth onClick={handleShowLogin}>
        Entrar
      </Button>
    </Card>
    </Container>
  );
}

export default RegisterForm;
