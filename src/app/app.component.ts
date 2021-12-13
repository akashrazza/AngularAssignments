// import { Component } from '@angular/core';
import { Insurance } from './Insurance';
import { InsuranceService } from './insurance.service';
import {Component, Inject} from '@angular/core';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'selfMaterial';
  Insurance_data:Insurance[]=[]
  Insurance_Policy_No:number=1000 
  Policy_Holders_Name:string=""
  Policy_Amount:number=0
  Amout_for_EMI:number = 0
  Nominees_name:string=""
  displayed_columns = ["Insurance Policy No","Policy Holders Name","Policy Amount","Amout for EMI","Nominees name","Button"]
  
  // Add Insurance Dilogue box
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: {title:"Add"},
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!==undefined){
        var insurance_obj = new Insurance(result.Insurance_Policy_No,result.Policy_Holders_Name,result.Policy_Amount,result.Amout_for_EMI,result.Nominees_name);
        this.Add_data(insurance_obj);
      }
    });
  }

  //Edit Insurance Dilogue box
  EditDialog(ele:any): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: {title:"Edit",id:ele.id,Insurance_Policy_No:ele.Insurance_Policy_No,Policy_Holders_Name:ele.Policy_Holders_Name,Policy_Amount:ele.Policy_Amount,Amout_for_EMI:ele.Amout_for_EMI,Nominees_name:ele.Nominees_name}
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result!==undefined){
        var insurance_obj = new Insurance(result.Insurance_Policy_No,result.Policy_Holders_Name,result.Policy_Amount,result.Amout_for_EMI,result.Nominees_name);
        this.Edit_data(result.id,insurance_obj);
      }
    });
  }

  constructor(private restservice : InsuranceService,public dialog: MatDialog,private _snackBar: MatSnackBar){

  }

  //Popup event
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  //when component intialized
  ngOnInit(){
    this.read_data()
    this.Get_By_id(3);
  }
  
  //read data
  read_data(){
    this.restservice.Get_Insurance().subscribe(
      (data)=>{this.Insurance_data=data},
      (error)=>{console.log("the Error in reading message "+error)}
    )
  }
  
  //Add Data to Insurance
  Add_data(insurance_obj: Insurance){
    this.restservice.Post_Insurance(insurance_obj).subscribe(
      (data)=>{this.read_data();this.openSnackBar("Your Record Created Successfully","Close");},
      (error)=>{console.log("the error in adding "+ error );this.openSnackBar("Something Went Wrong","Close");}
    )
  }

  //Edit Insurance
  Edit_data(id:number|string,insurance_obj  : Insurance){
    this.restservice.Edit_Insurance(id,insurance_obj).subscribe(
      (data)=>{this.read_data();this.openSnackBar("Your Record Edited Successfully","Close");},
      (error)=>{console.log(error);this.openSnackBar("Something Went Wrong","Close");}
    )
  }
  
  //Delete Data Insurance
  Delete_data(deleteId:any){
    this.restservice.Delete_Insurance(deleteId).subscribe(
      (data)=>{this.read_data();this.openSnackBar("Your Record Deleted Successfully","Close")},
      (error)=>{console.log(error);this.openSnackBar("Something Went Wrong","Close");}
    )
  }

  //Get Insurance By ID
  Get_By_id(id:string|number){
    this.restservice.get_product_by_id(8).subscribe(
      (data)=>{console.log(data)},
      (err)=>{console.log(err)}
    )
  }
  
}

//Dilogue Component
@Component({
  selector: 'dialog-overview',
  templateUrl: 'dialog.html',
  styleUrls: ['./app.component.css']
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}