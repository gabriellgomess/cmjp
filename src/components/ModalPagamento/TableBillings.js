import { useState, useEffect } from 'react';
import { TableContainer, TableBody, Table, TableHead, TableRow, TableCell, Button, Dialog, DialogTitle, DialogContent, TextField, DialogActions, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import axios from 'axios';

function TableBillings({ billings }) {
    const [openDialog, setOpenDialog] = useState(false);
const [currentBilling, setCurrentBilling] = useState(null);

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
      function editBilling(billing) {
        setCurrentBilling(billing);
        setOpenDialog(true);
    }
    async function deleteBilling(id) {
        try {
            await axios.delete(`/yourEndpoint/${id}`);
            // Atualize a lista de cobranças ou refaça a requisição para obter a lista atualizada
        } catch (error) {
            console.error("Erro ao deletar a cobrança:", error);
        }
    }

    async function handleSubmit() {
        // try {
        //     await axios.put(`/yourEndpoint/${currentBilling.id}`, currentBilling);
        //     setOpenDialog(false);
        //     // Atualize a lista de cobranças ou refaça a requisição para obter a lista atualizada
        // } catch (error) {
        //     console.error("Erro ao atualizar a cobrança:", error);
        // }
        console.log(currentBilling)
    }

    const handleFormatCurrency = (event) => {
        var valor = event.target.value.replace(/\D/g, "");
        valor = (valor / 100).toFixed(2) + "";
        valor = valor.replace(".", ",");
        valor = valor.replace(/(\d)(\d{3})(\d{3}),/g, "$1.$2.$3,");
        valor = valor.replace(/(\d)(\d{3}),/g, "$1.$2,");
        event.target.value = valor === "0,00" ? "" : "R$ " + valor;
      };
    
    
    
    return (
        <>
        <TableContainer>
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
                  <TableCell>Ações</TableCell>
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
                    <TableCell> {/* Coluna de ações */}
                        <Button onClick={() => editBilling(billing)}>Editar</Button>
                        <Button onClick={() => deleteBilling(billing.id)}>Excluir</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
    <DialogTitle>Editar Cobrança</DialogTitle>
    <DialogContent sx={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px'}}>
        <TextField
        sx={{marginTop: '10px'}}
            fullWidth
            label="ID"
            value={currentBilling?.id}
            InputProps={{ readOnly: true }}
            
        />

    <TextField
    
    fullWidth
    label="Valor"
    value={currentBilling?.value}
    onChange={(e) => {
        const formattedValue = handleFormatCurrency(e);
        setCurrentBilling({ ...currentBilling, value: formattedValue });
    }}
/>

        <TextField
        
            fullWidth
            label="Vencimento"
            type='date'
            value={currentBilling?.dueDate}
            onChange={(e) => setCurrentBilling({ ...currentBilling, dueDate: e.target.value })}
        />
        <FormControl
            fullWidth
        >
            <InputLabel
                id="billingType-select-label"
            >
                Forma de Pagamento
            </InputLabel>
            <Select
                
                labelId="billingType-select-label"
                id="billingType-select"
                label="Forma de Pagamento"
                value={currentBilling?.billingType}
                onChange={(e) => setCurrentBilling({ ...currentBilling, billingType: e.target.value })}
            >
                <MenuItem value="BOLETO">Boleto</MenuItem>
                <MenuItem value="CREDIT_CARD">Cartão de crédito</MenuItem>
                <MenuItem value="PIX">Pix</MenuItem>
                <MenuItem value="UNDEFINED">Cliente define</MenuItem>
            </Select>
        </FormControl>


        
    </DialogContent>
    <DialogActions>
        <Button onClick={() => setOpenDialog(false)}>Cancelar</Button>
        <Button onClick={handleSubmit}>Salvar</Button>
    </DialogActions>
</Dialog>

        </>
        
      );
    }

export default TableBillings