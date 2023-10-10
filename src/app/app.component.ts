import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'web-app';

    items: MenuItem[] = [
        {
            label: 'Recipes',
            icon: 'pi-file',
            routerLink: '/recipes'
        }
    ]
}
