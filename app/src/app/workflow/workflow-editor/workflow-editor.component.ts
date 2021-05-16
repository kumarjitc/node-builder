import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray, ValidatorFn, ValidationErrors, AbstractControl } from '@angular/forms';
import { Component, AfterViewInit } from '@angular/core';

import { IControlConfigs } from '@commons/structures';
import { IConfigList, IBuildStep, IHttpServiceParams } from '@commons/structures';
import { HttpService } from '@services/http.service';
import { Constants } from '@commons/constants';

const CONTROLS: IControlConfigs = {
  name: [null, [Validators.required]],
  description: [null],
  _id: [null]
};

const BUILD_STEP_CONTROL: IControlConfigs = {
  step: [null, [Validators.required]]
};

@Component({
  selector: 'app-workflow-editor',
  templateUrl: './workflow-editor.component.html',
  styleUrls: ['./workflow-editor.component.css'],
  providers: [HttpService]
})
export class WorkflowEditorComponent implements AfterViewInit {
  /*private BUILD_STEP_CONTROL: IControlConfigs = {
    step: [null, [Validators.required, this.validateDuplicateStepEntry]]
  };
  private BUILD_STEP_VALIDATOR: Array<any> = [Validators.required];*/

  public uiForm: FormGroup;
  public configs: Array<IConfigList>;
  public queryParams: Record<string, string>;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public router: Router,
    public http: HttpService<any>
  ) {
    this.queryParams = {};
    this.route.queryParams.subscribe(params => {
      this.queryParams['id'] = params.id;
    });

    this.uiForm = this.formBuilder.group(CONTROLS);

    this.uiForm.addControl('steps', this.formBuilder.array([this.formBuilder.group(BUILD_STEP_CONTROL)]));
  }

  ngAfterViewInit(): void {
    this.getBuildList();

    if (this.queryParams && !this.queryParams.id) {
      return;
    }

    let params: IHttpServiceParams<Record<string, string>> = {
      url: Constants.WORKFLOW_URL + `/id/${this.queryParams.id}`
    };

    this.fetch(params);
  }

  public get steps() {
    return this.uiForm.get('steps') as FormArray;
  }

  public addBuildStep(): void {
    this.steps.push(this.formBuilder.group(BUILD_STEP_CONTROL));
  }

  public deleteBuildStep(idx: number): void {
    this.steps.removeAt(idx);
  }

  public onSubmit(): void {
    if (this.uiForm.invalid || !this.validateBuildSteps()) {
      return;
    }

    let formData: Record<string, string> = this.uiForm.value;
    let params: IHttpServiceParams<Record<string, string>> = {
      url:
        Constants.WORKFLOW_URL +
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
      url: Constants.WORKFLOW_URL + `/id/${id}`
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

  public onCancelClick() {
    this.router.navigate(['/workflow/list'], {});
  }

  private getBuildList(): void {
    this.http.doGet({
      url: Constants.CONFIG_URL
    }).then(data => {
      this.configs = data;
    }).catch(error => {
      this.configs = [];
    });
  }

  private validateBuildSteps(): boolean {
    let steps: Array<any> = this.uiForm.controls['steps'].value.sort();

    const unique: Set<string> = new Set(steps.map(item => item.step));

    this.uiForm.get('steps').setErrors(steps.length !== unique.size ? { error: null } : null);

    return steps.length === unique.size;
  }

  private fetch(params: IHttpServiceParams<Record<string, string>>): void {
    this.http
      .doGet(params)
      .then(data => {
        this.uiForm.patchValue(data);
        this.patchSteps(data.steps);
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
        this.uiForm.patchValue(data);
        this.markPristine();
      })
      .catch(error => {
        console.error(error);
      });
  }

  private patchSteps(steps: Array<IBuildStep>): void {
    steps.forEach((_step, index) => {
      if (index) {
        this.addBuildStep();
      }
    });
    this.uiForm.get('steps').patchValue(steps);
  }

  private markPristine(): void {
    this.uiForm.markAsPristine();
  }
}
