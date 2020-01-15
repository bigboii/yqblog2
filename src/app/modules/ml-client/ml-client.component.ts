import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

/**
 * TODO: propagate drag drop data into text area
*/

@Component({
  selector: 'app-ml-client',
  templateUrl: './ml-client.component.html',
  styleUrls: ['./ml-client.component.scss']
})
export class MLClientComponent implements OnInit {

  public classifiers: any = ["Naive Bayes", "Least Square Loss", "Hinge Loss", "Logistic Regression", "CART Decision Tree"];

  public trainingLabelInputForm = new FormControl('', [Validators.required]);
  public dataSetInputForm = new FormControl('', [Validators.required] );

  public files: any = [];
  public trainingLabelName: string;
  public dataSetName: string;
  public w;                           //
  public distanceToPlaneOfOrigin;     //abs(w0/||w||)
  public predictions: any = ["waiting", "for" , "predictions"];       

  public reader;

  constructor() { }
  
  ngOnInit() {
    this.reader = new FileReader();
  }

  uploadFile(files) {
    for(let index=0; index < files.length; index++) {
      // const element = files[index];
      // this.files.push(element.name);

      let inputType = "";
      console.log(files[index].name);
      if(files[index].name.endsWith(".train.txt")) {
        inputType = "training";
        this.trainingLabelName = files[index].name;
      }
      else if(files[index].name.endsWith(".data.txt")) {
        inputType="data";
        this.dataSetName = files[index].name;
      }
      else {
        console.log("[mlclient] input type is neither .train nor .data");
      }

      /*
        File Reader Closure.

        this.reader.onload is assigned a self invoking function, which only runs once
        The advantages of this is that reader on load can access the parent functions variable

        Closures are frequently used in JavaScript for object data privacy, in event handlers and callback functions, and in partial applications, currying, and other functional programming patterns.
      */
      this.reader.onload = (function(file, inputType, dataForm, trainingForm) {
        console.log("inputType: " + inputType)
        console.dir(inputType);
        console.log("fileName: " + file.name);
        
        return function(e) {
          if(inputType == "data") {
            // this.dataSetInputForm.setValue(e.target.result);   //doesn't work; this.dataSetInputForm is not visible in this scope(? why?)
            dataForm.setValue(e.target.result);             //works
          }
          else if(inputType == "training") {
            // this.trainingLabelInputForm.setValue(e.target.result);  //doesn't work; this.trainingLabelInputForm is not visible in this scope(? why?)
            trainingForm.setValue(e.target.result);              //works
          }
        }
      })(files[index], inputType, this.dataSetInputForm, this.trainingLabelInputForm); 

      this.reader.readAsText(files[index]);
    }
  }

  deleteTrainingLabel() {
    this.trainingLabelName = undefined;
    this.trainingLabelInputForm.setValue("");
  }

  deleteDataSet() {
    this.dataSetName = undefined;
    this.dataSetInputForm.setValue("");
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }
}
