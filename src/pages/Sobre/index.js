import React from "react";
import {
  Box,
  Typography,
  Container,
  TextField,
  Button,
  useTheme,
} from "@mui/material";

const Sobre = () => {
  const theme = useTheme();
  return (
    <Container sx={{ marginTop: "60px", marginBottom: "60px" }}>
      <Typography variant="h3" color={theme.palette.text.green}>
        Quem somos
      </Typography>
      <Typography variant="h6" color={theme.palette.text.dark}>
        A Casa do Menino Jesus de Praga promove acolhimento em saúde com
        habilitação e reabilitação multidisciplinar para pessoas com deficiência
        (PCDs), com lesões neurológicas e motoras de alta e média complexidade,
        em atendimentos de longa permanência. Hoje, são 32 acolhidos e
        pacientes, entre crianças, adolescentes e até adultos. Em 2022 a
        instituição recebeu o Prêmio Melhores ONGs, promovido pelo Instituto
        Doar, e foi indicada como melhor organização em gestão do país pelo
        Ministério da Cidadania.
      </Typography>
      <Typography variant="h6" color={theme.palette.text.dark}>
        Amigos da Casa é uma iniciativa da entidade para divulgar e promover os
        projetos e ações de mobilização de recursos. Todas as formas de doações
        apresentadas são importantes fontes de recursos para a instituição e
        contribuem sobremaneira para a garantia do atendimento de saúde de alta
        e média complexidade oferecido a crianças e adolescentes com lesões
        neurológicas e motoras severas e permanentes.
      </Typography>
      <Typography variant="h6" color={theme.palette.text.dark}>
        Atualmente contamos com 89 profissionais, todos em contrato CLT, pois a
        instituição funciona 24 horas, 7 dias por semana. A área técnica conta
        com enfermeiros, técnicos de enfermagem, médicos, fisioterapeutas,
        terapeutas ocupacionais, farmacêutica, nutricionista, fonoaudiólogos,
        psicólogos e assistentes sociais. Somando todos os atendimentos
        prestados para cada acolhido, chega-se a aproximadamente 1.200/mês.
      </Typography>
      <Typography variant="h6" color={theme.palette.text.dark}>
        Os núcleos de cuidado são equipados com ar condicionado central, pontos
        para fornecimento de oxigênio e ar comprimido para aspirações, locais
        para guarda individual de cadeiras de rodas, todos com acesso central a
        dispensação de medicação e consultórios médicos e de enfermagem, ligados
        por amplos corredores ao bloco de atendimentos terapêuticos diversos,
        inclusive acesso externo para passeios. O custo mensal para os cuidados
        de cada acolhido e paciente fica em média de R$ 20.000,00, pois trata-se
        de atendimento de alta complexidade com alimentação especial, muitas via
        enteral e parenteral; medicamentos de uso contínuo; monitoramento
        permanente pelas equipes de enfermagem e médica; seções de fisioterapia,
        fonoaudiologia e terapia ocupacional
      </Typography>
    </Container>
  );
};

export default Sobre;
