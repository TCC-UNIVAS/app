import { Camera } from 'ionic-native';

export class ReportCaseCamera{
   
    contructor(){
    }

    
    takePicture(){
        Camera.getPicture({quality:50, destinationType: Camera.DestinationType.DATA_URL}).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            console.log(base64Image);
        }, (err) => {
            console.log(err);
        });
    }

}