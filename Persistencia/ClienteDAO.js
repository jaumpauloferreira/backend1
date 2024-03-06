import conectar from "./Conexao.js"; //não esquecer de colocar a extensão .js no final
import Cliente from "../Modelos/Cliente.js";
//DAO - Data Access Object
export default class ClienteDAO{
    async gravar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `INSERT INTO cliente (nome, email, telefone, rg, cpf, endereco, ingressos, valor) 
                         values (?, ?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [
              cliente.nome,
              cliente.email,
              cliente.telefone,
              cliente.rg,
              cliente.cpf,
              cliente.endereco,
              cliente.ingressos,
              cliente.valor
             ];
            const [resultados, campos] = await conexao.execute(sql,parametros);
            //funcionalidade interessante oferecida pela biblioteca mysql2
            cliente.codigo = resultados.insertId; //recupera o id gerado pelo banco de dados
        }
    }

    async atualizar(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `UPDATE cliente SET nome = ?,
                         email = ?, telefone = ?, rg = ?,
                         cpf = ?, endereço = ?, ingressos = ?,
                         valor = ? WHERE id = ?`;
          const parametros = [
            
            cliente.nome,
            cliente.email,
            cliente.telefone,
            cliente.rg,
            cliente.cpf,
            cliente.endereco,
            cliente.ingressos,
            cliente.valor
           ];
    

            await conexao.execute(sql,parametros);
        }
    }

    async excluir(cliente){
        if (cliente instanceof Cliente){
            const conexao = await conectar();
            const sql = `DELETE FROM cliente WHERE id = ?`;
            const parametros = [
                cliente.codigo
            ]
            await conexao.execute(sql,parametros);
        }
    }

    //termo de pesquisa pode ser o código do cliente ou ainda o nome
    
    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql="";
        if (isNaN(termoDePesquisa)){ //termo de pesquina não é um número
            sql = `SELECT * FROM cliente WHERE nome LIKE ?`;
            termoDePesquisa= '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM cliente WHERE id = ?`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, [termoDePesquisa]);
        let listaCliente = [];
        for (const registro of registros) {
          const cliente = new cliente(
            registro.id,
            registro.nome,
            registro.email,
            registro.telefone,
            registro.rg,
            registro.cpf,
            registro.endereco,
            registro.ingressos,
            registro.valor
          );
          listaCliente.push(cliente);
        }
        return listaCliente;
    }
}