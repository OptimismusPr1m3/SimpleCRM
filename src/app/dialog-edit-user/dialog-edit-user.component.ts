import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../models/user.class';
import { provideNativeDateAdapter } from '@angular/material/core';
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

@Component({
  selector: 'app-dialog-edit-user',
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
    MatProgressSpinnerModule,
  ],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss',
})
export class DialogEditUserComponent {

newUserisSaved: boolean = false;
user: User | any;
userID: string | undefined | any;
birthDate: Date | undefined;
firestore: Firestore = inject(Firestore);

constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>){}

async saveUser() {
  this.newUserisSaved = true;
  const userIdRef = doc(this.firestore, "User", this.userID);
  await updateDoc(userIdRef, this.user.toJSON());
  this.newUserisSaved = false;
  this.dialogRef.close()
}
onNoClick() {
  this.dialogRef.close()
}


}
