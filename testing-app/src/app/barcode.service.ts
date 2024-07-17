import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class BarcodeService {
  private baseUrl = "https://bwipjs-api.metafloor.com/?bcid=code128&scaleX=3&scaleY=1&text="

  constructor(private http: HttpClient) { }

  generateBarcode = (text: string) => {
    if (!text) return
    
    return this.http.get(`${this.baseUrl}${text}`)
  }
}
