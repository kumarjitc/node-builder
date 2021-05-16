import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  public onButtonClick(type: string): void {
    switch (type) {
      case 'list':
        this.router.navigate(['/configs/list'], {});
        break;
      case 'execution':
        this.router.navigate(['/build/execution/status'], {});
        break;
      case 'store':
        this.router.navigate(['/store'], {});
        break;
      case 'workflow':
        this.router.navigate(['/workflow/list'], {});
        break;
      case 'workflow-status':
        this.router.navigate(['/build/workflow/status'], {});
        break;
    }
  }
}
