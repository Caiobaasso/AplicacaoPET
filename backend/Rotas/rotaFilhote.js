import { Router } from "express";
import FilhoteCtrl from "../Controles/filhoteCtrl.js";

const rotaFilhote = new Router();
const filhoteCtrl  = new FilhoteCtrl();

rotaFilhote
.get('/', filhoteCtrl.consultar)
.get('/:termo',filhoteCtrl.consultar)
.post('/', filhoteCtrl.gravar)
.put('/', filhoteCtrl.atualizar)
.delete('/', filhoteCtrl.excluir);

export default rotaFilhote;