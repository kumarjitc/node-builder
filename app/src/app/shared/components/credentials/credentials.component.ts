import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ICredentialsData, IControlConfigs } from '@commons/structures';

const CONTROLS: IControlConfigs = {
  username: [null, Validators.required],
  password: [null, Validators.required]
}

@Component({
  selector: 'app-credentials',
  templateUrl: './credentials.component.html',
  styleUrls: ['./credentials.component.css']
})
export class CredentialsComponent implements OnInit {
  public uiForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CredentialsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ICredentialsData
  ) {
    this.uiForm = this.formBuilder.group(CONTROLS);
  }

  public ngOnInit(): void {
  }
}
