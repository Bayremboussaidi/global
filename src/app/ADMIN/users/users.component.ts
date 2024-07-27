import { Component, OnInit } from '@angular/core';
//import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
ngOnInit(): void {
  throw new Error('Method not implemented.');
}
selectedRow(_t18: any) {
throw new Error('Method not implemented.');
}

tableData = [
  { jobId: 42235, customerName: 'John Doe', amount: 350, paymentStatus: 'Pending' },
  { jobId: 42442, customerName: 'Jennifer Smith', amount: 220, paymentStatus: 'Pending' },
  { jobId: 42257, customerName: 'John Smith', amount: 341, paymentStatus: 'Pending' },
  { jobId: 42311, customerName: 'John Carpenter', amount: 115, paymentStatus: 'Pending' },
];
}
/*user: any;
closeSidenav() {
throw new Error('Method not implemented.');
}
prevPage() {
throw new Error('Method not implemented.');
}
nextPage() {
throw new Error('Method not implemented.');
}
  usersData: any;
  displayedColumns = [
    "firstName",
    "secondName",
    "mobile",
    "gender",
    "dob",
    "email",
    "hobbies",
    "createdAt",
    "email_Verified",
    "activated",
  ];
  pageIndex = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 15, 20, 25, 50];
  sideNavOpen = false;
  selectedRowIndex=-1;
totalPages: any;
 // user;

  //constructor(private service: UsersService) {}

  ngOnInit(): void {
    this.loadUserDetails(this.pageIndex, this.pageSize);
  }
  loadUserDetails(pageIndex: number, pageSize: number) {
    throw new Error('Method not implemented.');
  }
  //loadUserDetails(pageIndex, pageSize) {
    //this.service.getUsersByPagination(pageIndex, pageSize).subscribe((res) => {
     // this.usersData = res;
    //});
  }
 // handlePage(event) {
   // this.loadUserDetails(event.pageIndex, event.pageSize);
 // }

 /* closeSidenav() {
    this.selectedRowIndex = -1;
    this.sideNavOpen = false;
  }*/

 // selectedRow(row) {
    // console.log(row)
    // console.log(row._id);
    /*this.user=row.user;
    this.sideNavOpen = true;
    this.selectedRowIndex = row._id;
  }}
  

function closeSidenav() {
  throw new Error('Function not implemented.');
}

function selectedRow(row: any) {
  throw new Error('Function not implemented.');
} */



