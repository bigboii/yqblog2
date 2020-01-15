import { Directive, Output, Input, EventEmitter, HostBinding, HostListener} from "@angular/core";


/** 
 * - Adds visual indicator to let users know that a file is being hovered on the drop zone correct (?)
 * - on drop event, directive propagates file
 * 
 * The event onDrop event fires only when onDragOver has preventDefault() and stopPropagation() methods run on event
 * 
 * To define a valid drop zone, 2 event handlers must be implemented:
 * - 'dragover'
 * - 'drop'
 * 
 * Further note, one additional event handler, 'dragleave', is implemented to give users a better visual drag n drop experience
 * 
 * note each handler calls preventDefault() to prevent additional event processing for this event.
 
    <div class="uploadFileContainer" (drop)="fileInput.onDrop()" (dragover)="onDragOver" >
        <input hidden type="file" #fileInput (change)="uploadFile($event.target.files)">
    </div>


    Extra Reading:
        https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API#Define_a_drop_zone
        https://developer.mozilla.org/en-US/docs/Web/API/File

 drop child elements into other lements:
    https://stackoverflow.com/questions/42987244/how-to-get-files-from-angular-2-ondrop-event
*/

@Directive ({
    selector: '[dragDrop]'
})
export class DragDropDirective {
    @Output() onFileDropped = new EventEmitter<any>();        //(onFileDropped)="uploadFile($event)"
                                                              //how to send file to another component?
    
    @HostBinding('style.background-color') private background = '#f5fcff';
    @HostBinding('style.opacity') private opacity = '1';
    
    //Dragover listener
    @HostListener('dragover', ['$event']) onDragOver(event) {
        event.preventDefault();
        event.stopPropagation();
        this.background = '#9ecbec';
        this.opacity = "0.8";
    };

    //Dragleave listener
    @HostListener('dragleave', ['$event']) onDragLeave(event) {
        event.preventDefault();
        event.stopPropagation();
        this.background = '#f5fcff';
        this.background = '1';
    }

    //Drop listener
    @HostListener('drop', ['$event']) public ondrop(event) {
        event.preventDefault();
        event.stopPropagation();
        this.background = "#f5fcff";
        this.opacity = '1';
        let files = event.dataTransfer.files;

        if(files.length > 0) {
            this.onFileDropped.emit(files);
        }
    }
}