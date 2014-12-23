/**
 * style: button style, the default value is "default"
 */
var Form = Form || Backbone.Form;
Form.editors.BootstrapSelect = Form.editors.Select.extend({
  className: 'btn-group',
  tagName:'div',
  events: {
    'change': function(event) {
      this.trigger('change', this);
    },
    'click li a': 'select'
  },
  initialize: function(options){
    Form.editors.Select.prototype.initialize.call(this, options);
    this.template = options.template || this.constructor.template;
  },
  render: function(){
    this.schema = _.extend({}, {style:'default'}, this.schema);
    if(_.isArray(this.schema.options) && this.schema.options[0] && _.isString(this.schema.options[0])){
      this.schema.options = _.map(this.schema.options, function(item){
        return {label: item, val: item};
      })
    }
    this.$el.append( this.template({action:this.schema.options[0], style: this.schema.style}) )
    this.setOptions( this.schema.options );
    return this;
  },
  select: function(evt){
    evt.preventDefault();
    if(this.curaction == $(evt.target).attr('value')) return;
    this.setValue( $(evt.target).attr('value') );
    this.trigger('change',this);
  },
  getValue: function() {
    return this.curaction;
  },
  setValue: function(value) {
    var options = this.schema.options,
        curaction;
    if(options instanceof Backbone.Collection){
      if(!value) value = options.at(0).id;
      curaction = options.get(value).get('label');
    }else if (_.isArray(options) || _.isObject(options)){
      if(!value) value = options[0].val;
      if(typeof(options[0].val)=='number') value=parseInt(value);
      curaction = _.findWhere(options,{val: value}).label;
    }else{
      curaction = value;
    }
    if(curaction=='') curaction = '&nbsp;';
    this.$('.btn-actionname').html(curaction);
    this.curaction = curaction;
  },
  renderOptions: function(options) {
    var $select = this.$el.find('.dropdown-menu'),
        html;
    if(options instanceof Backbone.Collection){
      options = options.toJSON();
    }
    html = this._getOptionsHtml(options);
    $select.html(html);
    this.setValue(this.value);
  },
  _arrayToHtml: function(array) {
    var html = [];
    // Generate HTML
    _.each(array, function(option) {
      if (_.isObject(option)) {
        if (option.group) {
          html.push('<optgroup label="'+option.group+'">');
          html.push(this._getOptionsHtml(option.options))
          html.push('</optgroup>');
        } else {
          var val = (option.val || option.val === 0) ? option.val : '';
          var inner = (option.level || option.level==2) ? '&nbsp;&nbsp;&nbsp;&nbsp;'+option.label : option.label;
          html.push('<li><a href="#" value="'+val+'">'+inner+'</a></li>');
        }
      }
    }, this);
    return html.join('');
  }
},{
  template: _.template('\
      <button type="button" class="btn btn-<%= style %> btn-actionname"><%= action %></button>\
      <button type="button" class="btn btn-<%= style %> dropdown-toggle" data-toggle="dropdown" aria-expanded="false">\
        <span class="caret"></span>\
        <span class="sr-only">Toggle Dropdown</span>\
      </button>\
      <ul class="dropdown-menu" role="menu"></ul>\
  ', null, Form.templateSettings),
}
);