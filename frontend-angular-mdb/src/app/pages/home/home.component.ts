import {Component, OnInit} from '@angular/core';
import {ImagesService} from '../../core/services/images.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AwsService} from '../../core/services/aws.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  validationForm: FormGroup;
  linkInputForm: string;
  countInputForm: string;
  private results: any [] = [];

  constructor(public fb: FormBuilder, private awsService: AwsService, private imageService: ImagesService) {
    this.validationForm = fb.group({
      linkFormControl: [null, Validators.required],
      countFormControl: [null, Validators.required],
    });
    this.linkInputForm = 'https://www.';
    this.countInputForm = '0';
  }

  get linkForm() {
    return this.validationForm.get('linkFormControl');
  }

  get countForm() {
    return this.validationForm.get('countFormControl');
  }

  ngOnInit() {
  }

  submitForm(validationForm: FormGroup) {
    console.log('validationForm');
    console.log(validationForm.getRawValue());
    console.log(validationForm.getRawValue().linkFormControl);
    console.log(validationForm.getRawValue().countFormControl);

    const formData = new FormData();
    formData.append('url', validationForm.getRawValue().linkFormControl);
    formData.append('count', validationForm.getRawValue().countFormControl);
    this.awsService.downloadImagesFromSite(formData).subscribe(data => {
      console.log('data return aws');
      console.log(data);
      this.imageService.sendDirToAnalise(data).subscribe(data2 => {
        console.log('data return aws');
        console.log(data2);
        //const results = data2;
        for (let i = 0; i <= data2.length; i++) {
          console.log(data2[i])
          if (data2[i] !== undefined && data2[i].key != null ) {
            this.results.push(data2[i]);
            this.awsService.block(validationForm.getRawValue().linkFormControl).subscribe( data3 => {
              console.log('Block')
              console.log(data3);
            });
          }
        }

      });
    });

  }
}
