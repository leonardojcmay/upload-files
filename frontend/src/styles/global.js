import { createGlobalStyle } from 'styled-components';
// importando as estilizações padrões que vem no Progressbar caso seja utilizado em outra tela/componente
import 'react-circular-progressbar/dist/styles.css';

export default createGlobalStyle`
    /* Para todos o componentes da tela */
    * {
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }

    body {
        font-family: Arial, Helvetica, sans-serif, Arial, Helvetica, sans-serif;
        font-size: 14px;
        background: #7159c1;
        text-rendering: optimizeLegibility;
        -webkit-font-smoothing: antialiased;
    }

    html, body, #root {
        height: 100%; /* Fazer ocupar 100% da tela em altura */
    }
`;