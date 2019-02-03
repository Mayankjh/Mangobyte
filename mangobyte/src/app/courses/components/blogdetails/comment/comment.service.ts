import { Injectable } from '@angular/core';
import { LoginService } from 'src/app/login/login.service';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private LS:LoginService) { }

  comment(id_token, blog_url, id, content){
    this.LS.http.post(
      blog_url+'comment/',
      new HttpParams()
        .set('gid', id_token)
        .set('id', id)
        .set('content', content),
        {
          headers:this.LS.getHeaders()
        }
    ).subscribe(data=>{
      alert(data);
    })
  }

}
