import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

import { DropContainer, UploadMessage } from './styles';

export default class Upload extends Component {
    // Menssagens
    rederDragMessage = (isDragActive, isDragReject) => {
        // se não tiver o isDragActive
        if (!isDragActive) {
            return <UploadMessage>Arraste arquivos aqui...</UploadMessage>
        }

        // se arrastar um arquivo que não pode ser arrastado
        if (isDragReject) {
            return <UploadMessage type="error">Arquivo não suportado</UploadMessage>
        }

        // se estiver com o dragActive
        return <UploadMessage tyoe="success">Solte os arquivos aqui</UploadMessage>
    };

    render() {
        return (
            // Permitindo que o usuario faça qualquer upload de imagem
            <Dropzone accept="image/*" onDropAccepted={() => { }}>
                {({ getRootProps, getInputProps, isDragActive, isDragReject }) => (
                    <DropContainer
                        {...getRootProps()}
                        isDragActive={isDragActive} /* Quando esta com um arquivo e passe por cima dessa zone, quer que fique verde */
                        isDragReject={isDragReject} /* Quando o usuario esta passando um arquivo que não é imagem, ficando assim vermelho */
                    >
                        <input {...getInputProps()} />

                        {/* menssagens */}
                        {this.rederDragMessage(isDragActive, isDragReject)}
                    </DropContainer>
                )}
            </Dropzone>
        );
    }
}