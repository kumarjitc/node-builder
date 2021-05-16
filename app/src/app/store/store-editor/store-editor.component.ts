import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { IControlConfigs, IStoreRecord } from '@commons/structures';

const CONTROLS: IControlConfigs = {
  name: [null, Validators.required],
  value: [null, Validators.required],
  _id: [null]
}

@Component({
  selector: 'app-store-editor',
  templateUrl: './store-editor.component.html',
  styleUrls: ['./store-editor.component.css']
})
export class StoreEditorComponent implements OnInit {
  public uiForm: FormGroup;
  public isSecret: FormControl;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<StoreEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IStoreRecord
  ) {
    this.uiForm = this.formBuilder.group(CONTROLS);
    this.isSecret = new FormControl(false);
    this.uiForm.addControl('isSecret', this.isSecret);
  }

  ngOnInit(): void {
    console.log('DATa ', this.data);
    this.uiForm.patchValue(this.data);
  }

  public onSave(): void {
    if (this.uiForm.valid) {
      this.dialogRef.close(this.uiForm.value);
    }
  }

  public onDelete(): void {
    this.dialogRef.close({
      ...this.uiForm.value,
      isDelete: true
    });
  }

  public onClose(): void {
    this.dialogRef.close({});
  }
}
