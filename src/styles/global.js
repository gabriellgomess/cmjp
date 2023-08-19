import { createGlobalStyle } from'styled-components';

export default createGlobalStyle`
    *{
        padding: 0;
        margin: 0;
        box-sizing: border-box;
    }

    body{
        background-color: white;
        color: white;
        -webkit-font-smoothing: antialiased;
    }

    body, input, textarea, button{
        font-size: 16px;
        outline: none;
    } 

    a{
        text-decoration: none;
    }

    button, a{
        cursor: pointer;
        transition: filter 0.2s;
    }

    button:hover, a:hover{
        filter: brightness(0.9);
    }
`;