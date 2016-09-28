import { Injectable } from '@angular/core';
import { Camera } from 'ionic-native';

@Injectable()
export class ReportCaseCamera{
    private sourceType: any;
    
    constructor(){       
    }

    
    getPicture(data){
        console.log(data);
        var base64Image = null;
        Camera.getPicture({quality:50, destinationType: Camera.DestinationType.DATA_URL, sourceType: this.sourceType}).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            base64Image = 'data:image/jpeg;base64,' + imageData;
            //console.log(base64Image);
            data.picture = base64Image;
        }, (err) => {
            console.log(err);
            base64Image = null;
        });        
    }


    takePicture(data){
        this.sourceType = Camera.PictureSourceType.CAMERA;
        this.getPicture(data);
    }


    getFromGallery(data){
        this.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
        this.getPicture(data);
    }


    erasePicture(data){
        data.picture = 'img/icon_camera.jpg';
    }

    

}