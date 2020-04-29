import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import GlobalStyle from './styles/global';
import { Container, Content } from './styles';

import Upload from './components/Upload';
import FileList from './components/FileList';

class App extends Component {

  state = {
    // armazenar informações dos arquivos que o usuario fez upload
    uploadedFiles: [],
  };

  handleUpload = files => {
    // console.log(files)
    // percorrendo a listagem
    const uploadedFiles = files.map(file => ({
      file,
      id: uniqueId(), // gerando id unico. uniqueId
      name: file.name,
      readableSize: filesize(file.size), // gerando nomenclatura correta de acordo com o tamanho da imagem
      preview: URL.createObjectURL(file), // gerando uma url de preciew antes mesmo de a imagem chegar no servidor
      progress: 0, // progresso da barra de upload
      uploaded: false, // se finalizou o upload com sucesso ou não
      error: false, // se deu erro ou não no upload
      url: null, // url para o usuario acessar o link da imagem, so vai ser preenchida após o upload ter executado com sucesso

    }));

    this.setState({
      // anexar os novos arquivos que estão fazendo upload junto com os que ja foram feitos o upload
      uploadedFiles: this.state.uploadedFiles.concat(uploadedFiles) // concat anexar um array a outro
    });

    // mandar os arquivos para API
  };

  render() {
    const { uploadedFiles } = this.state;

    return (
      <Container>
        <Content>
          <Upload onUpload={this.handleUpload} />
          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} />
          )} {/* utilizando !! para retornar true ou false, se for 0 false se for 1 true */}

        </Content>
        <GlobalStyle />
      </Container>
    );
  }
}

export default App;
