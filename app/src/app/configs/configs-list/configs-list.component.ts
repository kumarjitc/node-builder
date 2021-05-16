import { HttpService } from './../../shared/services/http.service';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

import { Constants } from '@commons/constants';
import { IConfigList } from '../../shared/commons/structures';

@Component({
  selector: 'app-configs-list',
  templateUrl: './configs-list.component.html',
  styleUrls: ['./configs-list.component.css'],
  providers: [HttpService]
})
export class ConfigsListComponent implements OnInit, AfterViewInit {
  public displayedColumns: string[];
  public dataSource: MatTableDataSource<IConfigList>;
  public selection: SelectionModel<IConfigList> = new SelectionModel<IConfigList>(false, []);
  public data: Array<IConfigList>;
  public selected: IConfigList;

  constructor(
    public router: Router,
    public http: HttpService<IConfigList>
  ) {
  }

  ngOnInit(): void {
    this.displayedColumns = ['select', 'name', 'branch', 'type', 'isRunning'];
    this.data = [];
  }

  public ngAfterViewInit(): void {
    this.http.doGet({
      url: Constants.CONFIG_URL
    }).then(data => {
      this.data = data;
    }).catch(error => {
      this.data = [];
    }).finally(() => {
      this.dataSource = new MatTableDataSource<IConfigList>(this.data);
    });
  }

  public isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  public checkboxLabel(row?: IConfigList): void {
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

    this.router.navigate(['/configs/edit'], {
      queryParams: params
    });
  }

  public onScheduleClick(): void {
    let id: string = '';

    if (!this.selected || !this.selected['_id']) {
      return;
    }

    id = this.selected['_id'];

    this.http.doGet({
      url: Constants.BUILD_URL + '/id/' + id
    }).then(data => {
      console.log(data);
    }).catch(error => {
      console.log(error);
    });
  }
}
