import { Component, Injectable } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { HomePage } from '../home/home';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
@Injectable()
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, 
    public alertCtrl: AlertController, public ngFireAuth: AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  errorAlert(){
    this.alertCtrl.create({
      title: "Alert",
      subTitle: "E-mail or Password is incorrect",
      buttons: ['OK']
    }).present();
  }

  onClickLogin(email, password){
    if(email && password) {
      if(!this.validateEmail(email) || password.length < 6) {
        this.errorAlert();
      } else {
        this.ngFireAuth.auth.signInWithEmailAndPassword(email, password).then((user) => {
          this.navCtrl.setRoot(HomePage, {email: email});
        });
      }
    }
  }
}
