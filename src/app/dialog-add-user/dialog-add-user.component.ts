import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
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
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    CommonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
})
export class DialogAddUserComponent {
  user: User = new User();
  birthDate: Date | undefined;
  firestore: Firestore = inject(Firestore);
  newUserisSaved: boolean = false;

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) {}

  onNoClick() {}
  async saveUser() {
    this.newUserisSaved = true;
    this.user.birthDate = this.birthDate?.getTime();
    console.log('Current User is:', this.user);
    this.addNewUser();
  }

  async addNewUser() {
    const docRef = await addDoc(this.getUserRef(), this.user.toJSON())
      .catch((err) => {
        console.error(err);
      })
      .then((docRef) => {
        console.log('Document written with ID: ', docRef?.id);
        const userRef = doc(this.firestore, 'User', `${docRef?.id}`);
        updateDoc(userRef, {
          userID: docRef?.id,
        });
        this.newUserisSaved = false;
        this.dialogRef.close();
      });
  }

  getUserRef() {
    let userRef = collection(this.firestore, 'User');
    return userRef;
  }
}
