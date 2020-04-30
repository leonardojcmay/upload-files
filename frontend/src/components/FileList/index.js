import React from 'react';
import { CircularProgressbar } from "react-circular-progressbar";
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

import { Container, FileInfo, Preview } from './styles';

const FileList = ({ files, onDelete }) => (
    <Container>
        {/* listando todos os arquivos que tem dentro do files */}
        {files.map(uploadedFile => (
            <li key={uploadedFile.id}> {/* é necessario para ter uma chave unica em cada iteração do map no updateFile */}
                {/* FileInfo onde vai ta as principais informações do arquivo */}
                <FileInfo>
                    <Preview src={uploadedFile.preview} />
                    <div>
                        {/* Titulo */}
                        <strong>{uploadedFile.name}</strong>
                        {/* Tamanho da imagem e botão de excluir */}
                        <span>
                            {uploadedFile.readableSize}{" "}
                            {!!uploadedFile.url && (
                                <button onClick={() => onDelete(uploadedFile.id)}>
                                    Excluir
                                </button>
                            )}{/* Se ja contem url mostrar botão de excluir, caso contrario não mostrar. Pois se nao tem url não foi finalizado o upload */}
                        </span>
                    </div>
                </FileInfo>

                {/* Barra de progresso */}
                {/* Somente mostrar a progressbar se o arquivo ainda não finalizou e se não ocorreu erro */}
                <div>
                    {/* se o arquivo não foi feito upload e se nao possui error, ai sim mostra a circular bar */}
                    {!uploadedFile.uploaded && !uploadedFile.error && (

                        <CircularProgressbar
                            styles={{
                                root: { width: 24 },
                                path: { stroke: "#7159c1" } // Cor do progresso
                            }}
                            strokeWidth={10}
                            value={uploadedFile.progress}
                        />
                    )}

                    {/* mostrar realmente o link só quando tiver uma url, se não ter url não mostra */}
                    {uploadedFile.url && (
                        <a
                            href={uploadedFile.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                        </a>
                    )}

                    {/* somente mostrar se o uploaded foi feito com sucesso */}
                    {/* icone de upload com sucesso */}
                    {uploadedFile.uploaded && <MdCheckCircle size={24} color="#78e5d5" />}

                    {/* somente mostrar se o uploaded ocorreu erro */}
                    {/* icone de upload com erro */}
                    {uploadedFile.error && <MdError size={24} color="#e57878" />}

                </div>
            </li>
        ))}
    </Container>
);

export default FileList;