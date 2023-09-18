import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Tooltip,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import PropTypes from "prop-types";
import HelpIcon from "@mui/icons-material/Help";
import { set, useForm } from "react-hook-form";
import axios from "axios";
import Logo from "../../assets/LOGOS/AJUSTADOS/logoAmigosDaCasa-vertical.png";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const API_BASE_URL =
  "https://amigosdacasa.org.br/gerenciador-doacoes-amigosdacasa";
const ASAAS_ENDPOINT = `${API_BASE_URL}/api_site/asaas.php`;

const RecurrentForm = ({ theme }) => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [isAuth, setIsAuth] = useState(false);
  const [theUser, setTheUser] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [billings, setBillings] = useState([]);
  const [update, setUpdate] = useState(false);

  const getBillings = async () => {
    if (!theUser) return;

    try {
      const response = await axios.post(`${ASAAS_ENDPOINT}?param=37`, {
        id: theUser.customer_id,
      });
      setBillings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const loginToken = localStorage.getItem("loginToken");
      if (loginToken) {
        axios.defaults.headers.common["Authorization"] = "bearer " + loginToken;
        try {
          const { data } = await axios.get(
            `${API_BASE_URL}/login_site/user-info.php`
          );
          if (data.success && data.user) {
            setIsAuth(true);
            setTheUser(data.user);
            setUpdate(!update);
          } else {
            setIsAuth(false);
            setUpdate(!update);
          }
        } catch (error) {
          console.error("Erro ao buscar informações do usuário:", error);
          setIsAuth(false);
          setUpdate(!update);
        }
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    getBillings();
  }, [update]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    data.email = theUser.email;
    data.postalCode = theUser.cep;
    data.addressNumber = theUser.numero;
    data.phone = theUser.telefone;
    data.mobilePhone = theUser.celular;
    data.value = data.value.replace("R$ ", "");

    axios
      .post(
        `https://amigosdacasa.org.br/gerenciador-doacoes-amigosdacasa/api_site/asaas.php?param=18`,
        data
      )
      .then((response) => {
        if (response.data.status === "success") {
          console.log(response.data.message);
          setUpdate(!update);
        } else if (response.data.status === "error") {
          console.log(response.data.message);
          setUpdate(!update);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handlePaymentChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handleFormatCurrency = (event) => {
    var valor = event.target.value.replace(/\D/g, "");
    valor = (valor / 100).toFixed(2) + "";
    valor = valor.replace(".", ",");
    valor = valor.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
    valor = valor.replace(/(\d)(\d{3}),/g, "$1.$2,");
    event.target.value = valor === "0,00" ? "" : "R$ " + valor;
  };

  const statusMapping = {
    PENDING: "Aguardando pagamento",
    RECEIVED: "Recebida",
    CONFIRMED: "Pagamento confirmado (saldo ainda não creditado)",
    OVERDUE: "Vencida",
    REFUNDED: "Estornada",
    RECEIVED_IN_CASH: "Recebida em dinheiro (não gera saldo na conta)",
    REFUND_REQUESTED: "Estorno Solicitado",
    REFUND_IN_PROGRESS:
      "Estorno em processamento (liquidação já está agendada, cobrança será estornada após executar a liquidação)",
    CHARGEBACK_REQUESTED: "Recebido chargeback",
    CHARGEBACK_DISPUTE:
      "Em disputa de chargeback (caso sejam apresentados documentos para contestação)",
    AWAITING_CHARGEBACK_REVERSAL:
      "Disputa vencida, aguardando repasse da adquirente",
    DUNNING_REQUESTED: "Em processo de negativação",
    DUNNING_RECEIVED: "Recuperada",
    AWAITING_RISK_ANALYSIS: "Pagamento em análise",
  };

  function getFriendlyStatus(status) {
    return statusMapping[status] || "Status Desconhecido";
  }

  const handleLogout = () => {
    localStorage.removeItem("loginToken"); // Remove o token de autenticação do localStorage
    setIsAuth(false); // Atualize o estado da autenticação
    // Você pode também redirecionar o usuário para a página inicial ou de login usando:
    window.location.reload();
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box>
        <Box sx={{ width: "100%", display: "flex", justifyContent: "end" }}>
          <Button onClick={handleLogout} variant="outlined">
            Sair
          </Button>
        </Box>

        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="Criar uma doação " {...a11yProps(0)} />
            <Tab label="Minhas doações" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          {isAuth && (
            <Card elevation={0} sx={{ width: "100%", marginTop: "20px" }}>
              <CardContent>
                <Box sx={{ display: "flex" }}>
                  <Box
                    sx={{
                      width: "400px",
                      minWidth: "400px",
                      display: { xs: "none", md: "flex" },
                      flexDirection: "column",
                      gap: "15px",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <img style={{ width: "60%" }} src={Logo} alt="Logo" />
                  </Box>
                  <form
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: "20px",
                      width: "100%",
                    }}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        gap: "15px",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", flexWrap: "wrap", gap: "15px" }}
                      >
                        <TextField
                          size="small"
                          sx={{ width: { xs: "100%", sm: "100%", md: "29%" } }}
                          id="customerID"
                          label="ID do doador"
                          variant="outlined"
                          value={theUser.customer_id}
                          {...register("customerID")}
                          InputProps={{ readOnly: true }}
                        />
                        <TextField
                          size="small"
                          sx={{ width: { xs: "100%", sm: "100%", md: "68%" } }}
                          id="name"
                          label="Nome"
                          variant="outlined"
                          value={theUser.name}
                          {...register("name")}
                          InputProps={{ readOnly: true }}
                        />
                      </Box>
                      <Box
                        sx={{ display: "flex", flexWrap: "wrap", gap: "15px" }}
                      >
                        <TextField
                          size="small"
                          sx={{ width: { xs: "100%", sm: "100%", md: "32%" } }}
                          id="cpfCnpj"
                          label="CPF/CNPJ"
                          variant="outlined"
                          value={theUser.cpf}
                          {...register("cpfCnpj")}
                          InputProps={{ readOnly: true }}
                        />
                        <TextField
                          size="small"
                          sx={{ width: { xs: "100%", sm: "100%", md: "32%" } }}
                          id="nextDueDate"
                          label="Próximo Vencimento"
                          variant="outlined"
                          type="date"
                          {...register("nextDueDate", { required: true })}
                          InputLabelProps={{ shrink: true }}
                        />
                        <TextField
                          size="small"
                          sx={{ width: { xs: "100%", sm: "100%", md: "32%" } }}
                          id="value"
                          label="Valor"
                          variant="outlined"
                          onKeyUp={(event) => handleFormatCurrency(event)}
                          type="text"
                          {...register("value", { required: true })}
                        />
                      </Box>
                      <Box
                        sx={{ display: "flex", flexWrap: "wrap", gap: "15px" }}
                      >
                        <FormControl
                          sx={{ width: { xs: "100%", sm: "100%", md: "32%" } }}
                        >
                          <InputLabel
                            sx={{ marginTop: "-6px" }}
                            id="demo-simple-select-label"
                          >
                            Ciclo de Cobrança
                          </InputLabel>
                          <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            {...register("cycle", { required: true })}
                            label="Ciclo de Cobrança"
                          >
                            <MenuItem value="MONTHLY">Mensal</MenuItem>
                            <MenuItem value="WEEKLY">Semanal</MenuItem>
                            <MenuItem value="BIWEEKLY">Quinzenal</MenuItem>
                            <MenuItem value="QUARTERLY">Trimestral</MenuItem>
                            <MenuItem value="SEMIANNUALLY">Semestral</MenuItem>
                            <MenuItem value="YEARLY">Anual</MenuItem>
                          </Select>
                        </FormControl>
                        <FormControl
                          sx={{ width: { xs: "100%", sm: "100%", md: "32%" } }}
                        >
                          <InputLabel
                            sx={{ marginTop: "-6px" }}
                            id="demo-simple-select-label"
                          >
                            Forma de Pagamento
                          </InputLabel>
                          <Select
                            size="small"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            {...register("billingType", { required: true })}
                            label="Forma de Pagamento"
                            onChange={handlePaymentChange}
                          >
                            <MenuItem value="BOLETO">Boleto</MenuItem>
                            <MenuItem value="CREDIT_CARD">
                              Cartão de crédito
                            </MenuItem>
                            <MenuItem value="PIX">Pix</MenuItem>
                          </Select>
                        </FormControl>
                      </Box>

                      {paymentMethod === "CREDIT_CARD" && (
                        <Card
                          sx={{
                            background: theme.palette.background.greenLight,
                          }}
                        >
                          <CardContent>
                            <Typography variant="h6" color="primary">
                              Dados do cartão
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                flexWrap: "wrap",
                                gap: "15px",
                              }}
                            >
                              <TextField
                                size="small"
                                sx={{ width: "100%" }}
                                label="Nome no cartão"
                                {...register("cardName")}
                              />
                              <TextField
                                size="small"
                                sx={{ width: "48%" }}
                                label="Número do cartão"
                                {...register("cardNumber")}
                              />
                              <Box
                                sx={{
                                  width: "48%",
                                  display: "flex",
                                  gap: "15px",
                                }}
                              >
                                <TextField
                                  size="small"
                                  sx={{ width: "48%" }}
                                  label="Mês"
                                  type="number"
                                  InputProps={{
                                    inputProps: { min: 1, max: 12 },
                                  }}
                                  {...register("expiryMonth")}
                                />
                                <TextField
                                  size="small"
                                  sx={{ width: "48%" }}
                                  label="Ano"
                                  type="number"
                                  InputProps={{
                                    inputProps: { min: 2023, max: 2050 },
                                  }}
                                  {...register("expiryYear")}
                                />
                                <TextField
                                  size="small"
                                  sx={{ width: "48%" }}
                                  label="CVV"
                                  {...register("ccv")}
                                />
                              </Box>
                            </Box>
                          </CardContent>
                        </Card>
                      )}
                      <Button variant="contained" type="submit">
                        Criar Doação Recorrente
                      </Button>
                    </Box>
                  </form>
                </Box>
              </CardContent>
            </Card>
          )}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <TableContainer component={Paper}>
            <Table aria-label="billing table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Data da criação</TableCell>
                  <TableCell>Vencimento</TableCell>
                  <TableCell>Forma de Pagamento</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {billings.map((billing) => (
                  <TableRow key={billing.id}>
                    <TableCell component="th" scope="row">
                      {billing.id}
                    </TableCell>
                    <TableCell>
                      {billing.dateCreated?.split("-").reverse().join("/")}
                    </TableCell>
                    <TableCell>
                      {billing.dueDate?.split("-").reverse().join("/")}
                    </TableCell>
                    <TableCell>{billing.billingType}</TableCell>
                    <TableCell>
                      {billing.value?.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </TableCell>
                    <TableCell>
                      <Button href={billing.invoiceUrl} target="blank">
                        Link
                      </Button>
                    </TableCell>
                    <TableCell>{getFriendlyStatus(billing.status)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </CustomTabPanel>
      </Box>
    </Box>
  );
};

export default RecurrentForm;
