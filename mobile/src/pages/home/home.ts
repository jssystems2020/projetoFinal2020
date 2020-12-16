import { Component } from '@angular/core';
import { AlertController } from 'ionic-angular';
import { NavController, IonicPage, MenuController } from 'ionic-angular';


@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  login:string;
  senha:string;

  constructor(public navCtrl: NavController, public menu: MenuController,
  public alertController: AlertController,) {

  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }
  
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

}
