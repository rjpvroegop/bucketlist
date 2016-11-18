import {bindable} from 'aurelia-framework';

export class bucketlistItemImage {
  @bindable image;

  handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    if (evt.dataTransfer)
      var files = evt.dataTransfer.files; // FileList object drag&drop.
    else if (evt.target)
      files = evt.target.files; // FileList object button.


    this.extractFiles(files[0]);
  }

  extractFiles(file) {
    var self = this;

    var reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = event => {
      this.image = event.target.result;
      this.image = this.image.replace('data:image/png;base64,', '');
      this.image = this.image.replace('data:image/jpeg;base64,', '')
    };

    // Read in the image file as a data URL.
    reader.readAsDataURL(file);
  }
}
