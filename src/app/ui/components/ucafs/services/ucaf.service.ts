import { Injectable } from '@angular/core';
import { ResponseModel } from 'src/app/common/models/response.model';
import { CryptoService } from 'src/app/common/services/crypto.service';
import { GenericHttpService } from 'src/app/common/services/generic-http.service';
import { LoginReponseModel } from '../../auth/models/login-response.model';
import { UcafModel } from '../models/ucaf.model';
import { MessageResponseModel } from 'src/app/common/models/message-response.model';
import { RemoveByIdModel } from 'src/app/common/models/remove-by-id.model';

@Injectable({
  providedIn: 'root'
})
export class UcafService {

  loginResponse: LoginReponseModel = new LoginReponseModel();
  constructor(
    private _crypto: CryptoService,
    private _http: GenericHttpService
  ){
    let loginResponseString = _crypto.decrypto(localStorage.getItem("accessToken").toString());    
    this.loginResponse = JSON.parse(loginResponseString);
  }

  getAll(callBack: (res:ResponseModel<UcafModel[]>)=> void){    
    let model = {companyId:this.loginResponse.company.companyId};
    this._http.post<ResponseModel<UcafModel[]>>("UCAFs/GetAllUCAF",model,res=> callBack(res));
  }
  add(model:UcafModel, callBack: (res: MessageResponseModel)=> void){
    model.companyId = this.loginResponse.company.companyId;
    this._http.post<MessageResponseModel>("UCAFs/CreateUCAF",model, (res)=> callBack(res));
  }
  update(model:UcafModel, callBack: (res: MessageResponseModel)=> void){
    model.companyId = this.loginResponse.company.companyId;
    this._http.post<MessageResponseModel>("UCAFs/UpdateUCAF",model, (res)=> callBack(res));
  }
  removeById(model: RemoveByIdModel, callBack: (res:MessageResponseModel)=> void){
    model.companyId = this.loginResponse.company.companyId;
    this._http.post<MessageResponseModel>("UCAFs/RemoveByIdUCAF",model, (res)=> callBack(res));
  }
}