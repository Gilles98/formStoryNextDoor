import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';

@Component({
  selector: 'app-story-modal',
  templateUrl: './story-modal.component.html',
  styleUrls: ['./story-modal.component.scss'],
})
export class StoryModalComponent implements OnInit {

  constructor(public modalController: ModalController) { }

  destroy(): void
  {
    this.modalController.dismiss();
  }
  ngOnInit() {}

}
