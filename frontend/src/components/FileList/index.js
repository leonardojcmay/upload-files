import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';
import { MdCheckCircle, MdError, MdLink } from 'react-icons/md';

import { Container, FileInfo, Preview } from './styles';

const FileList = () => (
    <Container>
        <li>
            {/* FileInfo onde vai ta as principais informações do arquivo */}
            <FileInfo>
                <Preview src="http://localhost:3000/files/368f97d3a6bde720df51c81fdd8cb8ec-nodejs.jpg" />
                <div>
                    {/* Titulo */}
                    <strong>profile.png</strong>
                    {/* Tamanho da imagem e botão de excluir */}
                    <span>64kb <button onClick={() => { }}>Excluir</button></span>
                </div>
            </FileInfo>

            {/* Barra de progresso */}
            <div>
                <CircularProgressbar
                    styles={{
                        root: { width: 24 },
                        path: { stroke: '#7159c1' } // Cor do progresso
                    }}
                    strokeWidth={10}
                    percentage={60}
                />

                <a
                    href="http://localhost:3000/files/368f97d3a6bde720df51c81fdd8cb8ec-nodejs.jpg"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <MdLink style={{ marginRight: 8 }} size={24} color="#222" />
                </a>

                {/* icone de upload com sucesso */}
                <MdCheckCircle size={24} color="#78e5d5" />
                {/* icone de upload com erro */}
                <MdError size={24} color="#e57878" />

            </div>
        </li>
    </Container>
);

export default FileList;