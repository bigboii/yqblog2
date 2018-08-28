import { Component, OnInit } from '@angular/core';

//TODO: Add animation for background images
//https://coryrylan.com/blog/introduction-to-angular-router-animations

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

  fillerNav = Array.from({length: 50}, (_, i) => `Nav Item ${i + 1}`);

  languages = ["Java", "C", "C++", "JavaScript", "TypeScript"];
  frameworks = ["Angular 6", "Spring", "Node.js"];
  tools=["Bash", "Git", "NPM"];
  databases=["SQL", "Mongo", "Firebase"];


  fillerContent = Array.from({length: 50}, () =>
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
         labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
         laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
         voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
         cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.`);
  constructor() { }

  ngOnInit() {
  }

}
