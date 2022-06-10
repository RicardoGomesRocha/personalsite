import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuillModules } from 'ngx-quill';
import Quill from 'quill';
import 'quill-emoji/dist/quill-emoji.js';
import { TextEditorConfiguration } from './text-editor.model';

@Component({
  selector: 'app-text-editor',
  templateUrl: './text-editor.component.html',
  styleUrls: ['./text-editor.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class TextEditorComponent {
  @Input()
  mode: 'view' | 'edit' = 'view';

  @Input()
  formGroup: FormGroup | undefined;

  @Input()
  controllerName = '';

  @Input()
  content = '';

  @Input()
  set configuration(configuration: TextEditorConfiguration | undefined) {
    this.buildConfigurations(configuration);
  }

  config: QuillModules | undefined;

  constructor() {
    this.buildConfigurations(undefined);
  }

  buildConfigurations(configuration: TextEditorConfiguration | undefined) {
    if (configuration === undefined) {
      configuration = this.getDefaults();
    }

    let configurations = [];
    configurations.push(this.getFirstConfigurationLine(configuration));
    configurations.push(this.getSecondConfigurationLine(configuration));
    configurations.push(this.getThirdConfigurationLine(configuration));
    configurations.push(this.getFourthConfigurationLine(configuration));
    configurations.push(this.getFifthConfigurationLine(configuration));
    configurations.push(this.getSixthConfigurationLine(configuration));
    configurations.push(this.getSeventhConfigurationLine(configuration));
    configurations.push(this.getEighthConfigurationLine(configuration));
    configurations.push(this.getNinthConfigurationLine(configuration));
    configurations.push(this.getTenthConfigurationLine(configuration));
    configurations.push(this.getEleventhConfigurationLine(configuration));
    configurations = configurations.filter(
      (value) => value && value.length > 0
    );

    this.config = {
      syntax: true,
      toolbar: {
        container: configurations,
      },
      'emoji-shortname': true,
      'emoji-textarea': false,
      'emoji-toolbar': true,
    };
  }

  private getDefaults(): TextEditorConfiguration {
    return {
      bold: true,
      italic: true,
      underline: true,
      blockquote: true,
      listOrder: true,
      listBullet: true,
      bullet: true,
      scriptSub: true,
      scriptSuper: true,
      fontSize: true,
      header: true,
      alignText: true,
      textColor: true,
      link: true,
      image: true,
      emoji: true,
      cleanStyle: true,
    };
  }

  private getFirstConfigurationLine(
    configuration: TextEditorConfiguration
  ): Array<string> {
    let line = [];
    if (configuration.bold) line.push('bold');
    if (configuration.italic) line.push('italic');
    if (configuration.underline) line.push('underline');
    return line;
  }

  private getSecondConfigurationLine(
    configuration: TextEditorConfiguration
  ): Array<string> {
    let line = [];
    if (configuration.blockquote) line.push('blockquote');
    if (configuration.codeBlock) line.push('code-block');
    return line;
  }

  private getThirdConfigurationLine(
    configuration: TextEditorConfiguration
  ): Array<string> {
    let line = [];
    if (configuration.listOrder) line.push('ordered');
    if (configuration.listBullet) line.push('bullet');
    return line;
  }

  private getFourthConfigurationLine(
    configuration: TextEditorConfiguration
  ): Array<string> {
    let line = [];
    if (configuration.scriptSub) line.push('sub');
    if (configuration.scriptSuper) line.push('super');
    return line;
  }

  private getFifthConfigurationLine(
    configuration: TextEditorConfiguration
  ): Array<any> {
    let line = [];
    if (configuration.scriptSub) {
      const fontSizeArr = [
        '8px',
        '9px',
        '10px',
        '12px',
        '14px',
        '16px',
        '20px',
        '24px',
        '32px',
        '42px',
        '54px',
        '68px',
        '84px',
        '98px',
      ];
      line.push({ size: fontSizeArr });
      const Size = Quill.import('attributors/style/size');
      Size.whitelist = fontSizeArr;
      Quill.register(Size, true);
    }
    return line;
  }

  private getSixthConfigurationLine(
    configuration: TextEditorConfiguration
  ): Array<any> {
    let line = [];
    if (configuration.header) {
      line.push({ header: [1, 2, 3, 4, 5, 6, false] });
    }
    return line;
  }

  private getSeventhConfigurationLine(
    configuration: TextEditorConfiguration
  ): Array<any> {
    let line = [];
    if (configuration.alignText) {
      line.push({ align: [] });
    }
    return line;
  }

  private getEighthConfigurationLine(
    configuration: TextEditorConfiguration
  ): Array<any> {
    let line = [];
    if (configuration.textColor) {
      line.push({ color: [] });
    }
    return line;
  }

  private getNinthConfigurationLine(
    configuration: TextEditorConfiguration
  ): Array<string> {
    let line = [];
    if (configuration.link) {
      line.push('link');
    }
    if (configuration.image) {
      line.push('image');
    }
    return line;
  }

  private getTenthConfigurationLine(
    configuration: TextEditorConfiguration
  ): Array<string> {
    let line = [];
    if (configuration.emoji) {
      line.push('emoji');
    }
    return line;
  }

  private getEleventhConfigurationLine(
    configuration: TextEditorConfiguration
  ): Array<string> {
    let line = [];
    if (configuration.cleanStyle) {
      line.push('clean');
    }
    return line;
  }
}
