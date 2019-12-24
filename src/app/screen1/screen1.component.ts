import { Component, OnInit } from '@angular/core';
import { InvoiceService } from '../services/invoice.service';
import { Invoice } from '../models/invoice.model';

import { Router } from '@angular/router';

@Component({
  selector: 'app-screen1',
  templateUrl: './screen1.component.html',
  styleUrls: ['./screen1.component.scss']
})
export class Screen1Component implements OnInit {


  public invoice: Invoice;
  public invoices: Invoice[];
  public forecast: Array<any>;
  public citydata;


  constructor(
    private _invoiceService: InvoiceService,

    private _router: Router,
  ) {
    this.invoice = new Invoice(null, null, null, null)
    this.forecast= [];
    this.citydata = {
      city:{
        name:'',
        country:''
      }
    };

  }
  onSubmit() {
    this._invoiceService.addInvoice(this.invoice).subscribe(
      response => {
        if (!response.invoice) {
          console.log('No Hay Respuesta');
        } else {
          console.log('Guardado Correctamente');
          console.log(response)
          this._router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this._router.navigate(['']);
          });



        }
      }

    );

  }
  getLocation(): void {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude;
        const latitude = position.coords.latitude;
        console.log(longitude + ' ' + latitude);
        this._invoiceService.getForecast(latitude, longitude).subscribe(
          response => {
            this.citydata = response;
            var j = 0;
            for (var i = 0; i < 39; i += 8) {

              this.forecast[j] = response.list[i];
              j++;

            }
            console.log(this.forecast);

          },
          err => {
            console.log(err);

          }

        );
      });
    } else {
      console.log("No support for geolocation")
    }
  }


  netChange(value) {
    this.invoice.net = value;
  }
  onTaxChange(value) {
    if (this.invoice.net != 0) {
      var newtax = (value / 100) + 1;
      var neto = this.invoice.net;

      this.invoice.total = neto * newtax;

    } else {
      this.invoice.tax = 0.0
    }
  }

  ngOnInit() {
    this.getInvoices();
    this.getLocation();
  }
  deleteInvoice(invoice_id) {
    this._invoiceService.deleteInvoice(invoice_id).subscribe(
      response => {
        if (!response.invoice) {
          console.log('No Hay Respuesta');
        } else {
          this._router.navigateByUrl('/RefreshComponent', { skipLocationChange: true }).then(() => {
            this._router.navigate(['']);
          });


        }

      }, err => {
        console.log(err);

      }
    )
  }

  getInvoices() {

    this._invoiceService.getInvoices().subscribe(
      response => {

        if (!response.invoices) {
          console.log('entro aqui')

        } else {
          this.invoices = response.invoices;
        }

      },
      error => {
        var errorMessage = <any>error;
        if (errorMessage != null) {
          var body = JSON.parse(error._body);
          console.log(error);
        }
      }


    );


  }

}
