import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import QRCodeStyling, { QRCode } from 'qr-code-styling';
import QRCodeStyling, { Extension } from 'qr-code-styling';

import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { QrCode } from './../../interface/qr-code';

@Component({
  selector: 'app-qr-code-generator',
  templateUrl: './qr-code-generator.component.html',
  styleUrls: ['./qr-code-generator.component.scss'],
})
export class QrCodeGeneratorComponent implements OnInit {
  public data: any = 'https://www.alphaa.io/assets/img/digital-2.png';
  public image: string = '../../../assets/img/alpha.svg'
  public extension: string = '';
  public qrCode: any = null;
  public qrcode = {} as QrCode;
  public GetQrCode: FormGroup;

  @ViewChild('canvas', { static: true }) canvas!: ElementRef;

  constructor(
    private apiService: ApiService,
    private formBuilder: FormBuilder
  ) {
    this.getQrCodes();

    this.GetQrCode = this.formBuilder.group({ url: '', image: this.image });
  }

  ngOnInit(): void {
    this.qrCode = new QRCodeStyling({
        width: 300,
        height: 300,
        type: 'svg',
        data: this.data,
        image: '../../../assets/img/alpha.svg',
        margin: 10,
        qrOptions: {
          typeNumber: 0,
          mode: 'Byte',
          errorCorrectionLevel: 'Q'
        },
        imageOptions: {
          hideBackgroundDots: true,
          imageSize: 0.6,
          margin: 20,
          crossOrigin: 'anonymous',
        },
        dotsOptions: {
          color: '#252dff',
          // gradient: {
          //   type: 'linear', // 'radial'
          //   rotation: 0,
          //   colorStops: [{ offset: 0, color: '#8688B2' }, { offset: 1, color: '#77779C' }]
          // },
          type: 'rounded'
        },
        backgroundOptions: {
          color: '#e9ebee',
          // gradient: {
          //   type: 'linear', // 'radial'
          //   rotation: 0,
          //   colorStops: [{ offset: 0, color: '#ededff' }, { offset: 1, color: '#e6e7ff' }]
          // },
        },
        cornersSquareOptions: {
          color: '#252dff',
          type: 'extra-rounded',
          // gradient: {
          //   type: 'linear', // 'radial'
          //   rotation: 180,
          //   colorStops: [{ offset: 0, color: '#25456e' }, { offset: 1, color: '#4267b2' }]
          // },
        },
        cornersDotOptions: {
          color: '#252dff',
          type: 'dot',
          // gradient: {
          //   type: 'linear', // 'radial'
          //   rotation: 180,
          //   colorStops: [{ offset: 0, color: '#00266e' }, { offset: 1, color: '#4060b3' }]
          // },
        }
    });

    this.qrCode.append(this.canvas.nativeElement);
  }

  onKey(event: any): void {
    this.data = event.target.value;
    this.qrCode.update({
      data: this.data
    });
    console.log(this.data)
  }

  onChange(event: any): void {
    this.extension = event.target.value;
  }

  getQrCodes(): void {
    this.apiService.getAll().subscribe((QRCode) => console.log(QRCode));
  }

  postQrCodes(): void {

      this.qrCode.download({ extension: this.extension as Extension });

    // this.qrCode.download({ extension: this.extension });
    this.apiService.postQr(this.GetQrCode.value).subscribe((res) => res);
    console.log(this.GetQrCode.value);
  }
}
