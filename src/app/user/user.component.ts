import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
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
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, MatIcon, MatButtonModule, MatTooltipModule, MatDialogModule, MatCardModule, RouterModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
})
export class UserComponent {

  user: User = new User();
  fireStore: Firestore = inject(Firestore)
  userIDs: any[] = [];
  unsubUsers;


  constructor(public dialog: MatDialog) {
    this.unsubUsers = this.subUser();
    //this.subUsers();
  }

  ngOnDestroy() {
    this.unsubUsers();
  }

  openUser(Id: string) {
    console.log(Id)
  }

  subUser(){
    const qry = query(collection(this.fireStore, "User"), limit(100))
    return onSnapshot(qry, (list) => {
      this.userIDs = [];
      list.forEach((element) => {
        this.userIDs.push(element.data())
      })
      console.log(this.userIDs)
    })
  }

  /*async subUsers() {
    const querySnapshot = await getDocs(collection(this.fireStore, "User"));
    querySnapshot.forEach((doc) => {
      this.userIDs.push(doc.id)
    })
    console.log(this.userIDs)
  }*/

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
