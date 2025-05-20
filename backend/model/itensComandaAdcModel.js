const database = require('../utils/database');
const banco = new database();

class ItensComandaAdcModel {
   #idItem;
   #idAdc;
   get idItem(){return this.#idItem} set idItem(idItem){this.#idItem = idItem}
   get idAdc(){return this.#idAdc} set idAdc(idAdc){this.#idAdc = idAdc}

   constructor(idItem, idAdc) {
      this.#idItem = idItem;
      this.#idAdc = idAdc;
   }

   toJSON(){
      return{
         'idItem': this.#idItem,
         'idAdc': this.#idAdc
      }
   }

   async gravar(){
      let sql = "insert into itens_comanda_adicionais(id_item, id_adc) values(?, ?)";
      let valores = [this.#idItem, this.#idAdc];
      let ok = await banco.ExecutaComandoNonQuery(sql, valores);
      return ok;
   }

   async listar(){
    let sql = "select * from itens_comanda_adicionais";
    let rows = await banco.ExecutaComando(sql);
    let lista = [];
    for(let i = 0; i < rows.length; i++){
        lista.push(new ItensComandaAdcModel(rows[i]['id_item'], rows[i]['id_adc']));
    }
    return lista;
   }

   async obter(idItem){
    let sql = "select * from itens_comanda_adicionais where id_item = ?";
    let valores = [idItem];
    let rows = await banco.ExecutaComando(sql, valores);
    let lista = [];
    for(let i = 0; i < rows.length; i++){
        lista.push(new ItensComandaAdcModel(rows[i]['id_item'], rows[i]['id_adc']));
    }
    return lista;
   }
}

module.exports = ItensComandaAdcModel;