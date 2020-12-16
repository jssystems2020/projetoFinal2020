import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http"
import { APICONFIG } from "../config/api.config";
import { Estacionamento } from "../models/estacionamento";

@Injectable()
export class EstacionamentoService {

    constructor(public httpClient: HttpClient) { }

    get(estacionamento:Estacionamento){
        let url = APICONFIG.urlBase+"/route.veiculos.php?id="+estacionamento.id;
        return this.httpClient.get<Estacionamento[]>(url);
    }

}