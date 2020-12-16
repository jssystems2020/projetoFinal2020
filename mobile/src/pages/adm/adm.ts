import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Estacionamento } from '../../models/estacionamento';
import { EstacionamentoService } from '../../services/estacionamento.service';


/**
 * Generated class for the AdmPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-adm',
  templateUrl: 'adm.html',
})
export class AdmPage {

  estacio:Estacionamento[];

  constructor(public navCtrl: NavController, public navParams: NavParams, public estacionamentoService: EstacionamentoService) {
  }

  ionViewDidLoad() {
    let estacionamento:Estacionamento = {id: "0", tipo: "", placa: "", entrada: "", saida: "", dif_fra_seg: "", valortotal: ""} 
    this.estacionamentoService.get(estacionamento).subscribe(
      (response:Estacionamento[])=>{
        this.estacio = response;
        console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

}
