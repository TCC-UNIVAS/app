import { AlertController } from 'ionic-angular';
import { Camera } from 'ionic-native';


export class ReportCaseCamera{
    sourceType: any;

    // constructor(private alertCtrl: AlertController){
    //     this.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
    // }

    constructor( public alertCtrl: AlertController ){
        //this.alertCtrl = alertCtrl;
    }

    
    openCamera(data){
        console.log(data);
        var base64Image = null;
        Camera.getPicture({quality:50, destinationType: Camera.DestinationType.DATA_URL, sourceType: this.sourceType}).then((imageData) => {
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

     takePicture(data){
        let alert = this.alertCtrl.create({
            title: 'selecione',
            buttons: [{
                text: 'Câmera',
                handler: () => {
                    this.sourceType =  Camera.PictureSourceType.CAMERA;
                    this.openCamera(data);
                }
            },{
                text: 'Câmera',
                handler: () => {
                    this.sourceType = Camera.PictureSourceType.PHOTOLIBRARY;
                    this.openCamera(data);
                }
            }
            ]
        });
        alert.present();        
    }

}