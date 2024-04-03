import conectar from "./Conexao.js"; //não esquecer de colocar a extensão .js no final
import Evento from "../Modelos/Evento.js";
//DAO - Data Access Object
export default class EventoDAO{
    async gravar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `INSERT INTO evento (nome, email, telefone, rg, cpf, endereco, ingressos, valor) 
            values (?, ?, ?, ?, ?, ?, ?, ?)`;
            const parametros = [
                evento.nome,
                evento.email,
                evento.telefone,
                evento.rg,
                evento.cpf,
                evento.endereco,
                evento.ingressos,
                evento.valor
              ];              
            const [resultados, campos] = await conexao.execute(sql,parametros);
            //funcionalidade interessante oferecida pela biblioteca mysql2
            evento.codigo = resultados.insertId; //recupera o id gerado pelo banco de dados
        }
    }

    async atualizar(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `UPDATE evento SET nome = ?,
                         email = ?, telefone = ?, rg = ?,
                         cpf = ?, endereco = ?, ingressos = ?,
                         valor = ? WHERE id = ?`;
          const parametros = [
            evento.nome,
            evento.email,
            evento.telefone,
            evento.rg,
            evento.cpf,
            evento.endereco,
            evento.ingressos,
            evento.valor,
            evento.codigo
           ];
    

            await conexao.execute(sql,parametros);
        }
    }

    async excluir(evento){
        if (evento instanceof Evento){
            const conexao = await conectar();
            const sql = `DELETE FROM evento WHERE id = ?`;
            const parametros = [
                evento.codigo
            ]
            await conexao.execute(sql,parametros);
        }
    }

    //termo de pesquisa pode ser o código do eventoe ou ainda o nome
    
    async consultar(termoDePesquisa){
        if (termoDePesquisa === undefined){
            termoDePesquisa = "";
        }
        let sql="";
        if (isNaN(parseInt(termoDePesquisa))){ //termo de pesquina não é um número
            sql = `SELECT * FROM evento WHERE nome LIKE ?`;
            termoDePesquisa= '%' + termoDePesquisa + '%';
        }
        else{
            sql = `SELECT * FROM evento WHERE id = ?`;
        }

        const conexao = await conectar();
        const [registros] = await conexao.execute(sql, [termoDePesquisa]);
        let listaEvento = [];
        for (const registro of registros) {
          const evento = new Evento(
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
          listaEvento.push(evento);
        }
        return listaEvento;
    }
}
