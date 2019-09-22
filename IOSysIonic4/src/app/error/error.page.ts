import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.page.html',
  styleUrls: ['./error.page.scss']
})
export class ErrorPage implements OnInit {
  //错误信息
  errMsg: string;

  constructor(private router: Router, private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.errMsg = params['errMsg'];
    });
  }

  //重新登录
  async logOut() {
    //跳到登录页
    this.router.navigate(['login']);
  }
}
