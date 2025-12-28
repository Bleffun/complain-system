import { Component, NgModule } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>This project just for study</footer>
  `,
  styleUrls: ['./footer.component.scss']
})

export class FooterComponent {

}

@NgModule({
  declarations: [ FooterComponent ],
  exports: [ FooterComponent ]
})
export class FooterModule { }
