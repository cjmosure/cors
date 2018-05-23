import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {RequestService} from './request.service';

// For Ace
import 'brace/index';
import 'brace/theme/github';
import 'brace/mode/json';
import 'brace/worker/json';
declare var ace: any;

@Component({
  selector: 'app-request-editor',
  templateUrl: './request-editor.component.html',
  styleUrls: ['./request-editor.component.scss'],
  providers: [RequestService]
})
export class RequestEditorComponent implements OnInit {

  content = `
{
    "test": "this is just a test!"
}
`;

  options: any = {
    maxLines: 15,
    printMargin: false
  };

  form: FormGroup;

  error: string;

  constructor(
    private _fb: FormBuilder,
    private _request: RequestService
  ) { }

  ngOnInit() {
    this.initFormGroup();
    this.onFormChanges();
  }

  /**
   * Update form control from ace editor
   * @param $event
   */
  onChange($event) {
    this.form.patchValue({
      body: $event
    });
  }

  /**
   * Submit function for request form
   */
  makeRequest() {
    let reqBody;

    // Check validation of json
    if (this.form.value.body) {
      try {
        reqBody = JSON.parse(this.form.value.body);
      } catch (e) {
        this.error = 'Not valid json man...';
      }
    } else {
      this.error = 'Request body blank man...';
    }

    // If valid json, make the request
    if (reqBody) {
      this._request.post(this.form.value.url, this.form.value.body).subscribe(
        (res) => {
          console.log('res', res);
        },
        (err) => {
          console.log(err);
        });
    }
  }

  /**
   * Initialize the form group
   */
  private initFormGroup() {
    this.form = this._fb.group({
      url: ['http://httpbin.org/post', Validators.required],
      body: [this.content, Validators.required]
    });
  }

  /**
   * Listen to request body field changes and reset error message
   */
  private onFormChanges(): void {
    this.form.get('body').valueChanges.subscribe(val => {
      if (val && this.error) {
        this.error = null;
      }
    });
  }

}
