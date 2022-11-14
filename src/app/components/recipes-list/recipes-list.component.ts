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

    hashtags: string[] = [];

    displayedColumns: string[] = ['title', 'hashtags'];

    constructor(
        private recipesService: RecipesService,
        private route: ActivatedRoute
    ) {
        this.dataSource = new MatTableDataSource(this.recipes);
    }

    ngOnInit(): void {
        const queryHashtag = this.route.snapshot.queryParams['hashtag'];
        this.hashtags = queryHashtag ? [queryHashtag] : [];

        this.recipesService.getAllRecipes().subscribe(
            result => {
                this.recipes = result;
                this.dataSource.data = result;
                this.dataSource.data = this.filteredDataByHashtags();
            },
            error => {
                console.log('Cannot get recipe list', error)
            }
        )
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    onRemoveHashtagFilter(hashtag: string): void {
        const index = this.hashtags.indexOf(hashtag);

        if (index >= 0) {
            this.hashtags.splice(index, 1);
            this.dataSource.data = this.filteredDataByHashtags();
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    onClickHashtag(hashtag: string): void {
        if (!this.hashtags.includes(hashtag)) {
            this.hashtags.push(hashtag);
            this.dataSource.data = this.filteredDataByHashtags();
        }
    }

    filteredDataByHashtags(): Recipe[] {
        return this.hashtags.length
            ? this.recipes.filter(recipe => this.hashtags.every(h => recipe.hashtags.includes(h)))
            : this.recipes;
    }
}
