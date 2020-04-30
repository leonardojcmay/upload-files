import styled, { css } from 'styled-components';

const dragActive = css`
    border-color: #78e5d5;
`;

const dragReject = css`
    border-color: #e57878;
`;

export const DropContainer = styled.div.attrs({
    className: "dropzone"
})`
    /* Caixa onde vai jogar todos os arquivos que quer fazer upload */
    border: 1px dashed #ddd;
    border-radius: 4px;
    cursor: pointer;
  
    transition: height 0.2s ease;
  
    ${props => props.isDragActive && dragActive};
    ${props => props.isDragReject && dragReject};
    
`;

//     /*Se estiver utilizando o dragActive e passando por cima da zone, informando para ficar verde */
//     ${props => props.isDragActive && dragActive};
//     /*Se estiver utilizando o dragReject e passando por cima da zone, informando para ficar vermelho */
//     ${props => props.isDragReject && dragReject};

const messageColors = {
    default: '#999',
    error: '#e57878',
    success: '#78e5d5',
};

export const UploadMessage = styled.p`
    display: flex;
    color: ${props => messageColors[props.type || 'default']};
    justify-content: center;
    align-items: center;
    padding: 15px 0;
`;