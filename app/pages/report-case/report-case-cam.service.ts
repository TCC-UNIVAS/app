import { Camera } from 'ionic-native';

export class ReportCaseCamera{
   
    contructor(){
    }

    
    takePicture(data){
        console.log(data);
        var base64Image = null;
        Camera.getPicture({quality:50, destinationType: Camera.DestinationType.DATA_URL}).then((imageData) => {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            base64Image = 'data:image/jpeg;base64,' + imageData;
            console.log(base64Image);
            data.picture = base64Image;
        }, (err) => {
            console.log(err);
            base64Image = null;
        });
        
    }

}