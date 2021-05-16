import { Router } from '@angular/router';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, AfterViewInit } from '@angular/core';

import { IWorkflow } from '@commons/structures';
import { HttpService } from '@services/http.service';
import { Constants } from '@commons/constants';

@Component({
  selector: 'app-workflow-list',
  templateUrl: './workflow-list.component.html',
  styleUrls: ['./workflow-list.component.css'],
  providers: [HttpService]
})
export class WorkflowListComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<IWorkflow>;
  public selection: SelectionModel<IWorkflow> = new SelectionModel<IWorkflow>(false, []);
  public data: Array<IWorkflow>;
  public selected: IWorkflow;

  constructor(
    public router: Router,
    public http: HttpService<IWorkflow>
  ) { }

  ngOnInit(): void {
    this.data = [];
    this.displayedColumns = ['select', 'name', 'description'];
  }

  public ngAfterViewInit(): void {
    this.http.doGet({
      url: Constants.WORKFLOW_URL
    }).then(data => {
      this.data = data;
    }).catch(error => {
      this.data = [];
    }).finally(() => {
      this.dataSource = new MatTableDataSource<IWorkflow>(this.data);
    });
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public checkboxLabel(row?: IWorkflow): void {
    /** @todo - Called Multiple Times Due TO CHange Detection */
    if (this.selection.isSelected(row)) {
      this.selected = row;
    } else if (this.selected && this.selected['_id'] === row['_id']) {
      this.selected = null;
    }
  }

  public onEditClick(): void {
    let params: Record<string, string> = {};

    if (this.selected) {
      params = {
        id: this.selected['_id'] || ''
      }
    }

    this.router.navigate(['/workflow/edit'], {
      queryParams: params
    });
  }

  public onScheduleClick(): void {
    alert('Coming Soon');
  }
}
