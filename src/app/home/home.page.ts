import { Component } from '@angular/core';
import {StoryServiceService} from '../service/story-service.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AlertController} from '@ionic/angular';

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

  constructor(public storyService: StoryServiceService, public alertController: AlertController) {}

  setCheckUseStory(): void{
    this.canUse = ! this.canUse;
  }

  uploadStoryAndSetUser(): void{
    let error = '';
    if (!this.email.includes('@')){
      error += '- Make sure the email contains an @</br></br>';
    }
    if (this.email === ''){
      error += '- The email field is empty </br></br>';
    }
    for (const character of this.email) {
      if (character === character.toUpperCase()){
        error += ' - An email should not include a character in uppercase </br></br>';
      }
    }
    if (this.email.length < 4){
      error += ' - An email this short is not valid </br></br>';
    }

if (error === ''){
  this.storyService.createUserInFirestore('storyOwners', this.naam, this.email, this.canUse).then(async (id)=> {
    await this.storyService.createStoryInFirestore('stories', this.story, id);
  });

}

else {
  this.callErrorMessage('Stop right there!',error).then();
}
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
