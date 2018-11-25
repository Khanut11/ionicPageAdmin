import { Component, Injectable } from '@angular/core';
import { NavController, AlertController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Injectable()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  reserveList : FirebaseListObservable<any>
  key: any
  email: any
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public alertCtrl: AlertController, private fdb: AngularFireDatabase) {

      this.email = this.navParams.get('email');
      this.reserveList = fdb.list('/reserves');
  }

  removeAlert(){
    this.alertCtrl.create({
      title: 'ลบการจองสนาม',
      subTitle: 'ต้องการลบการจองนี้หรือไม่ ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.removeReserve();
          }
        }
      ]
    }).present();
  }

  confirmAlert() {
    this.alertCtrl.create({
      title: 'ยืนยันการจองสนาม',
      subTitle: 'ยืนยันการจองสนามนี้หรือไม่ ?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'OK',
          handler: () => {
            this.confirmReserve();
          }
        }
      ]
    }).present();
  }

  removeSuccesAlert() {
    this.alertCtrl.create({
      title: 'ทำรายการสำเร็จ',
      subTitle: 'ยกเลิกการจองสนามเรียบร้อย',
      buttons: ['OK']
    }).present();
  }

  confrimSuccesAlert(){
    this.alertCtrl.create({
      title: 'ทำรายการสำเร็จ',
      subTitle: 'ยืนยันการจองสนามเรียบร้อย',
      buttons: ['OK']
    }).present();
  }

  confirmBtn(key){
    this.key = key;
    console.log(this.key);
    this.confirmAlert();
  }

  removeBtn(key){
    this.key = key;
    console.log(this.key);
    this.removeAlert();
  }

  removeReserve(){
    this.reserveList.remove(this.key).then(() => {
      this.removeSuccesAlert();
    }, error => {
      console.log(error);      
    });
  }

  confirmReserve(){
    this.reserveList.update(this.key , {status: 'Confrimed'}).then( () => {
      this.confrimSuccesAlert();
    }, error => {
      console.log(error);      
    });
  }
}
