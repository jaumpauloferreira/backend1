//classe é a abstração de uma entidade do mundo real
//Em orientação a objetos uma classe possui métodos e atributos
//atributos são características de um objeto
//metodos são as ações que um objeto pode executar
import ClienteDAO from "../Persistencia/ClienteDAO.js";

export default class Cliente {
    //atributos são privados
    //somente por meio de métodos públicos é que podemos acessar os atributos de uma classe
    //em javascript definimos atributos privados usando #
    #codigo;
    #nome;
    #email;
    #telefone;
    #rg;
    #cpf;
    #endereco;
    #ingressos;
    #valor

    constructor(codigo = 0, nome = "", email = "", telefone = "", rg = "", cpf = "", endereco = "", ingressos = "", valor = "") {
        this.#codigo = codigo;
        this.#nome = nome;
        this.#email = email;
        this.#telefone = telefone;
        this.#rg = rg;
        this.#cpf = cpf;
        this.#endereco = endereco;
        this.#ingressos = ingressos;
        this.#valor = valor;
    }
    
        get codigo() {
            return this.#codigo;
        }
    
        set codigo(novoCodigo) {
            this.#codigo = novoCodigo;
        }
    
        get nome() {
            return this.#nome;
        }
    
        set nome(novoNome) {
            this.#nome = novoNome;
        }
    
        get email() {
            return this.#email;
        }
    
        set email(novoEmail) {
            this.#email = novoEmail;
        }
    
        get telefone() {
            return this.#telefone;
        }
    
        set telefone(novoTelefone) {
            this.#telefone = novoTelefone;
        }
    
        get rg() {
            return this.#rg;
        }
    
        set rg(novoRg) {
            this.#rg = novoRg;
        }
    
        get cpf() {
            return this.#cpf;
        }
    
        set cpf(novoCpf) {
            this.#cpf = novoCpf;
        }
    
        get endereco() {
            return this.#endereco;
        }
    
        set endereco(novoEndereco) {
            this.#endereco = novoEndereco;
        }
    
            get ingressos() {
            return this.#ingressos;
        }
    
        set ingressos(novosIngressos) {
            this.#ingressos = novosIngressos;
        }
    
        get valor() {
            return this.#valor;
        }
    
        set valor(novoValor) {
            this.#valor = novoValor;
        }
    
        //como armazenar os clientes no banco de dados?
    
        async gravar(){
            const dao = new clienteDAO();
            await dao.gravar(this);
        }
    
        async atualizar(){
        const dao = new EventoDAO();
        await dao.atualizar(this); 
    }
        
        async excluir(){
        const dao = new EventoDAO();
        await dao.excluir(this);
    }
        
        async consultar(termoDePesquisa){
        const dao = new EventoDAO();
        return await dao.consultar(termoDePesquisa);
    }

    //como armazenar os clientes no banco de dados?

    async gravar(){
        const dao = new ClienteDAO();
        await dao.gravar(this); //this pode ser compreendido com a seguinte expressão:	"grave a mim mesmo"
    }

    async atualizar(){
        const dao = new ClienteDAO();
        await dao.atualizar(this);
    }

    async excluir(){
        const dao = new ClienteDAO();
        await dao.excluir(this);
    }

    async consultar(termoDePesquisa){
        const dao = new ClienteDAO();
        return await dao.consultar(termoDePesquisa);
    }

    //override do método toString da classe pai Object
    toString(){
        return `Cliente código: ${this.#codigo} -  nome: ${this.#nome}`;
    }

    toJSON(){
        return {
            "codigo": this.#codigo,
            "nome": this.#nome,
            "email": this.#email,
            "telefone": this.#telefone,
            "rg": this.#rg,
            "cpf": this.#cpf,
            "endereco": this.#endereco,
            "ingresso": this.#ingressos,
            "valor": this.#valor
            }
    }    
}