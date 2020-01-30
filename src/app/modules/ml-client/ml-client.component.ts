import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http'
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

/**
 * TODO: propagate drag drop data into text area
*/

interface MLRequest {
  training: any,
  data: any,
  classifier: string
}

interface MLResponse {
  data: string;
}

// interface UCIDataSet {

// }

const headers = new HttpHeaders()
    .set("Content-Type", "application/json");

@Component({
  selector: 'app-ml-client',
  templateUrl: './ml-client.component.html',
  styleUrls: ['./ml-client.component.scss']
})
export class MLClientComponent implements OnInit {

  public classifiers: any = [
    {"viewValue": "Naive Bayes", "value":"naive_bayes"}, 
    {"viewValue":"Least Square Loss", "value":"least_square_loss"}, 
    {"viewValue":"Hinge Loss", "value":"hinge_loss"}, 
    {"viewValue":"Logistic Regression", "value":"logistic_discrimination"}
    // {"value":"CART Decision Tree", "viewValue":""}
  ];

  public UCIDataSets: any = [
    {
      "viewValue": "Breast Cancer", 
      "value":"breast_cancer", 
      "description": "Diagnostic Wisconsin Breast Cancer Database", 
      "link":"https://archive.ics.uci.edu/ml/datasets/Breast+Cancer+Wisconsin+(Diagnostic)",
      "attribute": 'a) radius (mean of distances from center to points on the perimeter)\
      b) texture (standard deviation of gray-scale values)\
      c) perimeter\
      d) area\
      e) smoothness (local variation in radius lengths)\
      f) compactness (perimeter^2 / area - 1.0)\
      g) concavity (severity of concave portions of the contour)\
      h) concave points (number of concave portions of the contour)\
      i) symmetry\
      j) fractal dimension ("coastline approximation" - 1)'
    }, 
    {
      "viewValue":"Climate Simulation", 
      "value":"climate_simulation",
      "description":"Given Latin hypercube samples of 18 climate model input parameter values, predict climate model simulation crashes and determine the parameter value combinations that cause the failures", 
      "link":"https://archive.ics.uci.edu/ml/datasets/climate+model+simulation+crashes",
      "attribute": "Column 1: Latin hypercube study ID (study 1 to study 3)\
      Column 2: simulation ID (run 1 to run 180)\
      Columns 3-20: values of 18 climate model parameters scaled in the interval [0, 1]\
      Column 21: simulation outcome (0 = failure, 1 = success)"
    }, 
    {
      "viewValue":"Ionosphere", 
      "value":"ionosphere",
      "description": "Classification of radar returns from the ionosphere", 
      "link":"https://archive.ics.uci.edu/ml/datasets/ionosphere",
      "attribute":'Column 1 ~ 34 are continuous\
      The 35th attribute is either "good" or "bad" according to the definition summarized above. This is a binary classification task.'
    }
  ]

  public trainingSetInputForm = new FormControl('', [Validators.required]);
  public dataSetInputForm = new FormControl('', [Validators.required] );

  public files: any = [];
  public trainingSetName: string;
  public dataSetName: string;
  public w;                           //
  public distanceToPlaneOfOrigin;     //abs(w0/||w||)
  public predictions: any = ["waiting", "for" , "predictions"];       
  public currClassifier: any;
  public currUciDataset: any = {};

  public reader;

  constructor(private _snackBar: MatSnackBar,
              private http: HttpClient) { 
    
  }
  
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
        this.trainingSetName = files[index].name;
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
            trainingForm.setValue(e.target.result);              //works
          }
        }
      })(files[index], inputType, this.dataSetInputForm, this.trainingSetInputForm); 

      this.reader.readAsText(files[index]);
    }
  }

  deleteTrainingSet() {
    this.trainingSetName = undefined;
    this.trainingSetInputForm.setValue("");
  }

  deleteDataSet() {
    this.dataSetName = undefined;
    this.dataSetInputForm.setValue("");
  }

  deleteAttachment(index) {
    this.files.splice(index, 1);
  }


  /*
    Send training and data set to backend for processing
  */
  generatePredictions() {


    let mlRequest = {
      training: this.trainingSetInputForm.value,
      data: this.dataSetInputForm.value,
      classifier: this.currClassifier
    }

    console.log("mlRequest: below");
    console.dir(mlRequest);

    this.dataSetInputForm.get("")
    this.trainingSetInputForm.get("");

    let output = this.http.post<MLRequest>("http://localhost:8080/ml/", mlRequest, {headers}).subscribe(
      (data) => {
        console.log("Processing Classifier");
        console.log(data);
        this.testValue=data;
      },
      (err: HttpErrorResponse) => {
          console.log("err: " + err);
          console.dir(err);
          if (err.error instanceof Error) {
              console.log('Client-side error occured.');
          } else {
              console.log('Server-side error occured.');
          }
      }
    );

    return output;
  }

  testValue: any = {"data":[]};
  
  testConnectionWithServer() {
    this.http.get<MLResponse>("http://localhost:8080/ml/test", {headers}).subscribe((data) => {this.testValue = data; console.log("[apdjhfoi] data: " + data); console.dir(data);});
    console.log("testValue from backend: " + this.testValue);  //TODO this.testValue is not being applied
    console.dir(this.testValue);
  }

  // testConnectionWithServer() {
  //   this.http.post<MLRequest>("http://localhost:8080/ml/test", {headers}).subscribe((data) => {this.testValue = data; console.log("[apdjhfoi] data: " + data); console.dir(data);});
  // }

}
