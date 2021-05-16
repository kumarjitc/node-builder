import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Validator, ValidatorFn } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

import { Constants } from '@commons/constants';
import { HttpService } from '@services/http.service';
import {
  IControlConfigs,
  IDropdown,
  IHttpServiceParams
} from '@commons/structures';
import { CredentialsComponent } from '@components/credentials/credentials.component';

const CONTROLS: IControlConfigs = {
  name: [null, [Validators.required]],
  branch: [null, [Validators.required]],
  buildScript: [null, [Validators.required]],
  targetFolder: [null, [Validators.required]],
  type: [null, [Validators.required]],
  _id: [null]
};

@Component({
  selector: 'app-configs-editor',
  templateUrl: './configs-editor.component.html',
  styleUrls: ['./configs-editor.component.css'],
  providers: [HttpService]
})
export class ConfigsEditorComponent implements OnInit, AfterViewInit {
  public types: IDropdown[] = Constants.TYPES;
  public uiForm: FormGroup;
  public queryParams: Record<string, string>;

  constructor(
    private route: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder,
    public http: HttpService<Record<string, string>>,
    public dialog: MatDialog
  ) {
    this.queryParams = {};
    this.route.queryParams.subscribe(params => {
      this.queryParams['id'] = params.id;
    });

    this.uiForm = this.formBuilder.group(CONTROLS);
  }

  public ngOnInit(): void { }

  public ngAfterViewInit(): void {
    if (this.queryParams && !this.queryParams.id) {
      return;
    }
    let params: IHttpServiceParams<Record<string, string>> = {
      url: Constants.CONFIG_URL + `/id/${this.queryParams.id}`
    };

    this.fetch(params);
  }

  public onSubmit(): void {
    if (!this.uiForm.get('targetFolder').value) {
      this.uiForm.get('targetFolder').setValue(this.uiForm.get('name').value);
    }

    let formData: Record<string, string> = this.uiForm.value;
    let params: IHttpServiceParams<Record<string, string>> = {
      url:
        Constants.CONFIG_URL +
        (formData['_id'] ? `/id/${formData['_id']}` : ''),
      formData: formData
    };

    delete formData['_id'];

    if (!this.uiForm.controls['_id'].value) {
      this.insert(params);
    } else {
      this.update(params);
    }
  }

  public onDeleteClick(): void {
    let id: string = this.uiForm.value['_id'];
    let params: IHttpServiceParams<Record<string, string>> = {
      url: Constants.CONFIG_URL + `/id/${id}`
    };

    this.http
      .doDelete(params)
      .then(data => {
        this.onCancelClick();
      })
      .catch(error => {
        console.error(error);
      });
  }

  public onRunClick(): void {
    switch (this.uiForm.get('type').value) {
      case 'pull':
        this.openDialog();
        break;
      case 'build':
        this.runBuild({});
        break;
    }
  }

  public onCancelClick(): void {
    this.router.navigate(['/configs/list'], {});
  }

  public onTypeChange(): void {
    switch (this.uiForm.get('type').value) {
      case 'pull':
        this.clearValidator('buildScript');
        this.clearValidator('targetFolder');
        this.addValidator('branch', Validators.required);
        break;
      case 'build':
        this.addValidator('buildScript', Validators.required);
        this.addValidator('targetFolder', Validators.required);
        this.clearValidator('branch');
        break;
    }
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CredentialsComponent, {
      width: '300px',
      data: { userName: '', password: '' }
    });

    dialogRef.afterClosed().subscribe(inputs => {
      if (inputs.username && inputs.password && this.uiForm.get('_id').value) {
        this.runBuild(inputs);
      }
    });
  }

  private fetch(params: IHttpServiceParams<Record<string, string>>): void {
    this.http
      .doGet(params)
      .then(data => {
        this.uiForm.patchValue(data);
        this.onTypeChange();
        this.markPristine();
      })
      .catch(error => {
        console.error(error);
      });
  }

  private insert(params: IHttpServiceParams<Record<string, string>>): void {
    this.http
      .doPost(params)
      .then(data => {
        this.uiForm.patchValue(data);
        this.markPristine();
      })
      .catch(error => {
        console.error(error);
      });
  }

  private update(params: IHttpServiceParams<Record<string, string>>): void {
    this.http
      .doPut(params)
      .then(data => {
        this.markPristine();
      })
      .catch(error => {
        console.error(error);
      });
  }

  private markPristine(): void {
    this.uiForm.markAsPristine();
  }

  private clearValidator(control: string): void {
    this.uiForm.get(control).clearValidators();
    this.uiForm.get(control).updateValueAndValidity();
  }

  private addValidator(control: string, validator: ValidatorFn): void {
    this.uiForm.get(control).setValidators(validator);
    this.uiForm.get(control).updateValueAndValidity();
  }

  private runBuild(inputs: Record<string, string>): void {
    let params: IHttpServiceParams<Record<string, string>> = {
      url: Constants.BUILD_URL + `/id/${this.uiForm.get('_id').value}`,
      formData: inputs
    };

    this.http
      .doPost(params)
      .then(data => {
        this.router.navigate(['build/execution/status'], {});
        this.markPristine();
      })
      .catch(error => {
        console.error(error);
      });
  }
}
