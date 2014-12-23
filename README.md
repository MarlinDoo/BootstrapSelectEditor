# Bootstrap Select for backbone-form editor

Using the bootstrap Button dropdowns to achieve a form select element for backbone-form.

## Screenshot

![Screenshot](https://github.com/MarlinDoo/BootstrapSelectEditor/blob/master/images/screenshot.png)

## Installation

Dependencies:

* [backbone 1+](http://documentcloud.github.io/backbone/)
* backbone-forms 0.14
* bootstrap 3.3.1

First make sure you have Bower installed.

* bower install

## Usage

Similar to the backbone-form select, Can be any of:

* String of HTML <option>
* Array of strings/numbers
* An array of option groups in the form [{group: 'Option Group Label', options: <any of the forms from this list (except the option groups)>}]
* Array of objects in the form { val: 123, label: 'Text' }
* A Backbone collection
* A function that calls back with one of the above
* An object e.g. { y: 'Yes', n: 'No' }


`

    var form = new Backbone.Form({
    
      //Schema
      schema: {
        id:         'Number',
        name:       'Text',
        title:   {type:'BootstrapSelect', options:['Mr', 'Mrs', 'Ms']}
      },
      //Data to populate the form with
      data: {
        id: 123,
        name: 'Rod Kimble',
        title: 'Mr'
      }
    }).render();
    
`
