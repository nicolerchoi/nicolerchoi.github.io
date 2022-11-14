import { ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe, RecipeDetail, RecipesService } from '../../services/recipes.service';
import { EMPTY, Observable, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
    selector: 'recipes-list',
    templateUrl: './recipes-list.component.html',
    styleUrls: ['./recipes-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipesListComponent implements OnInit, AfterViewInit {

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;

    recipes: Recipe[] = [];
    dataSource: MatTableDataSource<Recipe>;

    filters: string[] = [];

    displayedColumns: string[] = ['title', 'hashtags'];

    constructor(
        private recipesService: RecipesService,
        private route: ActivatedRoute
    ) {
        this.dataSource = new MatTableDataSource(this.recipes);
    }

    ngOnInit(): void {
        this.recipesService.getAllRecipes().subscribe(
            result => {
                this.recipes = result;
                this.dataSource.data = result;
            },
            error => {
                console.log('Cannot get recipe list', error)
            }
        )

        this.filters = this.route.snapshot.queryParams['hashtag'];
        console.log(this.filters);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
        console.log(this.dataSource)
    
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onClickHashtag(hashtag: string): void {
        this.filters.push(hashtag);
    }
}
