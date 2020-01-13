import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { Board } from 'src/app/models/board.model';
import { Column } from 'src/app/models/column.model';
import { Task } from 'src/app/models/tasks.model';

@Component({
  selector: 'app-main-view',
  templateUrl: './main-view.component.html',
  styleUrls: ['./main-view.component.scss']
})
export class MainViewComponent implements OnInit {
  item:string;
  
  constructor() { }
  displayAddCard = false;
  displayupdateCard=false;
  
  board: Board = new Board('Test Board', [
    new Column('Ideas', [
      new Task("Some random idea", false),
      new Task("Walk a dog", false),
      new Task("How are you?", false),
      new Task("Iam good", false)
      
    ]),
    new Column('Research', [
      new Task("Lorem ipsum", false),
      new Task("foo", false),
      
    ]),
    new Column('Todo', [
      new Task('Get to work', false),
      new Task('Pick up groceries', false),
      
    ]),
    new Column('Done', [
      new Task('Get up', false),
      new Task('Brush teeth', false),
      new Task('Take a shower', false),
      
    ])
  ]);

  //board: Board = new Board("Christas Board", []);
  
  

  ngOnInit() {
    // var column: Column = new Column("Ideas", []);
    // var task: Task = new Task("Task 1", false);
    // column.tasks.push(task)
    
    // this.board.columns.push(column)
    
  }
  toggleDisplayAddCard() {
    this.displayAddCard = ! this.displayAddCard;
  }
  toggleDisplayupdateCard(value: Task) {
    value.edit = ! value.edit;
  }

  onEnter(value: string) {
    if(value.length!=0){
    console.log(value);
    var len=this.board.columns.length;
    for(var i=0;i<len;i++){
      if(this.board.columns[i].name=='Ideas'){
        this.board.columns[i].tasks.push(new Task(value, false));
      }

    }
  }
  }
  
  onEnterUpdate(value: string, task: Task) {
    if(value.length!=0){
    task.name = value
    }
  }

  alertFunction(value:string,title:string){
    var txt;
    if (confirm("Delete "+value)) {
    this.deletecard(value,title);
  } else {
    txt = "You pressed Cancel!";
  }
  }
  deletecard(value:string, title:string) {
    console.log(value);
    console.log(title);
    var len=this.board.columns.length;
    for(var i=0;i<len;i++){
      if(this.board.columns[i].name==title){
        break;
      }
    }
    var len1=this.board.columns[i].tasks.length;
    for(var j=0;j<len1;j++){
      if(this.board.columns[i].tasks[j].name==value){
        this.board.columns[i].tasks.splice(j, 1);
        break;
      }
    }
  
  }

  
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
    }
  }
}
