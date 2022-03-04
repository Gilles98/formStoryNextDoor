import { Component } from '@angular/core';
import {StoryServiceService} from '../service/story-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController, ModalController} from '@ionic/angular';
import {StoryModalComponent} from '../components/story-modal/story-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  email ='';
  naam: string;
  canUse = false;
  story: string;

  constructor(public storyService: StoryServiceService, public alertController: AlertController, public modalController: ModalController) {
  }

  ionViewDidLoad(): void{
    const audio = new Audio();
    audio.src = '../assets/sparkle.mp3';
    audio.load();
    audio.play().then(r => {
      console.log('audio');
    });
  }
  setCheckUseStory(): void{
    this.canUse = ! this.canUse;
  }

  resetThisThing(): void{
    this.email = '';
    this.story = '';
    this.naam = '';
    this.canUse = false;
  }
  uploadStoryAndSetUser(): void{
    let error = '';
    if (!this.email.includes('@')){
      error += '- Make sure the email contains an @</br></br>';
    }
    if (this.email === ''){
      error += '- The email field is empty </br></br>';
    }
  /*  for (const character of this.email) {
      if (character === character.toUpperCase()){
        error += ' - An email should not include a character in uppercase </br></br>';
      }
    }*/
    if (this.email.length < 4){
      error += ' - An email this short is not valid </br></br>';
    }

if (error === ''){
  this.storyService.createUserInFirestore('storyOwners', this.naam, this.email, this.canUse).then(async (id)=> {
    await this.storyService.createStoryInFirestore('stories', this.story, id).then(async () => {
      const alert: HTMLIonAlertElement = await this.alertController.create({
        header: 'Thanks for your contribution!',
        subHeader: 'We will do our best to honor it correctly',
        message:'You might be contacted by one of our team members in the future',
        buttons: [{text: 'Get me out of here',
          handler: () =>{
            alert.dismiss();
          }
        }]
      });
      await alert.present();
    });
    this.resetThisThing();
  });

}

else {
  this.callErrorMessage('Stop right there!',error).then();
}
  }

  async showModal(): Promise<void>{
 const modal = await this.modalController.create({
    component: StoryModalComponent
  });
  return await modal.present();
  }
  async callErrorMessage(title: string, error: string): Promise<void>
  {

    const alert: HTMLIonAlertElement = await this.alertController.create({
      header: title,
      subHeader: 'Oops something doesn\'t agree :(',
      message:error,
      buttons: [{text: 'OK',
        handler: () =>{
          alert.dismiss();
        }
      }]
    });
    await alert.present();
  }
}
