import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/GLBSdataservice';
import { HelpCategory } from 'src/app/shared/helpCategory';

@Component({
  selector: 'app-help-category',
  templateUrl: './help-category.component.html',
  styleUrls: ['./help-category.component.scss']
})
export class HelpCategoryComponent implements AfterViewInit, OnInit {

  categories: HelpCategory[]=[];
  displayedColumns: string[] = ['Name', 'Description','Update', 'Delete'];
  dataSource = new MatTableDataSource<HelpCategory>();
  constructor(private dataService: DataService, private router: Router) { }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  
  ngOnInit(): void {
    /**
     * This code duplication is not necessary!
     * 
     * Consider using it only once!!
     */
    this.dataService.getAllHelpCategories()
    .subscribe((category: any) => {
      this.dataSource.data = category
    });
    this.getCategories()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getCategories() {
    this.dataService.getAllHelpCategories().subscribe(result => {
      let categoryList: any[] = result
      categoryList.forEach((element) => {
        this.categories.push(element)
      });
    })
  }

  deleteCategory(categoryID: Number) {

    if (confirm('Are you sure you want to delete this help category?')) {
      this.dataService.deleteHelpCategory(categoryID).subscribe(result => {
        window.location.reload();
        this.getCategories();
      })
    }

  }


  editCategory(categoryID: Number) {
    this.router.navigate(['/edit-category', categoryID]);

  }
}

