import React, { Component } from 'react';
import { uniqueId } from 'lodash';
import filesize from 'filesize';

import api from './services/api'; // Importando api

import GlobalStyle from './styles/global';
import { Container, Content } from './styles';

import Upload from './components/Upload';
import FileList from './components/FileList';

class App extends Component {

  state = {
    // armazenar informações dos arquivos que o usuario fez upload
    uploadedFiles: []
  };

  // Listando todos os arquivos cadastrados
  async componentDidMount() {
    // carregando toda lista que contem cadastrado no banco de dados
    const response = await api.get('posts');

    this.setState({
      uploadedFiles: response.data.map(file => ({
        id: file._id,
        name: file.name,
        readableSize: filesize(file.size),
        preview: file.url,
        uploaded: true,
        url: file.url
      }))
    })
  }

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
    // foreach para cada arquivo deste que foi feito upload pelo usuario, chama a função this.processUpload
    uploadedFiles.forEach(this.processUpload);
  };

  updateFile = (id, data) => {
    // Percorrer todos os arquivos que tem la dentro, retornar cada um deles dentro de um uploadFile
    this.setState({
      uploadedFiles: this.state.uploadedFiles.map(uploadedFile => {
        // se o id for igual ao id do uploadFile que esta recebendo, quer dizer que é o arquivo que precisa atualizar
        // e ira retornar todas as informações do uploadFile, e sobrescrever todas as informações que recebe atraves do data
        return id === uploadedFile.id
          ? { ...uploadedFile, ...data }
          : uploadedFile;
      })
    });
  };

  // fazendo requisição para o back-end um arquivo de cada vez
  processUpload = uploadedFile => {
    const data = new FormData(); // objeto que o html transforma os campos do formulario dentro do javascript

    // criando novos campos
    data.append("file", uploadedFile.file, uploadedFile.name);

    // enviando para api
    api.post("posts", data, {
      onUploadProgress: e => {
        const progress = parseInt(Math.round((e.loaded * 100) / e.total)); // o quanto do arquivo ja foi processado

        this.updateFile(uploadedFile.id, {
          progress
        });
      },// retorna o progresso da requisição
    })
      .then(response => { // metodo que vai ser executado, assim que o upload finalizar
        this.updateFile(uploadedFile.id, { // quando vir essa resposta, quer dizer que o upload deu tudo certo
          uploaded: true, // quer dizer que finalizou o upload
          id: response.data._id, // no mongodb ele sempre salva com este _ underline na frente
          url: response.data.url
        })
      })
      .catch(() => {
        this.updateFile(uploadedFile.id, {
          error: true
        });
      });
  };

  // deletar arquivo
  handleDelete = async id => {
    // recebendo o id que deseja deletar por parametro
    await api.delete(`posts/${id}`);

    // deletando arquivo do estado
    this.setState({
      // indo no array de uploadedFiles e filtrando por todos os ids que não seja o informado no parametro
      uploadedFiles: this.state.uploadedFiles.filter(file => file.id !== id)
    })
  }

  componentWillUnmount() {
    // quando a aplicação for fechada, para não ficar pesando na cache do navegador
    // deletando todos os objetoURL criados anteriormente para nao sobrar cache de imagem no navegador
    this.state.uploadedFiles.forEach(file => URL.revokeObjectURL(file.preview));
  }

  render() {
    const { uploadedFiles } = this.state;

    return (
      <Container>
        <Content>
          <Upload onUpload={this.handleUpload} />
          {!!uploadedFiles.length && (
            <FileList files={uploadedFiles} onDelete={this.handleDelete} />
          )} {/* utilizando !! para retornar true ou false, se for 0 false se for 1 true */}

        </Content>
        <GlobalStyle />
      </Container>
    );
  }
}

export default App;
