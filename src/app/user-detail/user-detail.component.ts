import { Component, inject } from '@angular/core';
import { MatCard, MatCardModule } from '@angular/material/card';
import {
  Firestore,
  Unsubscribe,
  addDoc,
  collection,
  doc,
  getDocs,
  getFirestore,
  limit,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userID: string | undefined | any;
  fireStore: Firestore = inject(Firestore);
 /* userData = {
    firstName: '',
    lastName: '',
  }*/
  userData: User | any = {};
  unsubUserData;

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe((params) => {
      this.userID = params['id'];
    })
    this.unsubUserData = this.subUserData(this.userID);
    console.log(this.userID)
  }

  subUserData(colId: string) {
    return onSnapshot(doc(this.fireStore, 'User', colId), (document: any) => {
      console.log(document.data());
      this.userData = document.data();
      /*(this.userData.firstName = document.data().firstName),
      (this.userData.lastName = document.data().lastName)*/
    })
    
  }


  ngOnDestroy() {
    this.unsubUserData();
  }

}
